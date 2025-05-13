export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.image('space', 'https://labs.phaser.io/assets/skies/deep-space.jpg');
    this.load.image('player', 'https://labs.phaser.io/assets/sprites/player.png');
    this.load.image('bullet', 'https://labs.phaser.io/assets/sprites/bullet.png');
    this.load.image('enemy', 'https://labs.phaser.io/assets/sprites/ufo.png');
    this.load.image('bullet2', 'https://labs.phaser.io/assets/sprites/bullet.png');
  }

  create() {
    this.add.image(400, 300, 'space').setDisplaySize(800, 600);
    this.player = this.physics.add.image(400, 550, 'player').setScale(1.5).setCollideWorldBounds(true);
    this.playerHealth = 3;
    this.healthText = this.add.text(16, 16, 'Health: 3', { fontSize: '24px', fill: '#fff' });

    this.bullets = this.physics.add.group({ classType: Phaser.Physics.Arcade.Image, runChildUpdate: true });
    this.secondaryBullets = this.physics.add.group({ classType: Phaser.Physics.Arcade.Image, runChildUpdate: true });
    this.enemies = this.physics.add.group();

    this.physics.add.overlap(this.player, this.enemies, this.handlePlayerHit, null, this);
    this.physics.add.overlap(this.bullets, this.enemies, this.handleBulletHit, null, this);
    this.physics.add.overlap(this.secondaryBullets, this.enemies, this.handleBulletHit, null, this);

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.isShotgunMode = false;
    this.lastFired = 0;

    this.input.keyboard.on('keydown-ONE', this.toggleShotgunMode, this);

    this.time.addEvent({
      delay: 250,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true
    });
  }

  update(time) {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(300);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.spacebar.isDown && time > this.lastFired) {
      if (this.isShotgunMode) {
        this.fireShotgun();
      } else {
        this.fireBullet();
      }
    }

    this.bullets.children.each(bullet => {
      if (bullet.active && bullet.y < 0) {
        bullet.setActive(false);
        bullet.setVisible(false);
      }
    }, this);
  }

  toggleShotgunMode() {
    this.isShotgunMode = !this.isShotgunMode;
    console.log(this.isShotgunMode ? "Shotgun mode ON" : "Shotgun mode OFF");
  }

  fireBullet() {
    const bullet = this.bullets.get(this.player.x, this.player.y - 20, 'bullet');
    if (bullet) {
      bullet.setActive(true);
      bullet.setVisible(true);
      bullet.body.velocity.y = -400;
      this.lastFired = this.time.now + 300;
    }
  }

  fireShotgun() {
    const bulletCount = 5;
    const angleSpread = 5;
    const startAngle = -100;

    for (let i = 0; i < bulletCount; i++) {
      const angle = Phaser.Math.DegToRad(startAngle + (i * angleSpread));
      const bullet = this.bullets.get(this.player.x, this.player.y - 30, 'bullet2');
      if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.body.velocity.x = Math.cos(angle) * 300;
        bullet.body.velocity.y = Math.sin(angle) * 300;
      }
    }
    this.lastFired = this.time.now + 500;
  }

  spawnEnemy() {
    const x = Phaser.Math.Between(0, 800);
    const enemy = this.enemies.create(x, -10, 'enemy');
    enemy.setVelocityY(100);
  }

  handleBulletHit(bullet, enemy) {
    bullet.destroy();
    enemy.destroy();
  }

  handlePlayerHit(player, enemy) {
    enemy.destroy();
    this.playerHealth--;
    this.healthText.setText('Health: ' + this.playerHealth);

    if (this.playerHealth <= 0) {
      this.physics.pause();
      player.setTint(0xff0000);

      this.gameOverText = this.add.text(400, 300, 'GAME OVER', {
        fontSize: '64px',
        fill: '#ff0000',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      this.restartText = this.add.text(400, 370, 'Refresh Page to Restart', {
        fontSize: '32px',
        fill: '#ffffff'
      }).setOrigin(0.5);
    }
  }
}
