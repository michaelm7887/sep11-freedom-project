import Phaser from '../lib/phaser.js';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(){
    this.load.pack('animations_json','assets/data/assets.json')
  }

  create() {
    this.scene.start('PreloadScene');
    this.add
    .text(this.scale.width / 2, this.scale.height / 2, 'hello world',{
      fontsize: '32px',
      })
      .setOrigin(0.5);
      this.add.image(100,100,'ship');
  }
}
