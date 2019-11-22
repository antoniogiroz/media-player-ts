import MediaPlayer, { IPlugin } from "..";

export default class AutoPausePlugin implements IPlugin {
  private threshold: number;
  private player: MediaPlayer;

  constructor() {
    this.threshold = 0.35;
  }

  run(player: MediaPlayer) {
    this.player = player;

    const observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        threshold: this.threshold
      }
    );

    observer.observe(this.player.media);

    document.addEventListener(
      "visibilitychange",
      this.handleVisibilityChange.bind(this)
    );
  }

  private handleIntersection(entries: IntersectionObserverEntry[]) {
    const [entry] = entries;
    const isVisible = entry.intersectionRatio >= this.threshold;

    if (isVisible) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }

  private handleVisibilityChange() {
    const isVisible = document.visibilityState === "visible";
    if (isVisible) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }
}
