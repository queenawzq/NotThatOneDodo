import Phaser from 'phaser';
import { GameConstants } from '../constants/GameConstants';
import { TreatFactory } from '../objects/TreatFactory';

export class DifficultyManager extends Phaser.Events.EventEmitter {
  private scene: Phaser.Scene;
  private treatFactory: TreatFactory;
  private levelTimer: Phaser.Time.TimerEvent | null = null;
  private currentLevel: number = 1;
  private elapsedTime: number = 0;

  constructor(scene: Phaser.Scene, treatFactory: TreatFactory) {
    super();
    this.scene = scene;
    this.treatFactory = treatFactory;
  }

  start(): void {
    this.currentLevel = 1;
    this.elapsedTime = 0;
    this.applyDifficulty();
    this.startLevelTimer();
  }

  stop(): void {
    if (this.levelTimer) {
      this.levelTimer.destroy();
      this.levelTimer = null;
    }
  }

  private startLevelTimer(): void {
    this.levelTimer = this.scene.time.addEvent({
      delay: GameConstants.LEVEL_DURATION,
      callback: this.levelUp,
      callbackScope: this,
      loop: true
    });
  }

  private levelUp(): void {
    if (this.currentLevel < GameConstants.MAX_LEVEL) {
      this.currentLevel++;
      this.elapsedTime += GameConstants.LEVEL_DURATION;
      this.applyDifficulty();
      this.emit('levelUp', this.currentLevel);
    }
  }

  private applyDifficulty(): void {
    const progress = (this.currentLevel - 1) / (GameConstants.MAX_LEVEL - 1);

    // Calculate fall speed (linear interpolation)
    const fallSpeed = GameConstants.BASE_FALL_SPEED +
      (GameConstants.MAX_FALL_SPEED - GameConstants.BASE_FALL_SPEED) * progress;

    // Calculate spawn interval (inverse - decreases over time)
    const spawnInterval = GameConstants.BASE_SPAWN_INTERVAL -
      (GameConstants.BASE_SPAWN_INTERVAL - GameConstants.MIN_SPAWN_INTERVAL) * progress;

    // Calculate unsafe ratio
    const unsafeRatio = GameConstants.BASE_UNSAFE_RATIO +
      (GameConstants.MAX_UNSAFE_RATIO - GameConstants.BASE_UNSAFE_RATIO) * progress;

    this.treatFactory.updateDifficulty(fallSpeed, spawnInterval, unsafeRatio);
  }

  getCurrentLevel(): number {
    return this.currentLevel;
  }

  reset(): void {
    this.stop();
    this.currentLevel = 1;
    this.elapsedTime = 0;
  }
}
