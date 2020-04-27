/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */

import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import { getScore, resetScore } from '../score';
import { getUser } from '../Helpers/user';
import { postScore } from '../scoreAPI';

export default class VictoryScene extends Phaser.Scene {
  constructor() {
    super('Victory');
  }

  create() {
    this.add.image(400, 300, 'forest-bg');
    this.add.image(400, 150, 'rpg-logo');
    // this.scene.start('WorldScene');

    this.title = this.add.text(0, 0, 'Victory', { fontSize: '40px', fontStyle: 'bold', fill: '#fff' });
    this.messageText = this.add.text(
      0,
      0,
      'You have managed to safely guide the warriors through the forest!',
      {
        fontSize: '25px',
        fill: '#fff',
        align: 'center',
        wordWrap: { width: 550, useAdvancedWrap: true },
      },
    );
    this.score = this.add.text(0, 0, `Score: ${getScore()}`, { fontSize: '30px', fill: '#fff' });
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.title,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.messageText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.score,
      this.zone,
    );

    this.title.displayOriginY = 50;
    this.messageText.displayOriginY = -15;
    this.score.displayOriginY = -80;

    const user = getUser();
    const finalScore = getScore();

    postScore(user, finalScore);

    this.menuButton = new Button(this, 400, 530, 'button1', 'button2', 'Menu', 'Title');
    resetScore();
  }
}
