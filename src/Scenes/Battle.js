/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */

import 'phaser';

const BattleScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function BattleScene(data) {
    
    Phaser.Scene.call(this, { key: 'BattleScene' });
    
  },

  init(data) {
    this.enemyData = data.enemy;
    this.playerY = data.y;
  },

  create() {
    this.add.image(400, 300, 'forest-bg');
    if (this.enemyData === 'forest') {
      this.startBattle('forest');
    } else {
      this.startBattle(this.enemyData);
    }
    
    // on wake event we call startBattle too
    this.sys.events.on('wake', this.startBattle, this);
  },

  nextTurn() {
    // if we have victory or game over
    if (this.checkEndBattle()) {
      this.endBattle();
      return;
    }
    do {
      // currently active unit
      this.index += 1;
      // if there are no more units, we start again from the first one
      if (this.index >= this.units.length) {
        this.index = 0;
      }
    } while (!this.units[this.index].living);
    // if its player hero
    if (this.units[this.index] instanceof PlayerCharacter) {
      // we need the player to select action and then enemy
      this.events.emit('PlayerSelect', this.index);
    } else { // else if its enemy unit
      // pick random living hero to be attacked
      let r;
      do {
        r = Math.floor(Math.random() * this.heroes.length);
      } while (!this.heroes[r].living);
      // call the enemy's attack function
      this.units[this.index].attack(this.heroes[r]);
      // add timer for the next turn, so will have smooth gameplay
      this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
    }
  },

  startBattle(data) {
    // player character - warrior1
    const warrior1 = new PlayerCharacter(this, 650, 125, 'warrior1', 'Warrior 1', 100, 120);
    warrior1.scale = 1.5;
    this.add.existing(warrior1);

    // player character - warrior2
    const warrior2 = new PlayerCharacter(this, 650, 275, 'warrior2', 'Warrior 2', 80, 120);
    warrior2.scale = 1.5;
    this.add.existing(warrior2);

    let enemy1 = '';
    let enemy2 = '';
    console.log(data)
    if (data === 'forest') {
      if (Math.floor(this.playerY) < 300) {
        enemy1 = new Enemy(this, 150, 120, 'bat1', 'Bat 1', 50, 3);
        enemy2 = new Enemy(this, 150, 280, 'bat2', 'Bat 2', 50, 3);
      } else {
        enemy1 = new Enemy(this, 150, 120, 'spider1', 'Spider 1', 50, 3);
        enemy2 = new Enemy(this, 150, 280, 'spider2', 'Spider 2', 50, 3);
      }
    } else {
      switch (data) {
        case 'skelleton':
          enemy1 = new Enemy(this, 150, 120, 'skelleton1', 'Skelleton 1', 50, 3);
          enemy2 = new Enemy(this, 150, 280, 'skelleton2', 'Skelleton 2', 50, 3);
          break;
        case 'pirate':
          enemy1 = new Enemy(this, 150, 120, 'pirate1', 'Pirate 1', 50, 3);
          enemy2 = new Enemy(this, 150, 280, 'pirate2', 'Pirate 2', 50, 3);
          break;
        case 'ninja':
          enemy1 = new Enemy(this, 150, 120, 'ninja1', 'Ninja 1', 50, 3);
          enemy2 = new Enemy(this, 150, 280, 'ninja2', 'Ninja 2', 50, 3);
          break;
        case 'monster':
          enemy1 = new Enemy(this, 150, 120, 'monster1', 'Monster 1', 50, 3);
          enemy2 = new Enemy(this, 150, 280, 'monster2', 'Monster 2', 50, 3);
          break;

        default:
          enemy1 = new Enemy(this, 150, 120, 'skelleton1', 'Skelleton 1', 50, 3);
          enemy2 = new Enemy(this, 150, 280, 'skelleton2', 'Skelleton 2', 50, 3);
          
          break;
      }
    }

    enemy1.scale = 1.5;
    enemy2.scale = 1.5;
    this.add.existing(enemy1);
    this.add.existing(enemy2);
    
    // array with heroes
    this.heroes = [warrior1, warrior2];
    // array with enemies
    this.enemies = [enemy1, enemy2];
    // array with both parties, who will attack
    this.units = this.heroes.concat(this.enemies);

    this.index = -1; // currently active unit

    this.scene.run('UIScene');
  },

  checkEndBattle() {
    let victory = true;
    // if all enemies are dead we have victory
    for (let i = 0; i < this.enemies.length; i += 1) {
      if (this.enemies[i].living) victory = false;
    }
    let gameOver = true;
    // if all heroes are dead we have game over
    for (let i = 0; i < this.heroes.length; i += 1) {
      if (this.heroes[i].living) gameOver = false;
    }
    return victory || gameOver;
  },

  endBattle() {
    // clear state, remove sprites
    this.heroes.length = 0;
    this.enemies.length = 0;
    for (let i = 0; i < this.units.length; i += 1) {
      // link item
      this.units[i].destroy();
    }
    this.units.length = 0;
    // sleep the UI
    this.scene.stop('UIScene');
    this.scene.stop('BattleScene');
    // return to WorldScene and sleep current BattleScene
    this.scene.run('WorldScene');
  },

  // when the player have selected the enemy to be attacked
  receivePlayerSelection(action, target) {
    if (action === 'attack') {
      this.units[this.index].attack(this.enemies[target]);
    }
    // next turn in 3 seconds
    this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
  },
});

