import Phaser from 'phaser';
import { TreatTypes } from '../constants/TreatTypes';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload(): void {
    // Load treat images from assets folder
    for (const treat of TreatTypes) {
      this.load.image(treat.key, `assets/treats/${treat.key}.png`);
    }

    // Load player spritesheets
    this.load.spritesheet('player-run', 'assets/sprite/run.png', {
      frameWidth: 512,
      frameHeight: 512
    });
    this.load.spritesheet('player-eat', 'assets/sprite/eat.png', {
      frameWidth: 512,
      frameHeight: 512
    });
  }

  create(): void {
    // Create player animations
    this.createPlayerAnimations();

    // Generate placeholder textures for UI assets
    this.createHeartTexture();
    this.createButtonTexture();

    // Proceed to menu
    this.scene.start('MenuScene');
  }

  private createPlayerAnimations(): void {
    // Run animation (4 frames)
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player-run', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    // Eat animation (3 frames)
    this.anims.create({
      key: 'eat',
      frames: this.anims.generateFrameNumbers('player-eat', { start: 0, end: 2 }),
      frameRate: 12,
      repeat: 0
    });
  }

  private createHeartTexture(): void {
    const graphics = this.make.graphics({ x: 0, y: 0 });
    const size = 24;

    graphics.fillStyle(0xFF0000);
    // Simple heart shape using circles and triangle
    graphics.fillCircle(7, 8, 7);
    graphics.fillCircle(17, 8, 7);
    graphics.fillTriangle(0, 10, 24, 10, 12, 24);

    graphics.generateTexture('heart', size, size);

    // Empty heart for lost lives
    graphics.clear();
    graphics.lineStyle(2, 0xFF0000);
    graphics.strokeCircle(7, 8, 6);
    graphics.strokeCircle(17, 8, 6);
    graphics.lineBetween(1, 10, 12, 23);
    graphics.lineBetween(23, 10, 12, 23);

    graphics.generateTexture('heartEmpty', size, size);
    graphics.destroy();
  }

  private createButtonTexture(): void {
    const graphics = this.make.graphics({ x: 0, y: 0 });

    // Play button
    graphics.fillStyle(0x4CAF50);
    graphics.fillRoundedRect(0, 0, 160, 50, 10);
    graphics.generateTexture('buttonGreen', 160, 50);

    // Other button (gray)
    graphics.clear();
    graphics.fillStyle(0x607D8B);
    graphics.fillRoundedRect(0, 0, 160, 50, 10);
    graphics.generateTexture('buttonGray', 160, 50);

    graphics.destroy();
  }
}
