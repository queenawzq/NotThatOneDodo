import Phaser from 'phaser';
import { TreatConfig } from '../constants/TreatTypes';
import { GameConstants } from '../constants/GameConstants';

export class Treat extends Phaser.Physics.Arcade.Sprite {
  public config: TreatConfig;
  public fallSpeed: number;

  constructor(scene: Phaser.Scene, x: number, y: number, config: TreatConfig, fallSpeed: number) {
    super(scene, x, y, config.key);

    this.config = config;
    this.fallSpeed = fallSpeed;

    // Scale image proportionally to fit target size (3x bigger)
    const targetSize = GameConstants.TREAT_SIZE * 3;
    const maxDimension = Math.max(this.width, this.height);
    const scale = targetSize / maxDimension;
    this.setScale(scale);
  }

  startFalling(): void {
    this.setVelocityY(this.fallSpeed);
    this.setAngularVelocity(Phaser.Math.Between(-50, 50));
  }

  isSafe(): boolean {
    return this.config.category === 'safe';
  }

  isUnsafe(): boolean {
    return this.config.category === 'unsafe';
  }

  getPoints(): number {
    return this.config.points;
  }

  getLivesChange(): number {
    return this.config.livesChange;
  }

  updateFallSpeed(newSpeed: number): void {
    this.fallSpeed = newSpeed;
    this.setVelocityY(newSpeed);
  }
}
