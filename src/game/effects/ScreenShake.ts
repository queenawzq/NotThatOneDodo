import Phaser from 'phaser';

export type ShakeIntensity = 'light' | 'medium' | 'heavy';

const SHAKE_CONFIG: Record<ShakeIntensity, { duration: number; intensity: number }> = {
  light: { duration: 80, intensity: 0.003 },
  medium: { duration: 120, intensity: 0.006 },
  heavy: { duration: 200, intensity: 0.01 }
};

export class ScreenShake {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  shake(intensity: ShakeIntensity = 'medium'): void {
    const config = SHAKE_CONFIG[intensity];
    this.scene.cameras.main.shake(config.duration, config.intensity);
  }

  light(): void {
    this.shake('light');
  }

  medium(): void {
    this.shake('medium');
  }

  heavy(): void {
    this.shake('heavy');
  }
}
