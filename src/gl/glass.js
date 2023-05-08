import { Group } from "three";
import { clientRectGl } from "./util/clientRect";
import Material from "./mat/glass";

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
    this.add(...model);

    this.material = new Material({});
    this.children.forEach((child, i) => {
      child.material = this.material;
      if (i !== 2) child.visible = false;
      //   console.log(child.name, i);
    });

    this.resize();

    // this.rotation.x = Math.PI / 2;
    this.scale.set(2.5, 2.5, 2.5);

    this.initSlider();
  }

  render(t, scroll = 0) {
    this.position.y = scroll;

    this.rotation.y = t * 0.3;
    this.rotation.z = t * 0.2;
    this.rotation.x = t * 0.5;
  }

  resize(px = window.app.gl.vp.pixelSize) {
    this.element = document.querySelector(".hero-w");
    // console.log("resize", px);

    // this.bounds = clientRectGl(this.element, px);
    // console.log(this.bounds);
  }

  /* Slider */

  initSlider() {
    this.current = 2;
    // console.log("slider init");

    const mouseTrigger = (i) => {
      if (i === this.current) return;
      this.children[this.current].visible = false;

      this.children[i].visible = true;
      this.current = i;
      //   console.log(i);
    };

    [...document.querySelectorAll("[data-e]")].forEach((el, i) => {
      el.addEventListener("mouseenter", () => mouseTrigger(i));
    });
  }
}
