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

    // Load background image
    this.load.image('background', 'assets/ui/background.png');

    // Load logo
    this.load.image('logo', 'assets/ui/logo.png');

    // Load menu background
    this.load.image('menu-background', 'assets/ui/menu-background.png');

    // Load subtitle and play button
    this.load.image('subtitle', 'assets/ui/subtitle.png');
    this.load.image('play-button', 'assets/ui/play-button.png');

    // Load heart images
    this.load.image('heart', 'assets/ui/heart-full.png');
    this.load.image('heartEmpty', 'assets/ui/heart-empty.png');

    // Load game over assets
    this.load.image('game-over-background', 'assets/ui/game-over.png');
    this.load.image('game-over-text', 'assets/ui/game-over-text.png');
    this.load.image('your-score', 'assets/ui/your-score.png');
    this.load.image('restart-button', 'assets/ui/restart-button.png');

    // Load sound effects
    this.load.audio('sfx-eat', 'assets/sound-effects/eat.mp3');
    this.load.audio('sfx-earn-point', 'assets/sound-effects/earn-point.mp3');
    this.load.audio('sfx-die', 'assets/sound-effects/die.mp3');
    this.load.audio('sfx-select', 'assets/sound-effects/select.mp3');
    this.load.audio('sfx-start', 'assets/sound-effects/start.mp3');
    this.load.audio('sfx-game-over', 'assets/sound-effects/game-over-sound-effect.mp3');

    // Load background music
    this.load.audio('bgm-game', 'assets/songs/move-forward.mp3');
  }

  create(): void {
    // Create player animations
    this.createPlayerAnimations();

    // Generate placeholder textures for UI assets
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