// base class for heroes and enemies
const Unit = new Phaser.Class({
  Extends: Phaser.GameObjects.Sprite,

  initialize: function Unit(scene, x, y, texture, type, hp, damage) {
    Phaser.GameObjects.Sprite.call(this, scene, x, y, texture);
    this.type = type;
    this.hp = hp;
    this.maxHp = this.hp;
    this.damage = damage; // default damage
    this.living = true;
    this.menuItem = null;
  },

  // we will use this to notify the menu item when the unit is dead
  setMenuItem(item) {
    this.menuItem = item;
  },

  // attack the target unit
  attack(target) {
    if (target.living) {
      target.takeDamage(this.damage);
      this.scene.events.emit('Message', `${this.type} attacks ${target.type} for ${this.damage} damage`);
    }
  },

  takeDamage(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.hp = 0;
      this.menuItem.unitKilled();
      this.living = false;
      this.visible = false;
      this.menuItem = null;
    }
  },
});

const Enemy = new Phaser.Class({
  Extends: Unit,

  initialize: function Enemy(scene, x, y, texture, type, hp, damage) {
    Unit.call(this, scene, x, y, texture, type, hp, damage);
  },
});

const PlayerCharacter = new Phaser.Class({
  Extends: Unit,

  initialize: function PlayerCharacter(scene, x, y, texture, type, hp, damage) {
    Unit.call(this, scene, x, y, texture, type, hp, damage);
    this.flipX = true;
    this.setScale(2);
  },
});

const MenuItem = new Phaser.Class({
  Extends: Phaser.GameObjects.Text,

  initialize: function MenuItem(x, y, text, scene) {
    Phaser.GameObjects.Text.call(this, scene, x, y, text, {
      color: '#ffffff', align: 'left', fontSize: 15, wordWrap: true, wordWrapWidth: 100,
    });
  },

  select() {
    this.setColor('#f8ff38');
  },

  deselect() {
    this.setColor('#ffffff');
  },
  // when the associated enemy or player unit is killed
  unitKilled() {
    this.active = false;
    this.visible = false;
  },
});

const Menu = new Phaser.Class({
  Extends: Phaser.GameObjects.Container,

  initialize: function Menu(x, y, scene) {
    Phaser.GameObjects.Container.call(this, scene, x, y);
    this.menuItems = [];
    this.menuItemIndex = 0;
    this.x = x;
    this.y = y;
    this.selected = false;
  },

  addMenuItem(unit) {
    const menuItem = new MenuItem(0, this.menuItems.length * 40, unit, this.scene);
    this.menuItems.push(menuItem);
    this.add(menuItem);
    return menuItem;
  },

  // menu navigation
  moveSelectionUp() {
    this.menuItems[this.menuItemIndex].deselect();
    do {
      this.menuItemIndex -= 1;
      if (this.menuItemIndex < 0) this.menuItemIndex = this.menuItems.length - 1;
    } while (!this.menuItems[this.menuItemIndex].active);
    this.menuItems[this.menuItemIndex].select();
  },

  moveSelectionDown() {
    this.menuItems[this.menuItemIndex].deselect();
    do {
      this.menuItemIndex += 1;
      if (this.menuItemIndex >= this.menuItems.length) this.menuItemIndex = 0;
    } while (!this.menuItems[this.menuItemIndex].active);
    this.menuItems[this.menuItemIndex].select();
  },

  // select the menu as a whole and highlight the choosen element
  select(index) {
    if (!index) index = 0;
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = index;
    while (!this.menuItems[this.menuItemIndex].active) {
      this.menuItemIndex += 1;
      if (this.menuItemIndex >= this.menuItems.length) this.menuItemIndex = 0;
      if (this.menuItemIndex === index) return;
    }
    this.menuItems[this.menuItemIndex].select();
    this.selected = true;
  },

  // deselect this menu
  deselect() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = 0;
    this.selected = false;
  },

  confirm() {
    // when the player confirms his slection, do the action
  },

  // clear menu and remove all menu items
  clear() {
    for (let i = 0; i < this.menuItems.length; i += 1) {
      this.menuItems[i].destroy();
    }
    this.menuItems.length = 0;
    this.menuItemIndex = 0;
  },

  // recreate the menu items
  remap(units) {
    this.clear();
    for (let i = 0; i < units.length; i += 1) {
      const unit = units[i];
      unit.setMenuItem(this.addMenuItem(unit.type));
    }
    this.menuItemIndex = 0;
  },
});

const HeroesMenu = new Phaser.Class({
  Extends: Menu,

  initialize: function HeroesMenu(x, y, scene) {
    Menu.call(this, x, y, scene);
  },
});

