import { Group, WebGLRenderTarget } from "three";
// import { clientRectGl } from "./util/clientRect";
import Material from "./mat/glass";
import Backside from "./mat/glassbs";
import { Background } from "./glassBg";

/*
text-3 0
text-7 1
text-at 2
text-hash 3
text-qm 4
*/

export class Glass extends Group {
  constructor({ model }) {
    super();

    this.ctrl = new Group();
    this.ctrl.add(...model);
    this.add(this.ctrl);

    this.material = new Material({});
    this.bsMaterial = new Backside({});
    this.bsTarget = new WebGLRenderTarget(
      window.app.gl.vp.w,
      window.app.gl.vp.h
    );

    this.ctrl.children.forEach((child, i) => {
      child.material = this.material;
      if (i !== 2) child.visible = false;
    });

    this.resize();

    // this.rotation.x = Math.PI / 2;
    this.ctrl.scale.set(3, 3, 3);

    this.initSlider();
    this.initBackgorund();
  }

  initBackgorund() {
    this.bg = new Background();
    this.add(this.bg);

    this.resize();
  }

  render(t, scroll = 0) {
    this.position.y = scroll;

    // this.ctrl.position.x = window.app.gl.mouse.ex * 0.5;
    // this.ctrl.position.y = window.app.gl.mouse.ey * 0.5;

    this.material.bstexture = this.renderBackside();
    this.material.texture = this.bg?.toTarget();

    this.ctrl.rotation.y = t * 0.3;
    this.ctrl.rotation.z = t * 0.2;
    this.ctrl.rotation.x = t * 0.5;
  }

  renderBackside() {
    this.ctrl.children[this.current].material = this.bsMaterial;
    window.app.gl.renderer.setRenderTarget(this.bsTarget);
    window.app.gl.renderer.render(
      this.ctrl.children[this.current],
      window.app.gl.camera
    );
    window.app.gl.renderer.setRenderTarget(null);
    this.ctrl.children[this.current].material = this.material;

    return this.bsTarget.texture;
  }

  resize(px = window.app.gl.vp.pixelSize) {
    // this.element = document.querySelector(".hero-w");
    // console.log("resize", px);

    this.bg?.resize(px);
    this.bsTarget.setSize(window.app.gl.vp.w, window.app.gl.vp.h);

    // this.bounds = clientRectGl(this.element, px);
    // console.log(this.bounds);
  }

  /* Slider */
  initSlider() {
    this.current = 2;
    // console.log("slider init");

    const mouseTrigger = (i) => {
      if (i === this.current) return;
      this.ctrl.children[this.current].visible = false;

      this.ctrl.children[i].visible = true;
      this.current = i;
      //   console.log(i);
    };

    [...document.querySelectorAll("[data-e]")].forEach((el, i) => {
      el.addEventListener("mouseenter", () => mouseTrigger(i));
    });
  }
}
