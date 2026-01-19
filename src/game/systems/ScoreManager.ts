import Phaser from 'phaser';

export class ScoreManager extends Phaser.Events.EventEmitter {
  private scene: Phaser.Scene;
  private score: number = 0;

  constructor(scene: Phaser.Scene) {
    super();
    this.scene = scene;
    this.reset();
  }

  getScore(): number {
    return this.score;
  }

  addPoints(points: number): void {
    const oldScore = this.score;
    this.score = Math.max(0, this.score + points);

    if (this.score !== oldScore) {
      this.scene.registry.set('score', this.score);
      this.emit('scoreChanged', this.score, points);
    }
  }

  reset(): void {
    this.score = 0;
    this.scene.registry.set('score', 0);
  }
}
