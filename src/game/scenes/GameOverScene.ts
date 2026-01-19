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

    // Play game over sound
    this.sound.play('sfx-game-over');

    // Background
    const bg = this.add.image(centerX, GameConstants.GAME_HEIGHT / 2, 'game-over-background');
    bg.setDisplaySize(GameConstants.GAME_WIDTH, GameConstants.GAME_HEIGHT);
    bg.setDepth(-1);

    // Update high score if needed
    if (isNewHighScore) {
      this.registry.set('highScore', score);
      this.saveHighScore(score);
    }

    // Game Over title image
    const gameOverText = this.add.image(centerX, 180, 'game-over-text');
    gameOverText.setOrigin(0.5);
    gameOverText.setScale(0.5);

    // Your Score image
    const yourScoreImg = this.add.image(centerX, 350, 'your-score');
    yourScoreImg.setOrigin(0.5);
    yourScoreImg.setScale(0.6);

    const scoreText = this.add.text(centerX, 420, score.toString(), {
      fontSize: '77px',
      color: '#2C3E50',
      fontFamily: 'PixelGame',
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
      const newHighText = this.add.text(centerX, 470, 'NEW HIGH SCORE!', {
        fontSize: '36px',
        color: '#FFFFFF',
        fontFamily: 'PixelGame',
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
      this.add.text(centerX, 470, `High Score: ${highScore}`, {
        fontSize: '30px',
        color: '#FFFFFF',
        fontFamily: 'PixelGame'
      }).setOrigin(0.5);
    }

    // Restart button
    const restartButton = this.add.image(centerX, 560, 'restart-button')
      .setInteractive({ useHandCursor: true });
    restartButton.setScale(0.56);

    restartButton.on('pointerover', () => {
      restartButton.setScale(0.62);
      this.sound.play('sfx-select');
    });

    restartButton.on('pointerout', () => {
      restartButton.setScale(0.56);
    });

    restartButton.on('pointerdown', () => {
      this.sound.play('sfx-start');
      this.restartGame();
    });

    // Keyboard shortcuts
    this.input.keyboard?.once('keydown-SPACE', () => {
      this.restartGame();
    });
    this.input.keyboard?.once('keydown-ENTER', () => {
      this.restartGame();
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
}
