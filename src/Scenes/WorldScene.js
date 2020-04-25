/* eslint-disable no-undef */

import 'phaser';
import { BattleScene, UIScene } from './Battle';

const WorldScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function WorldScene() {
    Phaser.Scene.call(this, { key: 'WorldScene' });
  },

  create() {
    const map = this.add.image(450, 300, 'map');

    this.trees = this.physics.add.staticGroup();

    for (let i = 20; i < 800; i += 32) {
      for (let j = 150; j < 200; j += 18) {
        const x = Phaser.Math.RND.between(20, 800);
        const y = Phaser.Math.RND.between(130, 220);
        this.trees.create(x, y, 'tree');
        this.trees.create(i, j, 'tree');
      }
    }

    for (let i = 100; i < 900; i += 32) {
      for (let j = 350; j < 400; j += 18) {
        const x = Phaser.Math.RND.between(100, 900);
        const y = Phaser.Math.RND.between(330, 420);
        this.trees.create(x, y, 'tree');
        this.trees.create(i, j, 'tree');
      }
    }

    for (let i = 20; i < 800; i += 42) {
      for (let j = 500; j < 525; j += 22) {
        const x = Phaser.Math.RND.between(20, 800);
        const y = Phaser.Math.RND.between(510, 530);
        this.trees.create(x, y, 'tree');
        this.trees.create(i, j, 'tree');
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

    const skeleton = this.add.zone(850, 175).setSize(100, 20);
    skeleton.name = 'skeleton';

    const pirate = this.add.zone(50, 350).setSize(100, 20);
    pirate.name = 'pirate';

    const ninja = this.add.zone(850, 510).setSize(100, 20);
    ninja.name = 'ninja';

    const monster = this.add.zone(100, 550).setSize(20, 100);
    monster.name = 'monster';

    [skeleton, pirate, ninja, monster].map(enemy => {
      this.physics.world.enable(enemy, 0);
      this.physics.add.overlap(this.player, enemy, this.onMeetEnemy, false, this);
      return true;
    });

    const win = this.add.zone(20, 550).setSize(20, 100);
    this.physics.world.enable(win, 0);
    win.name = 'win';
    this.physics.add.overlap(this.player, win, this.onFinishGame, false, this);

    this.overlapTrigger = false;
    this.overlapForest = this.physics.add.overlap(
      this.player,
      this.trees,
      this.onMeetEnemy,
      false,
      this,
    );
    this.sys.events.on('wake', this.wake, this);
  },

  wake() {
    if (this.playerY < 150) {
      this.player.x = 50;
      this.player.y = 50;
    } else if (this.playerY >= 150 && this.playerY < 325) {
      this.player.x = 850;
      this.player.y = 270;
    } else if (this.playerY >= 325 && this.playerY < 485) {
      this.player.x = 50;
      this.player.y = 450;
    } else if (this.playerY >= 485 && this.playerX > 125) {
      this.player.x = 850;
      this.player.y = 575;
    } else if (this.playerY >= 485 && this.playerX <= 125) {
      this.player.x = 100;
      this.player.y = 575;
    } else {
      this.player.x = 50;
      this.player.y = 50;
    }

    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.up.reset();
    this.cursors.down.reset();
    this.overlapForest = this.physics.add.overlap(
      this.player,
      this.trees,
      this.onMeetEnemy,
      false,
      this,
    );
    this.overlapTrigger = false;
  },

  onMeetEnemy(player, enemyType) {
    if (this.overlapTrigger) {
      this.physics.world.removeCollider(this.overlapForest);
      return;
    }

    if (enemyType.texture !== undefined) {
      enemyType.name = 'tree';
    }

    enemyType.x = 1200;
    enemyType.y = 800;
    this.playerX = this.player.x;
    this.playerY = this.player.y;
    this.overlapTrigger = true;

    this.scene.add('BattleScene', BattleScene);
    this.scene.add('UIScene', UIScene);

    this.scene.sleep('WorldScene');
    this.scene.launch('BattleScene', { enemy: enemyType.name, y: this.player.y });
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