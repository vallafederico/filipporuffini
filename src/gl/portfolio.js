import { Group } from "three";
import { clientRectGl } from "./util/clientRect";
import Material from "./mat/portfolio";
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
      ry: Math.PI / 4,
    };

    this.baseMaterial = new Material({});
    this.screenMaterial = new Material({});

    this.traverse(model);

    this.element = document.querySelector('[data-track="folio"]');
    this.observe = new Observe({
      element: this.element,
    });
    // this.observe.on("IN", () => (this.visible = true));
    // this.observe.on("OUT", () => (this.visible = false));

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

    this.add(model);
  }

  render(t) {
    this.track?.render(t);
    this.position.y =
      this.ctrl.y +
      this.ctrl.movey -
      this.track.value * window.app.gl.vp.viewSize.h;

    this.rotation.y = this.ctrl.ry + window.app.gl.mouse.ex;
    this.rotation.x = window.app.gl.mouse.ey * 0.2;

    // this.ctrl.screen.rotation.x = Math.sin(t) * 0.3;
  }

  resize(px = window.app.gl.vp.pixelSize) {
    console.log("resize", px);
  }

  traverse(model) {
    // console.log("traverse");

    model.traverse((o) => {
      if (o.isMesh) {
        // console.log(o.name);

        if (o.name === "screen") {
          // this.screenMesh = o;
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
