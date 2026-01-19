import Phaser from 'phaser';
import { GameConstants } from '../constants/GameConstants';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  create(): void {
    const centerX = GameConstants.GAME_WIDTH / 2;
    const score = this.registry.get('score') || 0;
    const highScore = this.registry.get('highScore') || 0;
    const isNewHighScore = score > 0 && score >= highScore;

    // Update high score if needed
    if (isNewHighScore) {
      this.registry.set('highScore', score);
      this.saveHighScore(score);
    }

    // Game Over title
    this.add.text(centerX, 120, 'Game Over', {
      fontSize: '48px',
      color: '#E74C3C',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Score display
    this.add.text(centerX, 220, 'Your Score', {
      fontSize: '20px',
      color: '#7F8C8D',
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    const scoreText = this.add.text(centerX, 270, score.toString(), {
      fontSize: '64px',
      color: '#2C3E50',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Score animation
    this.tweens.add({
      targets: scoreText,
      scale: { from: 0.5, to: 1 },
      duration: 500,
      ease: 'Back.easeOut'
    });

    // New high score celebration
    if (isNewHighScore) {
      const newHighText = this.add.text(centerX, 340, 'NEW HIGH SCORE!', {
        fontSize: '24px',
        color: '#F39C12',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      this.tweens.add({
        targets: newHighText,
        scale: { from: 0.8, to: 1.1 },
        duration: 400,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    } else {
      this.add.text(centerX, 340, `High Score: ${highScore}`, {
        fontSize: '20px',
        color: '#95A5A6',
        fontFamily: 'Arial, sans-serif'
      }).setOrigin(0.5);
    }

    // Play Again button
    const playAgainButton = this.add.image(centerX, 450, 'buttonGreen')
      .setInteractive({ useHandCursor: true });

    const playAgainText = this.add.text(centerX, 450, 'Play Again', {
      fontSize: '22px',
      color: '#FFFFFF',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    playAgainButton.on('pointerover', () => {
      playAgainButton.setScale(1.05);
      playAgainText.setScale(1.05);
    });

    playAgainButton.on('pointerout', () => {
      playAgainButton.setScale(1);
      playAgainText.setScale(1);
    });

    playAgainButton.on('pointerdown', () => {
      this.restartGame();
    });

    // Menu button
    const menuButton = this.add.image(centerX, 520, 'buttonGray')
      .setInteractive({ useHandCursor: true });

    const menuText = this.add.text(centerX, 520, 'Menu', {
      fontSize: '22px',
      color: '#FFFFFF',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    menuButton.on('pointerover', () => {
      menuButton.setScale(1.05);
      menuText.setScale(1.05);
    });

    menuButton.on('pointerout', () => {
      menuButton.setScale(1);
      menuText.setScale(1);
    });

    menuButton.on('pointerdown', () => {
      this.goToMenu();
    });

    // Keyboard shortcuts
    this.input.keyboard?.once('keydown-SPACE', () => {
      this.restartGame();
    });
    this.input.keyboard?.once('keydown-ENTER', () => {
      this.restartGame();
    });
    this.input.keyboard?.once('keydown-ESC', () => {
      this.goToMenu();
    });

    // Fade in
    this.cameras.main.fadeIn(300);
  }

  private saveHighScore(score: number): void {
    try {
      localStorage.setItem('dodo_highScore', score.toString());
    } catch {
      // localStorage might not be available
    }
  }

  private restartGame(): void {
    this.cameras.main.fadeOut(200, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('GameScene');
    });
  }

  private goToMenu(): void {
    this.cameras.main.fadeOut(200, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('MenuScene');
    });
  }
}
