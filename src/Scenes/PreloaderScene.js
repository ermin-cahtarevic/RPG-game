/* eslint-disable no-undef */

import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    this.add.image(400, 300, 'forest-bg');

    // add logo image
    this.add.image(400, 150, 'rpg-logo').scale = 1.4;

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    // this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // ui assets
    this.load.image('forest-bg', 'assets/forest-bg.png');
    this.load.image('rpg-logo', 'assets/rpg-logo.png');
    this.load.image('button1', 'assets/ui/btn-brown2.png');
    this.load.image('button2', 'assets/ui/btn-brown1.png');
    this.load.image('box', 'assets/ui/unchecked.png');
    this.load.image('checkedBox', 'assets/ui/checked.png');
    this.load.audio('bgMusic', ['assets/WarTheme.mp3']);

    // map assets
    this.load.image('map', 'assets/map/rpg-map1.png');
    this.load.image('tree', 'assets/map/tree.png');

    // player assets
    this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
    this.load.image('warrior1', 'assets/warrior2.png');
    this.load.image('warrior2', 'assets/warrior1.png');

    // enemy assets
    this.load.image('bat1', 'assets/bat1.png');
    this.load.image('bat2', 'assets/bat2.png');
    this.load.image('spider1', 'assets/spider1.png');
    this.load.image('spider2', 'assets/spider2.png');
    this.load.image('skeleton1', 'assets/skeleton1.png');
    this.load.image('skeleton2', 'assets/skeleton2.png');
    this.load.image('pirate1', 'assets/pirate1.png');
    this.load.image('pirate2', 'assets/pirate2.png');
    this.load.image('ninja1', 'assets/ninja1.png');
    this.load.image('ninja2', 'assets/ninja2.png');
    this.load.image('monster1', 'assets/monster1.png');
    this.load.image('monster2', 'assets/monster2.png');
  }

  ready() {
    this.scene.start('Title');
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}
