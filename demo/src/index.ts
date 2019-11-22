import MediaPlayer from "../../src";
import AutoPlayPlugin from "../../src/plugins/auto-play.plugin";
import AutoPausePlugin from "../../src/plugins/auto-pause.plugin";
import AdsPlugin from "../../src/plugins/ads.plugin";

const video = document.querySelector("video");
const player = new MediaPlayer({
  el: video,
  plugins: [new AutoPlayPlugin(), new AutoPausePlugin(), new AdsPlugin()]
});

const playButton: HTMLElement = document.querySelector("#play");
playButton.onclick = () => player.togglePlay();

const muteButton: HTMLElement = document.querySelector("#mute");
muteButton.onclick = () => {
  if (player.media.muted) {
    player.unmute();
  } else {
    player.mute();
  }
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").catch(error => {
    console.log(error.message);
  });
}
