/* eslint-disable no-undef */

import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.add.image(400, 300, 'forest-bg');

    this.title = this.add.text(0, 0, 'Forest Run', { fontSize: '40px', fontStyle: 'bold', fill: '#fff' });
    this.madeByText = this.add.text(0, 0, 'Created By Ermin Cahtarevic', { fontSize: '28px', fill: '#fff' });
    this.descriptionTopText = this.add.text(0, 0, 'Microverse Capstone Project', { fontSize: '28px', fill: '#fff' });
    this.descriptionBottomText = this.add.text(0, 0, 'Final Project in the JS Course', { fontSize: '28px', fill: '#fff' });
    this.credits = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.creditsPhaser = this.add.text(0, 0, 'Phaser 3', { fontSize: '26px', fill: '#fff' });
    this.creditsGDA = this.add.text(0, 0, 'GameDev Academy', { fontSize: '26px', fill: '#fff' });
    this.creditsOGA = this.add.text(0, 0, 'OpenGameArt', { fontSize: '26px', fill: '#fff' });
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.title,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.madeByText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.descriptionTopText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.descriptionBottomText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.credits,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.creditsPhaser,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.creditsGDA,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.creditsOGA,
      this.zone,
    );

    this.title.displayOriginY = 225;
    this.madeByText.displayOriginY = 180;
    this.descriptionTopText.displayOriginY = 130;
    this.descriptionBottomText.displayOriginY = 100;
    this.credits.displayOriginY = 10;
    this.creditsPhaser.displayOriginY = -50;
    this.creditsGDA.displayOriginY = -90;
    this.creditsOGA.displayOriginY = -130;

    this.menuButton = new Button(this, 400, 530, 'button1', 'button2', 'Menu', 'Title');
  }
}