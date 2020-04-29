/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */

import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import { getScores } from '../scoreAPI';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
  }

  preload() {

  }

  create() {
    this.add.image(400, 300, 'forest-bg');

    this.title = this.add.text(0, 0, 'Leaderboard', { fontSize: '40px', fontStyle: 'bold', fill: '#fff' });
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.title,
      this.zone,
    );

    this.title.displayOriginY = 210;

    getScores()
      .then(scores => {
        const arr = [];
        scores.map((user, i) => {
          arr.push(
            `${(i + 1).toString()}. ${user[0]}                      ${user[1].toString()}`,
          );
          return true;
        });

        const graphics = this.add.graphics();
        graphics.fillRect(235, 133, 320, 250);

        const mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

        const text = this.add.text(250, 150, arr, { fontFamily: 'Arial', color: '#fff', wordWrap: { width: 310 } }).setOrigin(0);

        text.setMask(mask);

        const zone = this.add.zone(235, 130, 320, 256).setOrigin(0).setInteractive();

        zone.on('pointermove', (pointer) => {
          if (pointer.isDown) {
            text.y += (pointer.velocity.y / 10);

            text.y = Phaser.Math.Clamp(text.y, -400, 300);
          }
        });
      });

    this.menuButton = new Button(this, 400, 530, 'button1', 'button2', 'Menu', 'Title');
  }
}
