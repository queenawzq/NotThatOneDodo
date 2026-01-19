import { Player } from '../objects/Player';
import { ScreenShake } from './ScreenShake';

export class PlayerFeedback {
  private player: Player;
  private screenShake: ScreenShake;

  constructor(player: Player, screenShake: ScreenShake) {
    this.player = player;
    this.screenShake = screenShake;
  }

  happy(): void {
    this.player.playHappyAnimation();
  }

  oops(lostLife: boolean = false): void {
    this.player.playOopsAnimation();
    this.screenShake.shake(lostLife ? 'medium' : 'light');
  }
}
