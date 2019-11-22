import MediaPlayer, { IPlugin } from "..";

export default class AutoPlayPlugin implements IPlugin {
  run(player: MediaPlayer) {
    if (!player.isMuted()) {
      player.mute();
    }
    player.play();
  }
}
