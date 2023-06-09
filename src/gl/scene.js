import { Scene } from "three";
// import Quad from "./quad.js";
import { Glass } from "./glass.js";
import { Portfolio } from "./portfolio.js";

export default class extends Scene {
  constructor() {
    super();
  }

  create() {
    // console.log(window.app.gl.assets.m_type);

    this.glass = new Glass({
      model: window.app.gl.assets.m_type.children[1].children,
    });
    this.add(this.glass);

    this.portfolio = new Portfolio({
      model: window.app.gl.assets.m_type.children[0],
    });

    this.add(this.portfolio);

    this.isActive = true;
  }

  render(t) {
    if (!this.isActive) return;
    const scroll = window.sscroll.y * window.app.gl.vp.pixelSize;

    this.glass?.render(t, scroll);
    this.portfolio?.render(t, scroll);
    // if (this.quad) this.quad.render(t);
  }

  resize() {
    const px = window.app.gl.vp.pixelSize;
    this.glass?.resize(px);
  }
}
