/* eslint-disable no-undef */

import 'phaser';

const WorldScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function WorldScene() {
    Phaser.Scene.call(this, { key: 'WorldScene' });
  },

  create() {
    const map = this.add.image(450, 300, 'map');

    const trees = this.physics.add.staticGroup();

    for (let i = 20; i < 800; i += 32) {
      for (let j = 150; j < 200; j += 18) {
        const x = Phaser.Math.RND.between(20, 800);
        const y = Phaser.Math.RND.between(130, 220);
        trees.create(x, y, 'tree');
        trees.create(i, j, 'tree');
      }
    }

    for (let i = 100; i < 900; i += 32) {
      for (let j = 350; j < 400; j += 18) {
        const x = Phaser.Math.RND.between(100, 900);
        const y = Phaser.Math.RND.between(330, 420);
        trees.create(x, y, 'tree');
        trees.create(i, j, 'tree');
      }
    }

    for (let i = 20; i < 800; i += 42) {
      for (let j = 500; j < 525; j += 22) {
        const x = Phaser.Math.RND.between(20, 800);
        const y = Phaser.Math.RND.between(510, 530);
        trees.create(x, y, 'tree');
        trees.create(i, j, 'tree');
      }
    }

    this.player = this.physics.add.sprite(50, 50, 'player', 6);
    this.player.scale = 1.2;
    this.physics.world.bounds.width = map.width;
    this.physics.world.bounds.height = map.height;
    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();


    this.cameras.main.setBounds(0, 0, map.width, map.height);
    this.cameras.main.zoom = 2;
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
      frameRate: 10,
      repeat: -1,
    });

    // animation with key 'right'
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14] }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { frames: [0, 6, 0, 12] }),
      frameRate: 10,
      repeat: -1,
    });

    const skelleton = this.add.zone(850, 175).setSize(100, 20);
    this.physics.world.enable(skelleton, 0);
    skelleton.name = 'skelleton';
    this.physics.add.overlap(this.player, skelleton, this.onMeetEnemy, false, this);

    const pirate = this.add.zone(50, 350).setSize(100, 20);
    this.physics.world.enable(pirate, 0);
    pirate.name = 'pirate';
    this.physics.add.overlap(this.player, pirate, this.onMeetEnemy, false, this);

    const ninja = this.add.zone(850, 510).setSize(100, 20);
    this.physics.world.enable(ninja, 0);
    ninja.name = 'ninja';
    this.physics.add.overlap(this.player, ninja, this.onMeetEnemy, false, this);

    const monster = this.add.zone(100, 550).setSize(20, 100);
    this.physics.world.enable(monster, 0);
    monster.name = 'monster';
    this.physics.add.overlap(this.player, monster, this.onMeetEnemy, false, this);

    const win = this.add.zone(20, 550).setSize(20, 100);
    this.physics.world.enable(win, 0);
    win.name = 'win';
    this.physics.add.overlap(this.player, win, this.onFinishGame, false, this);

    

    // this.physics.add.overlap(this.player, trees, this.onEnterForest, false, this);
    this.sys.events.on('wake', this.wake, this);
  },

  wake() {
    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.up.reset();
    this.cursors.down.reset();
  },

  onEnterForest(player) {
    // start battle
    this.scene.start('BattleScene', {enemy: 'forest', y: this.player.y});
  },

  onMeetEnemy(player, enemyType) {
    enemyType.x = 1200;
    enemyType.y = 800;
    this.playerX = this.player.x;
    this.playerY = this.player.y;
    // this.scene.start('BattleScene', {enemy: enemyType, y: this.player.y});
    this.scene.sleep('WorldScene');
    this.scene.run('BattleScene', {enemy: enemyType.name, y: this.player.y});
  },

  onFinishGame() {

  },

  update() {
    this.player.body.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(80);
    }

    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(80);
    }

    if (this.cursors.left.isDown) {
      this.player.flipX = true;
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.flipX = false;
      this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
      this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play('down', true);
    } else {
      this.player.anims.stop();
    }
  },
});

export default WorldScene;