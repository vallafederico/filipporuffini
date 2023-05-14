import { Group, VideoTexture } from "three";
// import { clientRectGl } from "./util/clientRect";
import Material from "./mat/portfolio";
import ScreenMat from "./mat/screen";
import { Observe } from "./util/observe";
import { Track } from "./util/track";

export class Portfolio extends Group {
  constructor({ model }) {
    super();
    // this.visible = false;
    this.ctrl = {
      screen: null,
      y: 0,
      movey: -0.5,
      ry: Math.PI / 6,
    };

    console.log(model);

    this.baseMaterial = new Material({});
    this.screenMaterial = new ScreenMat({});

    this.traverse(model);

    this.element = document.querySelector('[data-track="folio"]');
    this.observe = new Observe({
      element: this.element,
    });
    this.observe.on("IN", () => (this.visible = true));
    this.observe.on("OUT", () => (this.visible = false));

    this.track = new Track({
      element: document.querySelector('[data-track="mac"]'),
      config: {
        bounds: [1, 0],
      },
    });

    this.resize();

    // this.rotation.y = Math.PI / 4;
    this.position.x = 0.3;
    this.scale.set(1.9, 1.9, 1.9);

    this.initSlider();

    this.add(model);
  }

  initSlider() {
    // this.index = 0;
    this.items = [...document.querySelectorAll("[data-video]")].map((el, i) => {
      // create video
      const video = document.createElement("video");
      video.src = el.dataset.video;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.crossOrigin = "anonymous";
      video.play();

      el.addEventListener("mouseenter", () => this.swapVideo(i));

      return { el, videoTexture: new VideoTexture(video) };
    });
  }

  swapVideo(i) {
    if (this.index === i) return;
    this.index = i;
    this.screenMaterial.texture = this.items[i].videoTexture;

    // console.log("enter", this.index);
  }

  render(t) {
    this.track?.render(t);
    this.position.y =
      this.ctrl.y +
      this.ctrl.movey -
      this.track.value * window.app.gl.vp.viewSize.h;

    this.rotation.y = this.ctrl.ry + window.app.gl.mouse.ex * 0.2;
    this.rotation.x = window.app.gl.mouse.ey * 0.2;

    this.ctrl.screen.rotation.x = window.app.gl.mouse.ey * 0.5 + 0.3;
  }

  resize(px = window.app.gl.vp.pixelSize) {
    // console.log("resize", px);
  }

  traverse(model) {
    // console.log("traverse");

    model.traverse((o) => {
      if (o.isMesh) {
        // console.log(o.name);
        if (o.name === "screen") {
          o.material = this.screenMaterial;
        } else {
          o.material = this.baseMaterial;
        }
      }

      if (!o.isMesh) {
        // console.log(o.name);
        if ((o.name = "_SCREEN")) this.ctrl.screen = o;
      }
    });
  }
}
