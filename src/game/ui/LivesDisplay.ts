import Phaser from 'phaser';
import { GameConstants } from '../constants/GameConstants';
import { LivesManager } from '../systems/LivesManager';

export class LivesDisplay {
  private scene: Phaser.Scene;
  private livesManager: LivesManager;
  private hearts: Phaser.GameObjects.Image[] = [];
  private readonly heartSpacing: number = 30;

  constructor(scene: Phaser.Scene, livesManager: LivesManager) {
    this.scene = scene;
    this.livesManager = livesManager;

    this.createHearts();

    // Listen for lives changes
    this.livesManager.on('livesChanged', this.onLivesChanged, this);
  }

  private createHearts(): void {
    const startX = GameConstants.GAME_WIDTH - GameConstants.UI_PADDING - (GameConstants.MAX_LIVES - 1) * this.heartSpacing;
    const y = GameConstants.UI_PADDING + 12;

    for (let i = 0; i < GameConstants.MAX_LIVES; i++) {
      const heart = this.scene.add.image(
        startX + i * this.heartSpacing,
        y,
        'heart'
      );
      heart.setDepth(100);
      this.hearts.push(heart);
    }

    this.updateDisplay();
  }

  private onLivesChanged(lives: number): void {
    // Animate the lost heart
    const lostIndex = lives;
    if (lostIndex < this.hearts.length) {
      const lostHeart = this.hearts[lostIndex];

      // Shake and fade animation
      this.scene.tweens.add({
        targets: lostHeart,
        x: { from: lostHeart.x - 5, to: lostHeart.x + 5 },
        duration: 50,
        yoyo: true,
        repeat: 3
      });

      this.scene.tweens.add({
        targets: lostHeart,
        alpha: { from: 1, to: 0.3 },
        scale: { from: 1, to: 0.8 },
        duration: 300,
        onComplete: () => {
          lostHeart.setTexture('heartEmpty');
          lostHeart.setAlpha(0.5);
          lostHeart.setScale(1);
        }
      });
    }

    this.updateDisplay();
  }

  private updateDisplay(): void {
    const currentLives = this.livesManager.getLives();

    this.hearts.forEach((heart, index) => {
      if (index < currentLives) {
        heart.setTexture('heart');
        heart.setAlpha(1);
      } else {
        heart.setTexture('heartEmpty');
        heart.setAlpha(0.5);
      }
    });
  }

  destroy(): void {
    this.livesManager.off('livesChanged', this.onLivesChanged, this);
    this.hearts.forEach(heart => heart.destroy());
  }
}
