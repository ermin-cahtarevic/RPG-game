/* eslint-disable no-undef */
/* eslint-disable import/no-cycle */

import 'phaser';
import config from './Config/config';
import GameOverScene from './Scenes/GameOverScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import VictoryScene from './Scenes/VictoryScene';
import LeaderboardScene from './Scenes/LeaderboardScene';
import WorldScene from './Scenes/WorldScene';
import Model from './Objects/Model';
import { setUser } from './Helpers/user';
import './Helpers/dom';
import './styles/style.css';

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
    this.scene.add('Victory', VictoryScene);
    this.scene.add('Leaderboard', LeaderboardScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.add('WorldScene', WorldScene);
    this.scene.start('Boot');
  }
}

const startGame = (user) => {
  setUser(user);
  window.game = new Game();
};

export default startGame;