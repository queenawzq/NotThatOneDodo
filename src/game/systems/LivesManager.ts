import Phaser from 'phaser';
import { GameConstants } from '../constants/GameConstants';

export class LivesManager extends Phaser.Events.EventEmitter {
  private scene: Phaser.Scene;
  private lives: number;

  constructor(scene: Phaser.Scene) {
    super();
    this.scene = scene;
    this.lives = GameConstants.STARTING_LIVES;
    this.scene.registry.set('lives', this.lives);
  }

  getLives(): number {
    return this.lives;
  }

  loseLife(amount: number = 1): void {
    const oldLives = this.lives;
    this.lives = Math.max(0, this.lives - amount);

    if (this.lives !== oldLives) {
      this.scene.registry.set('lives', this.lives);
      this.emit('livesChanged', this.lives);

      if (this.lives <= 0) {
        this.emit('gameOver');
      }
    }
  }

  addLife(amount: number = 1): void {
    const oldLives = this.lives;
    this.lives = Math.min(GameConstants.MAX_LIVES, this.lives + amount);

    if (this.lives !== oldLives) {
      this.scene.registry.set('lives', this.lives);
      this.emit('livesChanged', this.lives);
    }
  }

  reset(): void {
    this.lives = GameConstants.STARTING_LIVES;
    this.scene.registry.set('lives', this.lives);
    this.emit('livesChanged', this.lives);
  }
}
