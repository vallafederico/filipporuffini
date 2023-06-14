import { Group, WebGLRenderTarget } from "three";
// import { clientRectGl } from "./util/clientRect";
import Material from "./mat/glass";
import Backside from "./mat/glassbs";
import { Background } from "./glassBg";
import Tween from "gsap";

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

    this.c = {
      scale: window.isMobile ? 2 : 3,
    };

    this.ctrl = new Group();
    console.log(model);

    // function that swaps two elements in an array
    function swap(arr, i, j) {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    swap(model, 4, 2);
    swap(model, 4, 3);

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
      if (i !== 2) {
        child.visible = false;
        child.scale.set(0, 0, 0);
      }
    });

    this.resize();

    // this.rotation.x = Math.PI / 2;

    // this.ctrl.scale.set(this.c.scale, this.c.scale, this.c.scale);
    this.ctrl.scale.set(0, 0, 0);

    this.initSlider();
    this.initBackgorund();
    if (window.isMobile) this.initMobileMenu();
    this.initEaster();

    // setTimeout(() => {
    //   this.introAnimation();
    // }, 1000);
  }

  introAnimation() {
    Tween.to(this.ctrl.scale, {
      x: this.c.scale,
      y: this.c.scale,
      z: this.c.scale,
      duration: 1,
      ease: "power4.inOut",
    });
  }

  initBackgorund() {
    this.bg = new Background();
    this.add(this.bg);

    this.resize();
  }

  initEaster() {
    this.isEasterView = false;
    this.easterTrigger = [...document.querySelectorAll('[data-view="easter"]')];

    const toggle = () => {
      this.isEasterView = !this.isEasterView;
      // console.log("toggle", this.isEasterView);

      if (this.easterAnimation) this.easterAnimation.kill();
      if (this.isEasterView) {
        // shrink
        this.easterAnimation = Tween.to(this.ctrl.scale, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1,
          ease: "power4.inOut",
        });
      } else {
        // grow
        this.easterAnimation = Tween.to(this.ctrl.scale, {
          x: this.c.scale,
          y: this.c.scale,
          z: this.c.scale,
          duration: 1,
          delay: 0.5,
          ease: "power4.inOut",
        });
      }
    };

    this.easterTrigger.forEach((trigger) => {
      trigger.addEventListener("click", toggle);
    });
  }

  initMobileMenu() {
    this.menuOpen = false;
    this.mobileTriggers = document.querySelectorAll('[data-mmenu="toggle"]');

    const toggle = () => {
      this.menuOpen = !this.menuOpen;
      this.bg.toggleMenu(this.menuOpen);
    };

    this.mobileTriggers.forEach((trigger) => {
      trigger.addEventListener("click", toggle);
    });
  }

  render(t, scroll = 0) {
    this.position.y = scroll;

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

    const animate = (i) => {
      return new Promise((resolve) => {
        Tween.to(this.ctrl.children[this.current].scale, {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.2,
          // delay: 0,
          ease: "expo.out",
          onComplete: () => {
            this.ctrl.children[this.current].visible = false;
          },
        });

        this.ctrl.children[i].visible = true;
        Tween.to(this.ctrl.children[i].scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.5,
          // delay: 0.2,
          ease: "expo.out",
          onComplete: () => {
            this.isAnimating = false;
            resolve();
          },
        });
      });
    };

    const mouseTrigger = (i) => {
      if (i === this.current) return;
      if (this.isAnimating) return;

      animate(i).then(() => (this.current = i));
      this.isAnimating = true;

      //   console.log(i);
    };

    [...document.querySelectorAll("[data-e]")].forEach((el, i) => {
      el.addEventListener("mouseenter", () => mouseTrigger(i));
    });
  }
}
