import Phaser from 'phaser';
import { GameConstants } from '../constants/GameConstants';
import { ScoreManager } from '../systems/ScoreManager';

export class ScoreDisplay {
  private scene: Phaser.Scene;
  private scoreText: Phaser.GameObjects.Text;
  private scoreManager: ScoreManager;

  constructor(scene: Phaser.Scene, scoreManager: ScoreManager) {
    this.scene = scene;
    this.scoreManager = scoreManager;

    // Create score text
    this.scoreText = scene.add.text(
      GameConstants.UI_PADDING,
      GameConstants.UI_PADDING,
      'Score: 0',
      {
        fontSize: `${GameConstants.SCORE_FONT_SIZE}px`,
        color: '#2C3E50',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold'
      }
    );
    this.scoreText.setDepth(100);

    // Listen for score changes
    this.scoreManager.on('scoreChanged', this.onScoreChanged, this);
  }

  private onScoreChanged(score: number, delta: number): void {
    this.scoreText.setText(`Score: ${score}`);

    // Pulse animation
    this.scene.tweens.add({
      targets: this.scoreText,
      scale: { from: 1.2, to: 1 },
      duration: 150,
      ease: 'Back.easeOut'
    });

    // Color flash based on positive/negative
    if (delta > 0) {
      this.scoreText.setColor('#27AE60');
    } else if (delta < 0) {
      this.scoreText.setColor('#E74C3C');
    }

    this.scene.time.delayedCall(200, () => {
      this.scoreText.setColor('#2C3E50');
    });
  }

  destroy(): void {
    this.scoreManager.off('scoreChanged', this.onScoreChanged, this);
  }
}
