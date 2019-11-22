import MediaPlayer, { IPlugin } from "..";
import Ads, { IAd } from "./ads";

export default class AdsPlugin implements IPlugin {
  private ads: Ads;
  private player: MediaPlayer;
  private currentAd: IAd;
  private adsContainer: HTMLElement;

  constructor() {
    this.ads = Ads.getInstance();
    this.adsContainer = document.createElement("div");
  }

  run(player: MediaPlayer) {
    this.player = player;
    this.player.container.appendChild(this.adsContainer);
    this.player.media.addEventListener(
      "timeupdate",
      this.handleTimeUpdate.bind(this)
    );
  }

  private handleTimeUpdate() {
    const currentTime = Math.floor(this.player.media.currentTime);
    if (currentTime % 30 === 0) {
      this.renderAd();
    }
  }

  private renderAd() {
    if (this.currentAd) {
      return;
    }

    const ad = this.ads.getAd();
    this.currentAd = ad;
    const { url, imageUrl, title, body } = this.currentAd;

    this.adsContainer.innerHTML = `
      <div class="ads">
        <a class="ads__link" href="${url}" target="_blank">
          <img class="ads__img" src="${imageUrl}" />
          <div class="ads__info">
            <h5 class="ads__title">${title}</h5>
            <p class="ads__body">${body}</p>
          </div>
        </a>
      </div>
    `;

    setTimeout(() => {
      this.currentAd = null;
      this.adsContainer.innerHTML = "";
    }, 10000);
  }
}
