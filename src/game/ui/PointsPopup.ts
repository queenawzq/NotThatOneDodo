import Phaser from 'phaser';
import { GameConstants } from '../constants/GameConstants';

export class PointsPopup {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  show(x: number, y: number, points: number): void {
    const isPositive = points > 0;
    const text = isPositive ? `+${points}` : `${points}`;
    const color = isPositive ? '#27AE60' : '#E74C3C';

    const popup = this.scene.add.text(x, y, text, {
      fontSize: '24px',
      color: color,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      stroke: '#FFFFFF',
      strokeThickness: 3
    });
    popup.setOrigin(0.5);
    popup.setDepth(50);

    // Float up and fade out
    this.scene.tweens.add({
      targets: popup,
      y: y - 60,
      alpha: { from: 1, to: 0 },
      scale: { from: 1, to: 1.2 },
      duration: GameConstants.POPUP_DURATION,
      ease: 'Cubic.easeOut',
      onComplete: () => {
        popup.destroy();
      }
    });
  }
}
