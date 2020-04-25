/* eslint-disable no-undef */

import 'phaser';
import config from './Config/config';
import GameOverScene from './Scenes/GameOverScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import Model from './Model';
import WorldScene from './Scenes/WorldScene';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.add('WorldScene', WorldScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();