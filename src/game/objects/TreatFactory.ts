import Phaser from 'phaser';
import { Treat } from './Treat';
import { TreatConfig, SafeTreats, UnsafeTreats } from '../constants/TreatTypes';
import { GameConstants } from '../constants/GameConstants';

export class TreatFactory {
  private scene: Phaser.Scene;
  private treatGroup: Phaser.Physics.Arcade.Group;
  private spawnTimer: Phaser.Time.TimerEvent | null = null;

  private fallSpeed: number = GameConstants.BASE_FALL_SPEED;
  private spawnInterval: number = GameConstants.BASE_SPAWN_INTERVAL;
  private unsafeRatio: number = GameConstants.BASE_UNSAFE_RATIO;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.treatGroup = scene.physics.add.group({
      classType: Treat,
      runChildUpdate: true
    });
  }

  getGroup(): Phaser.Physics.Arcade.Group {
    return this.treatGroup;
  }

  startSpawning(): void {
    this.spawnTreat();
    this.scheduleNextSpawn();
  }

  stopSpawning(): void {
    if (this.spawnTimer) {
      this.spawnTimer.destroy();
      this.spawnTimer = null;
    }
  }

  private scheduleNextSpawn(): void {
    this.spawnTimer = this.scene.time.delayedCall(this.spawnInterval, () => {
      this.spawnTreat();
      this.scheduleNextSpawn();
    });
  }

  private spawnTreat(): void {
    const config = this.selectTreatConfig();
    const x = this.getRandomX();
    const y = -GameConstants.TREAT_SIZE;

    const treat = new Treat(this.scene, x, y, config, this.fallSpeed);
    this.scene.add.existing(treat);
    this.scene.physics.add.existing(treat);
    this.treatGroup.add(treat);
    treat.startFalling();
  }

  private selectTreatConfig(): TreatConfig {
    // Decide if this should be unsafe
    const isUnsafe = Math.random() < this.unsafeRatio;
    const pool = isUnsafe ? UnsafeTreats : SafeTreats;

    // Weighted random selection
    const totalWeight = pool.reduce((sum, t) => sum + t.weight, 0);
    let random = Math.random() * totalWeight;

    for (const treat of pool) {
      random -= treat.weight;
      if (random <= 0) {
        return treat;
      }
    }

    // Fallback to first item
    return pool[0];
  }

  private getRandomX(): number {
    const padding = GameConstants.TREAT_SIZE;
    return Phaser.Math.Between(padding, GameConstants.GAME_WIDTH - padding);
  }

  updateDifficulty(fallSpeed: number, spawnInterval: number, unsafeRatio: number): void {
    this.fallSpeed = fallSpeed;
    this.spawnInterval = spawnInterval;
    this.unsafeRatio = unsafeRatio;
  }

  update(): void {
    // Remove treats that have fallen off screen
    this.treatGroup.getChildren().forEach((child) => {
      const treat = child as Treat;
      if (treat.y > GameConstants.GAME_HEIGHT + GameConstants.TREAT_SIZE) {
        treat.destroy();
      }
    });
  }

  clearAll(): void {
    this.treatGroup.clear(true, true);
  }
}
