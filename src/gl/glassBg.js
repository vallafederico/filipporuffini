import { Group, Mesh, PlaneGeometry, WebGLRenderTarget, Texture } from "three";
import { clientRectGl } from "./util/clientRect";
// import loadTexture from "./util/texture-loader";

import Material from "./mat/refBg";

export class Background extends Group {
  constructor() {
    super();

    this.target = new WebGLRenderTarget(window.app.gl.vp.w, window.app.gl.vp.h);
    this.create();
    this.resize();
  }

  create() {
    this.targetScene = new Group();
    this.items = [...document.querySelectorAll("[data-refract]")].map((el) => {
      return new Item({ el, src: el.dataset.refract });
    });

    // console.log(this.items);
    this.targetScene.add(...this.items);
  }

  resize(px = window.app.gl.vp.pixelSize) {
    this.target.setSize(window.app.gl.vp.w, window.app.gl.vp.h);
    this.items.forEach((item) => item.resize(px));
  }

  toTarget() {
    if (!this.target) return new Texture();
    window.app.gl.renderer.setRenderTarget(this.target);
    window.app.gl.renderer.render(this.targetScene, window.app.gl.camera);
    window.app.gl.renderer.setRenderTarget(null);

    return this.target.texture;
  }
}

class Item extends Mesh {
  constructor({ el, src }) {
    super(new PlaneGeometry(1, 1, 1, 1), new Material({ src }));

    this.el = el;
  }

  resize(px = window.app.gl.vp.pixelSize) {
    this.bounds = clientRectGl(this.el, px);
    console.log(this.bounds.width);

    // this.position.x = this.bounds.left - this.bounds.width / 2;
    this.position.y =
      this.bounds.wh / 2 - this.bounds.top - this.bounds.height / 2;
    this.scale.x = this.bounds.width;
    this.scale.y = this.bounds.height;
  }
}
