import Phaser from 'phaser';
import { GameConstants } from '../constants/GameConstants';
import { Player } from '../objects/Player';
import { Treat } from '../objects/Treat';
import { TreatFactory } from '../objects/TreatFactory';
import { InputController } from '../systems/InputController';
import { ScoreManager } from '../systems/ScoreManager';
import { LivesManager } from '../systems/LivesManager';
import { DifficultyManager } from '../systems/DifficultyManager';
import { ScoreDisplay } from '../ui/ScoreDisplay';
import { LivesDisplay } from '../ui/LivesDisplay';
import { PointsPopup } from '../ui/PointsPopup';
import { ScreenShake } from '../effects/ScreenShake';
import { PlayerFeedback } from '../effects/PlayerFeedback';

export class GameScene extends Phaser.Scene {
  private player!: Player;
  private treatFactory!: TreatFactory;
  private inputController!: InputController;
  private scoreManager!: ScoreManager;
  private livesManager!: LivesManager;
  private difficultyManager!: DifficultyManager;
  private scoreDisplay!: ScoreDisplay;
  private livesDisplay!: LivesDisplay;
  private pointsPopup!: PointsPopup;
  private screenShake!: ScreenShake;
  private playerFeedback!: PlayerFeedback;
  private isGameOver: boolean = false;
  private bgMusic!: Phaser.Sound.BaseSound;

  constructor() {
    super({ key: 'GameScene' });
  }

  create(): void {
    this.isGameOver = false;

    // Set up background image
    const bg = this.add.image(
      GameConstants.GAME_WIDTH / 2,
      GameConstants.GAME_HEIGHT / 2,
      'background'
    );
    bg.setDisplaySize(GameConstants.GAME_WIDTH, GameConstants.GAME_HEIGHT);
    bg.setDepth(-1);

    // Create systems
    this.scoreManager = new ScoreManager(this);
    this.livesManager = new LivesManager(this);
    this.treatFactory = new TreatFactory(this);
    this.difficultyManager = new DifficultyManager(this, this.treatFactory);

    // Create player
    const playerY = GameConstants.GAME_HEIGHT - GameConstants.PLAYER_Y_OFFSET;
    this.player = new Player(
      this,
      GameConstants.GAME_WIDTH / 2,
      playerY
    );

    // Create input controller
    this.inputController = new InputController(this, this.player);

    // Create effects
    this.screenShake = new ScreenShake(this);
    this.playerFeedback = new PlayerFeedback(this.player, this.screenShake);

    // Create UI
    this.scoreDisplay = new ScoreDisplay(this, this.scoreManager);
    this.livesDisplay = new LivesDisplay(this, this.livesManager);
    this.pointsPopup = new PointsPopup(this);

    // Set up collisions
    this.physics.add.overlap(
      this.player,
      this.treatFactory.getGroup(),
      this.handleTreatCollision,
      undefined,
      this
    );

    // Listen for game over
    this.livesManager.on('gameOver', this.handleGameOver, this);

    // Listen for level up
    this.difficultyManager.on('levelUp', this.handleLevelUp, this);

    // Start the game
    this.treatFactory.startSpawning();
    this.difficultyManager.start();

    // Start background music
    this.bgMusic = this.sound.add('bgm-game', { loop: true, volume: 0.5 });
    this.bgMusic.play();

    // Fade in
    this.cameras.main.fadeIn(300);
  }

  update(): void {
    if (this.isGameOver) return;

    this.inputController.update();
    this.treatFactory.update();
  }

  private handleTreatCollision(
    _player: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile,
    treatObj: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
  ): void {
    const treat = treatObj as Treat;
    if (!treat.active) return;

    const points = treat.getPoints();
    const livesChange = treat.getLivesChange();
    const isSafe = treat.isSafe();

    // Show points popup
    if (points !== 0) {
      this.pointsPopup.show(treat.x, treat.y, points);
    }

    // Play eat sound for any treat
    this.sound.play('sfx-eat');

    // Apply effects
    if (isSafe) {
      // Good treat collected
      this.scoreManager.addPoints(points);
      this.playerFeedback.happy();
      // Play earn point sound
      this.sound.play('sfx-earn-point');
    } else {
      // Bad treat collected
      if (points !== 0) {
        this.scoreManager.addPoints(points);
      }
      if (livesChange !== 0) {
        this.livesManager.loseLife(Math.abs(livesChange));
        this.playerFeedback.oops(true);
        // Play die sound when losing a life
        this.sound.play('sfx-die');
      } else {
        this.playerFeedback.oops(false);
      }
    }

    // Destroy the treat
    treat.destroy();
  }

  private handleLevelUp(level: number): void {
    // Show level up notification
    const levelText = this.add.text(
      GameConstants.GAME_WIDTH / 2,
      GameConstants.GAME_HEIGHT / 2,
      `Level ${level}`,
      {
        fontSize: '32px',
        color: '#FFFFFF',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        stroke: '#2C3E50',
        strokeThickness: 4
      }
    );
    levelText.setOrigin(0.5);
    levelText.setDepth(200);

    // Animate and remove
    this.tweens.add({
      targets: levelText,
      scale: { from: 0.5, to: 1.2 },
      alpha: { from: 1, to: 0 },
      y: levelText.y - 50,
      duration: 1000,
      ease: 'Cubic.easeOut',
      onComplete: () => levelText.destroy()
    });
  }

  private handleGameOver(): void {
    if (this.isGameOver) return;
    this.isGameOver = true;

    // Stop spawning
    this.treatFactory.stopSpawning();
    this.difficultyManager.stop();

    // Heavy shake
    this.screenShake.heavy();

    // Delay before transition
    this.time.delayedCall(800, () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.cleanup();
        this.scene.start('GameOverScene');
      });
    });
  }

  private cleanup(): void {
    this.inputController.destroy();
    this.scoreDisplay.destroy();
    this.livesDisplay.destroy();
    this.livesManager.off('gameOver', this.handleGameOver, this);
    this.difficultyManager.off('levelUp', this.handleLevelUp, this);
    this.treatFactory.clearAll();
    // Stop background music
    this.bgMusic.stop();
  }
}
