import { Group, VideoTexture } from "three";
import Material from "./mat/portfolio";
import ScreenMat from "./mat/screen";
import { Track } from "./util/track";

export class Portfolio extends Group {
  constructor({ model }) {
    super();
    // this.visible = false;
    this.ctrl = {
      screen: null,
      y: 0,
      x: 0.3,
      movey: 0,
      ry: 0,
      rx: 0.5,
      scale: window.isMobile ? 1 : 2,
    };

    this.baseMaterial = new Material({ t1: window.app.gl.assets.tx_mac });
    this.rockMaterial = new Material({ t1: window.app.gl.assets.tx_rock });
    this.screenMaterial = new ScreenMat({});

    this.traverse(model);

    this.initTrackers();

    this.scale.set(this.ctrl.scale, this.ctrl.scale, this.ctrl.scale);
    this.position.x = this.ctrl.x;

    this.resize();
    this.initSlider();
    this.frustumCulled = false;
    model.frustumCulled = false;

    this.add(model);
  }

  initTrackers() {
    this.track = new Track({
      element: document.querySelector('[data-track="mac"]'),
      config: {
        bounds: [1, 0],
      },
    });

    this.footerTrack = new Track({
      element: document.querySelector('[data-track="footer"]'),
      config: {
        bounds: [0, 1],
        bottom: "bottom",
      },
    });
  }

  initSlider() {
    // this.index = 0;
    this.items = [...document.querySelectorAll("[data-video]")].map((el, i) => {
      // create video
      const video = document.createElement("video");
      video.src = el.dataset.video;
      // video.autoplay = true;
      video.playsInline = true;
      video.loop = true;
      video.muted = true;
      video.crossOrigin = "anonymous";

      if (window.isMobile) {
        el.addEventListener("click", () => this.swapVideo(i));
      } else el.addEventListener("mouseenter", () => this.swapVideo(i));

      return { el, videoTexture: new VideoTexture(video), video };
    });

    this.swapVideo(0);
  }

  swapVideo(i) {
    if (this.index === i) return;
    this.index = i;
    this.screenMaterial.texture = this.items[i].videoTexture;

    this.items[i].video.play().catch((err) => {
      console.log(err);
    });
  }

  render(t) {
    this.track?.render(t);
    this.footerTrack?.render(t);
    // console.log(this.footerTrack.value);

    this.position.y =
      this.ctrl.y +
      this.ctrl.movey -
      this.track.value * 3 * window.app.gl.vp.viewSize.h -
      this.footerTrack.value * window.app.gl.vp.viewSize.h;

    this.rotation.y = this.ctrl.ry + window.app.gl.mouse.ex * 0.2;
    this.rotation.x = this.ctrl.rx + window.app.gl.mouse.ey * 0.2;
  }

  resize(px = window.app.gl.vp.pixelSize) {
    this.track?.resize();
    this.footerTrack?.resize();
    // console.log("resize", px);
  }

  traverse(model) {
    // console.log("traverse");

    model.traverse((o) => {
      if (o.isMesh) {
        o.frustumCulled = false;

        switch (o.name) {
          case "_screen":
            o.material = this.screenMaterial;
            break;
          case "rock":
            o.material = this.rockMaterial;
            break;
          default:
            o.material = this.baseMaterial;
        }
      }
    });
  }
}
