import Phaser from 'phaser';
import { TreatTypes } from '../constants/TreatTypes';
import { GameConstants } from '../constants/GameConstants';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload(): void {
    // Load treat images from assets folder
    for (const treat of TreatTypes) {
      this.load.image(treat.key, `assets/treats/${treat.key}.png`);
    }
  }

  create(): void {
    // Generate placeholder textures for non-treat assets
    this.createPlayerTexture();
    this.createHeartTexture();
    this.createButtonTexture();

    // Proceed to menu
    this.scene.start('MenuScene');
  }

  private createPlayerTexture(): void {
    const graphics = this.make.graphics({ x: 0, y: 0 });
    const width = GameConstants.PLAYER_WIDTH;
    const height = GameConstants.PLAYER_HEIGHT;

    // Body (brown rectangle with rounded appearance)
    graphics.fillStyle(0x8B4513); // Saddle brown
    graphics.fillRoundedRect(0, 10, width, height - 10, 8);

    // Head
    graphics.fillStyle(0xA0522D); // Sienna
    graphics.fillCircle(width / 2, 15, 18);

    // Ears
    graphics.fillStyle(0x654321); // Dark brown
    graphics.fillEllipse(12, 5, 10, 15);
    graphics.fillEllipse(width - 12, 5, 10, 15);

    // Eyes
    graphics.fillStyle(0x000000);
    graphics.fillCircle(width / 2 - 8, 12, 4);
    graphics.fillCircle(width / 2 + 8, 12, 4);

    // Nose
    graphics.fillStyle(0x000000);
    graphics.fillCircle(width / 2, 22, 5);

    // Tongue (happy dog!)
    graphics.fillStyle(0xFF69B4);
    graphics.fillEllipse(width / 2 + 5, 28, 6, 4);

    graphics.generateTexture('player', width, height);
    graphics.destroy();
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