const ActionsMenu = new Phaser.Class({
  Extends: Menu,

  initialize: function ActionsMenu(x, y, scene) {
    Menu.call(this, x, y, scene);
    this.addMenuItem('Attack');
  },
  confirm() {
    this.scene.events.emit('SelectEnemies');
  },
});

const EnemiesMenu = new Phaser.Class({
  Extends: Menu,

  initialize: function EnemiesMenu(x, y, scene) {
    Menu.call(this, x, y, scene);
  },
  confirm() {
    this.scene.events.emit('Enemy', this.menuItemIndex);
  },
});

const UIScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function UIScene() {
    Phaser.Scene.call(this, { key: 'UIScene' });
  },

  create() {
    // draw some background for the menu
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x031f4c, 1);
    this.graphics.strokeRect(2, 398, 290, 200);
    this.graphics.fillRect(2, 398, 290, 200);
    this.graphics.strokeRect(300, 398, 200, 200);
    this.graphics.fillRect(300, 398, 200, 200);
    this.graphics.strokeRect(508, 398, 290, 200);
    this.graphics.fillRect(508, 398, 290, 200);

    // basic container to hold all menus
    this.menus = this.add.container();
    this.menus.scale = 2

    this.heroesMenu = new HeroesMenu(275, 210, this);
    this.actionsMenu = new ActionsMenu(170, 210, this);
    this.enemiesMenu = new EnemiesMenu(8, 210, this);

    // the currently selected menu
    this.currentMenu = this.actionsMenu;

    // add menus to the container
    this.menus.add(this.heroesMenu);
    this.menus.add(this.actionsMenu);
    this.menus.add(this.enemiesMenu);

    this.battleScene = this.scene.get('BattleScene');

    // listen for keyboard events
    this.input.keyboard.on('keydown', this.onKeyInput, this);

    // when its player cunit turn to move
    this.battleScene.events.on('PlayerSelect', this.onPlayerSelect, this);

    // when the action on the menu is selected
    // for now we have only one action so we dont send and action id
    this.events.on('SelectEnemies', this.onSelectEnemies, this);

    // an enemy is selected
    this.events.on('Enemy', this.onEnemy, this);

    // when the scene receives wake event
    this.sys.events.on('wake', this.createMenu, this);

    // the message describing the current action
    this.message = new Message(this, this.battleScene.events);
    this.add.existing(this.message);

    this.createMenu();
  },

  createMenu() {
    // map hero menu items to heroes
    this.remapHeroes();
    // map enemies menu items to enemies
    this.remapEnemies();
    // first move
    this.battleScene.nextTurn();
  },

  onEnemy(index) {
    this.heroesMenu.deselect();
    this.actionsMenu.deselect();
    this.enemiesMenu.deselect();
    this.currentMenu = null;
    this.battleScene.receivePlayerSelection('attack', index);
  },

  onPlayerSelect(id) {
    this.heroesMenu.select(id);
    this.actionsMenu.select(0);
    this.currentMenu = this.actionsMenu;
  },

  onSelectEnemies() {
    this.currentMenu = this.enemiesMenu;
    this.enemiesMenu.select(0);
  },

  remapHeroes() {
    const { heroes } = this.battleScene;
    this.heroesMenu.remap(heroes);
  },

  remapEnemies() {
    const { enemies } = this.battleScene;
    this.enemiesMenu.remap(enemies);
  },

  onKeyInput(event) {
    if (this.currentMenu && this.currentMenu.selected) {
      if (event.code === 'ArrowUp') {
        this.currentMenu.moveSelectionUp();
      } else if (event.code === 'ArrowDown') {
        this.currentMenu.moveSelectionDown();
      } else if (event.code === 'Space' || event.code === 'ArrowLeft') {
        this.currentMenu.confirm();
      }
    }
  },
});

const Message = new Phaser.Class({

  Extends: Phaser.GameObjects.Container,

  initialize: function Message(scene, events) {
    Phaser.GameObjects.Container.call(this, scene, 160, 20);
    const graphics = this.scene.add.graphics();
    this.add(graphics);
    graphics.lineStyle(1, 0xffffff, 0.8);
    graphics.fillStyle(0x031f4c, 0.3);
    graphics.strokeRect(100, 115, 300, 150);
    graphics.fillRect(100, 115, 300, 150);
    this.text = new Phaser.GameObjects.Text(scene, 250, 190, '', {
      color: '#ffffff', align: 'center', fontSize: 23, wordWrap: { width: 260, useAdvancedWrap: true },
    });
    this.add(this.text);
    this.text.setOrigin(0.5);
    events.on('Message', this.showMessage, this);
    this.visible = false;
  },

  showMessage(text) {
    
    this.text = text;
    console.log(this.text)
    // this.text.setText(text);
    this.visible = true;
    if (this.hideEvent) this.hideEvent.remove(false);
    this.hideEvent = this.scene.time.addEvent({
      delay: 2000,
      callback: this.hideMessage,
      callbackScope: this,
    });
  },

  hideMessage() {
    this.text = '';
    this.hideEvent = null;
    this.visible = false;
  },
});

export { BattleScene, UIScene };