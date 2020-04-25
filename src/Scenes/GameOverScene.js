/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */

import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  preload() {

  }

  create() {
    this.add.image(400, 300, 'forest-bg');
    this.add.image(400, 150, 'rpg-logo');
    // this.scene.start('WorldScene');

    this.title = this.add.text(0, 0, 'Game Over', { fontSize: '40px', fontStyle: 'bold', fill: '#fff' });
    this.score = this.add.text(0, 0, 'Score', { fontSize: '30px', fill: '#fff' });
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.title,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.score,
      this.zone,
    );

    this.title.displayOriginY = 50;
    this.score.displayOriginY = -50;

    this.menuButton = new Button(this, 400, 530, 'button1', 'button2', 'Menu', 'Title');
  }
}
