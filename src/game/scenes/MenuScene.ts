import Phaser from 'phaser';
import { GameConstants } from '../constants/GameConstants';

export class MenuScene extends Phaser.Scene {
  private bgMusic!: Phaser.Sound.BaseSound;

  constructor() {
    super({ key: 'MenuScene' });
  }

  create(): void {
    const centerX = GameConstants.GAME_WIDTH / 2;

    // Start background music
    if (!this.sound.get('bgm-game')?.isPlaying) {
      this.bgMusic = this.sound.add('bgm-game', { loop: true, volume: 0.5 });
      this.bgMusic.play();
    }

    // Unlock audio on first interaction
    this.input.once('pointerdown', () => {
      if (this.sound.locked) {
        this.sound.unlock();
      }
    });

    // Background (interactive to unlock audio)
    const bg = this.add.image(centerX, GameConstants.GAME_HEIGHT / 2, 'menu-background');
    bg.setDisplaySize(GameConstants.GAME_WIDTH, GameConstants.GAME_HEIGHT);
    bg.setDepth(-1);
    bg.setInteractive();

    // Logo
    const logo = this.add.image(centerX, 250, 'logo');
    logo.setScale(0.52);

    // Bounce animation for logo
    this.tweens.add({
      targets: logo,
      y: 240,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Subtitle
    const subtitle = this.add.image(centerX, 460, 'subtitle');
    subtitle.setOrigin(0.5);
    subtitle.setScale(0.6);

    // Play button
    const playButton = this.add.image(centerX, 560, 'play-button')
      .setInteractive({ useHandCursor: true });
    playButton.setScale(0.7);

    // Button hover effects
    playButton.on('pointerover', () => {
      playButton.setScale(0.77);
      this.sound.play('sfx-select');
    });

    playButton.on('pointerout', () => {
      playButton.setScale(0.7);
    });

    playButton.on('pointerdown', () => {
      this.sound.play('sfx-start');
      this.startGame();
    });

    // Controls hint
    this.add.text(centerX, 660, 'Use arrow keys or mouse/touch to move', {
      fontSize: '26px',
      color: '#000000',
      fontFamily: 'PixelGame'
    }).setOrigin(0.5);

    // Keyboard support for starting
    this.input.keyboard?.once('keydown-SPACE', () => {
      this.sound.play('sfx-start');
      this.startGame();
    });
    this.input.keyboard?.once('keydown-ENTER', () => {
      this.sound.play('sfx-start');
      this.startGame();
    });
  }

  private startGame(): void {
    // Stop menu music before transitioning
    this.sound.stopByKey('bgm-game');

    this.cameras.main.fadeOut(300, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('GameScene');
    });
  }
}
