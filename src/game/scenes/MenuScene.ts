import Phaser from 'phaser';
import { GameConstants } from '../constants/GameConstants';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create(): void {
    const centerX = GameConstants.GAME_WIDTH / 2;

    // Title
    this.add.text(centerX, 150, 'Not That One,', {
      fontSize: '36px',
      color: '#2C3E50',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(centerX, 200, 'Dodo!', {
      fontSize: '52px',
      color: '#E74C3C',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(centerX, 280, 'Catch the good treats!\nAvoid the bad ones!', {
      fontSize: '18px',
      color: '#34495E',
      fontFamily: 'Arial, sans-serif',
      align: 'center',
      lineSpacing: 8
    }).setOrigin(0.5);

    // Player preview
    const playerPreview = this.add.image(centerX, 380, 'player');
    playerPreview.setScale(1.5);

    // Bounce animation for player
    this.tweens.add({
      targets: playerPreview,
      y: 370,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Play button
    const playButton = this.add.image(centerX, 500, 'buttonGreen')
      .setInteractive({ useHandCursor: true });

    const playText = this.add.text(centerX, 500, 'PLAY', {
      fontSize: '24px',
      color: '#FFFFFF',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Button hover effects
    playButton.on('pointerover', () => {
      playButton.setScale(1.05);
      playText.setScale(1.05);
    });

    playButton.on('pointerout', () => {
      playButton.setScale(1);
      playText.setScale(1);
    });

    playButton.on('pointerdown', () => {
      this.startGame();
    });

    // High score display
    const highScore = this.registry.get('highScore') || 0;
    this.add.text(centerX, 600, `High Score: ${highScore}`, {
      fontSize: '20px',
      color: '#7F8C8D',
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    // Controls hint
    this.add.text(centerX, 670, 'Use arrow keys or mouse/touch to move', {
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
