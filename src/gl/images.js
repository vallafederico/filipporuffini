import { Group, Mesh, PlaneGeometry, TextureLoader } from "three";

import Material from "./mat/image/";

import { clientRectGl } from "./util/clientRect.js";

export class Image extends Group {
  constructor({ el }) {
    super();
    this.el = el;

    this.el.forEach((el) => {
      //   el.style.opacity = 0;
      el.style.visibility = "hidden";
    });
    // console.log("images", el);
    this.create();
  }

  create() {
    this.imgs = this.el.map((el) => new Img({ el }));
    this.add(...this.imgs);
  }

  resize() {
    this.imgs?.forEach((img) => img.resize());
  }

  render(t, scroll) {
    this.position.y = scroll;
  }
}

// ----
class Img extends Mesh {
  constructor({ el }) {
    super();

    this.el = el;
    this.texture = new TextureLoader().load(this.el.src);
    this.el.onload = () =>
      (this.texture = new TextureLoader().load(this.el.src));

    this.ratio = {
      x: this.el.naturalWidth / this.el.parentElement.clientWidth,
      y: this.el.naturalHeight / this.el.parentElement.clientHeight,
    };

    this.dataT = window.app.gl.assets.grid_tx;
    // console.log(this.dataT);

    this.geometry = new PlaneGeometry(1, 1);
    this.material = new Material({
      u_t1: this.texture,
      u_ratio: this.ratio,
    });

    // console.log("image", el);
  }

  resize() {
    this.rect = clientRectGl(this.el.parentElement, window.app.gl.vp.pixelSize);
    // console.log(this.rect);

    this.scale.set(this.rect.width, this.rect.height, 1);
    this.position.x = this.rect.left - this.rect.ww / 2 + this.rect.width / 2;
    this.position.y = -this.rect.top + this.rect.wh / 2 - this.rect.height / 2;
  }

  render() {}
}
