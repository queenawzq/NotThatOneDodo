import Phaser from 'phaser';
import { Player } from '../objects/Player';

export class InputController {
  private scene: Phaser.Scene;
  private player: Player;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  private keyA: Phaser.Input.Keyboard.Key | undefined;
  private keyD: Phaser.Input.Keyboard.Key | undefined;
  private isPointerDown: boolean = false;
  private pointerX: number = 0;

  constructor(scene: Phaser.Scene, player: Player) {
    this.scene = scene;
    this.player = player;

    this.setupKeyboard();
    this.setupPointer();
  }

  private setupKeyboard(): void {
    if (this.scene.input.keyboard) {
      this.cursors = this.scene.input.keyboard.createCursorKeys();
      this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }
  }

  private setupPointer(): void {
    this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.isPointerDown = true;
      this.pointerX = pointer.x;
    });

    this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (this.isPointerDown) {
        this.pointerX = pointer.x;
      }
    });

    this.scene.input.on('pointerup', () => {
      this.isPointerDown = false;
    });
  }

  update(): void {
    // Keyboard takes priority
    const leftPressed = this.cursors?.left.isDown || this.keyA?.isDown;
    const rightPressed = this.cursors?.right.isDown || this.keyD?.isDown;

    if (leftPressed && !rightPressed) {
      this.player.moveLeft();
      return;
    }

    if (rightPressed && !leftPressed) {
      this.player.moveRight();
      return;
    }

    // Check pointer/touch input
    if (this.isPointerDown) {
      this.player.moveToX(this.pointerX);
      return;
    }

    // No input - stop
    this.player.stop();
  }

  destroy(): void {
    this.scene.input.off('pointerdown');
    this.scene.input.off('pointermove');
    this.scene.input.off('pointerup');
  }
}
