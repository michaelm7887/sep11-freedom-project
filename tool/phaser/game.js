import MainScene from './scenes/mainScene.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
      width: 1200,
      height: 800,

    }
  },
  scene: MainScene
};

const game = new Phaser.Game(config);
