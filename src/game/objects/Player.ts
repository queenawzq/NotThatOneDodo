import Phaser from 'phaser';
import { GameConstants } from '../constants/GameConstants';

export class Player extends Phaser.Physics.Arcade.Sprite {
  private moveSpeed: number = GameConstants.PLAYER_SPEED;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Set up physics body
    this.setCollideWorldBounds(true);
    this.setImmovable(false);

    // Adjust body size for better collision
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(GameConstants.PLAYER_WIDTH - 10, GameConstants.PLAYER_HEIGHT - 10);
    body.setOffset(5, 5);
  }

  moveLeft(): void {
    this.setVelocityX(-this.moveSpeed);
  }

  moveRight(): void {
    this.setVelocityX(this.moveSpeed);
  }

  stop(): void {
    this.setVelocityX(0);
  }

  moveToX(targetX: number): void {
    const diff = targetX - this.x;
    const threshold = 5;

    if (Math.abs(diff) < threshold) {
      this.stop();
    } else if (diff < 0) {
      this.moveLeft();
    } else {
      this.moveRight();
    }
  }

  playHappyAnimation(): void {
    // Scale bounce
    this.scene.tweens.add({
      targets: this,
      scaleX: { from: 1.2, to: 1 },
      scaleY: { from: 0.8, to: 1 },
      duration: 150,
      ease: 'Back.easeOut'
    });

    // Gold tint flash
    this.setTint(0xFFD700);
    this.scene.time.delayedCall(GameConstants.TINT_DURATION, () => {
      this.clearTint();
    });
  }

  playOopsAnimation(): void {
    // Horizontal shake
    const originalX = this.x;
    this.scene.tweens.add({
      targets: this,
      x: { from: originalX - 5, to: originalX + 5 },
      duration: 50,
      yoyo: true,
      repeat: 2,
      onComplete: () => {
        this.x = originalX;
      }
    });

    // Red tint flash
    this.setTint(0xFF0000);
    this.scene.time.delayedCall(GameConstants.TINT_DURATION, () => {
      this.clearTint();
    });
  }
}
