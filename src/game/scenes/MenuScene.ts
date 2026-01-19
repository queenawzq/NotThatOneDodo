import Phaser from 'phaser';
import { GameConstants } from '../constants/GameConstants';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create(): void {
    const centerX = GameConstants.GAME_WIDTH / 2;

    // Background
    const bg = this.add.image(centerX, GameConstants.GAME_HEIGHT / 2, 'menu-background');
    bg.setDisplaySize(GameConstants.GAME_WIDTH, GameConstants.GAME_HEIGHT);
    bg.setDepth(-1);

    // Logo
    const logo = this.add.image(centerX, 200, 'logo');
    logo.setScale(0.52);

    // Bounce animation for logo
    this.tweens.add({
      targets: logo,
      y: 190,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Subtitle
    const subtitle = this.add.image(centerX, 420, 'subtitle');
    subtitle.setOrigin(0.5);
    subtitle.setScale(0.5);

    // Play button
    const playButton = this.add.image(centerX, 480, 'play-button')
      .setInteractive({ useHandCursor: true });
    playButton.setScale(0.5);

    // Button hover effects
    playButton.on('pointerover', () => {
      playButton.setScale(0.55);
    });

    playButton.on('pointerout', () => {
      playButton.setScale(0.5);
    });

    playButton.on('pointerdown', () => {
      this.startGame();
    });

    // High score display
    const highScore = this.registry.get('highScore') || 0;
    this.add.text(centerX, 560, `High Score: ${highScore}`, {
      fontSize: '20px',
      color: '#7F8C8D',
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    // Controls hint
    this.add.text(centerX, 620, 'Use arrow keys or mouse/touch to move', {
      fontSize: '14px',
      color: '#95A5A6',
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    // Keyboard support for starting
    this.input.keyboard?.once('keydown-SPACE', () => {
      this.startGame();
    });
    this.input.keyboard?.once('keydown-ENTER', () => {
      this.startGame();
    });
  }

  private startGame(): void {
    this.cameras.main.fadeOut(300, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('GameScene');
    });
  }
}
