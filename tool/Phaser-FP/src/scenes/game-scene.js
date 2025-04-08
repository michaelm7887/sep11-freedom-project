import Phaser from '../lib/phaser.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload(){
    this.load.pack('asset_pack','assets/data/assets.json');
  }

  create() {
    this.add
    .text(this.scale.width / 2, this.scale.height / 2, 'hello world',{
      fontsize: '32px',
      })
      .setOrigin(0.5);
    this.add.sprite(100,100,'ship').play('explosion');
  }
}

