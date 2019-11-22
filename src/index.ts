export interface IPlugin {
  run(player: MediaPlayer);
}

export interface IMediaPlayerConfig {
  el: HTMLMediaElement;
  plugins: IPlugin[];
}

export default class MediaPlayer {
  private plugins: IPlugin[];
  media: HTMLMediaElement;
  container: HTMLElement;

  constructor(config: IMediaPlayerConfig) {
    this.media = config.el;
    this.plugins = config.plugins || [];
    this.initPlayer();
    this.initPlugins();
  }

  private initPlayer() {
    this.container = document.createElement("div");
    this.container.style.position = "relative";
    this.media.parentNode.insertBefore(this.container, this.media);
    this.container.appendChild(this.media);
  }

  private initPlugins() {
    this.plugins.forEach(plugin => plugin.run(this));
  }

  play() {
    this.media.play();
  }

  pause() {
    this.media.pause();
  }

  togglePlay() {
    if (this.media.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  isMuted(): boolean {
    return this.media.muted;
  }

  mute() {
    this.media.muted = true;
  }

  unmute() {
    this.media.muted = false;
  }
}
