import Phaser from '../lib/phaser.js';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload(){
    this.load.pack('asset_pack','assets/data/assets.json')
  }

  create() {
    this.scene.start('GameScene');
  }

  #createAnimations(){
    const data = this.cache.json.get('animations_json');
    
  }
}
