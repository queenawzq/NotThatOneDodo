import Phaser from 'phaser';
import { GameConstants } from '../constants/GameConstants';

export class Player extends Phaser.Physics.Arcade.Sprite {
  private moveSpeed: number = GameConstants.PLAYER_SPEED;
  private isEating: boolean = false;
  private playerScale: number = 0.1; // Scale down from 512px

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player-run');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Scale down the sprite (512px is large)
    this.setScale(this.playerScale);

    // Set up physics body
    this.setCollideWorldBounds(true);
    this.setImmovable(false);

    // Adjust body size for the scaled sprite
    const body = this.body as Phaser.Physics.Arcade.Body;
    const bodyWidth = 512 * this.playerScale * 0.5;
    const bodyHeight = 512 * this.playerScale * 0.8;
    body.setSize(bodyWidth / this.playerScale, bodyHeight / this.playerScale);
    body.setOffset((512 - bodyWidth / this.playerScale) / 2, (512 - bodyHeight / this.playerScale) / 2);

    // Start with run animation
    this.play('run');
  }

  moveLeft(): void {
    this.setVelocityX(-this.moveSpeed);
    this.setFlipX(true);
    if (!this.isEating && this.anims.currentAnim?.key !== 'run') {
      this.play('run');
    }
  }

  moveRight(): void {
    this.setVelocityX(this.moveSpeed);
    this.setFlipX(false);
    if (!this.isEating && this.anims.currentAnim?.key !== 'run') {
      this.play('run');
    }
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
    // Play eat animation
    this.isEating = true;
    this.play('eat');

    // Return to run animation after eat completes
    this.once('animationcomplete', () => {
      this.isEating = false;
      this.play('run');
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
