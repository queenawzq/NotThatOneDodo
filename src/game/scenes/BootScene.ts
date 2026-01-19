import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  create(): void {
    // Initialize registry with default values
    this.registry.set('score', 0);
    this.registry.set('highScore', this.getStoredHighScore());
    this.registry.set('lives', 3);

    // Proceed to preload
    this.scene.start('PreloadScene');
  }

  private getStoredHighScore(): number {
    try {
      const stored = localStorage.getItem('dodo_highScore');
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  }
}
