/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */

import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.add.image(400, 300, 'forest-bg');
    const rpgLogo = this.add.image(400, 90, 'rpg-logo');
    rpgLogo.scale = 1.4;
    // Game
    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 70, 'button1', 'button2', 'Play', 'WorldScene');
    // Options
    this.optionsButton = new Button(this, config.width / 2, config.height / 2 + 30, 'button1', 'button2', 'Options', 'Options');
    // Credits
    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 130, 'button1', 'button2', 'Credits', 'Credits');
    // Leaderboard
    this.leaderboardButton = new Button(this, config.width / 2, config.height / 2 + 230, 'button1', 'button2', 'Leaderboard', 'Leaderboard');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(
        config.width / 2,
        config.height / 2 - offset * 100,
        config.width, config.height,
      ),
    );
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton,
    );
  }
}
