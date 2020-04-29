/* eslint-disable no-undef */

import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('rpg-logo', 'assets/rpg-logo.png');
    this.load.image('forest-bg', 'assets/forest-bg.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}