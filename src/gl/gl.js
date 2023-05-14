import { WebGLRenderer } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Tween from "gsap";

import Viewport from "./viewport.js";
import Scene from "./scene.js";
import Camera from "./camera.js";
import Loader from "./util/loader.js";

export class Gl {
  constructor() {
    this.vp = new Viewport();
    this.renderer = new WebGLRenderer({
      antiAlias: true,
      alpha: true,
    });

    this.renderer.setPixelRatio(this.vp.pixelRatio);
    this.renderer.setSize(this.vp.w, this.vp.h);
    this.renderer.setClearColor(0x000000, 0);
    this.vp.container.appendChild(this.renderer.domElement);

    this.camera = this.vp.camera = new Camera();

    this.camera.position.set(0, 0, 6);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.paused = false;
    this.time = 0;

    this.init();
  }

  async init() {
    this.mouse = { x: 0, y: 0, ex: 0, ey: 0 };

    this.create();
    this.initEvents();
  }

  initEvents() {
    // prettier-ignore
    new ResizeObserver((entry) => this.resize(entry[0].contentRect)).observe(this.vp.container);

    window.addEventListener("mousemove", (e) => {
      this.mouse.x = (e.clientX / this.vp.w) * 2 - 1;
      this.mouse.y = -(e.clientY / this.vp.h) * 2 + 1;

      // this.mouse.ex = this.mouse.x;
      // this.mouse.ey = this.mouse.y;

      Tween.to(this.mouse, {
        ex: this.mouse.x,
        ey: this.mouse.y,
        duration: 0.5,
        ease: "linear",
      });
    });
  }

  create() {
    this.scene = new Scene();

    this.load();
  }

  async load() {
    this.loader = new Loader();
    this.assets = await this.loader.load();
    this.scene.create();

    this.render();
  }

  render() {
    if (this.paused) return;
    this.time += 0.01;

    this.controls?.update();

    if (this.scene && this.scene.render) this.scene.render(this.time);

    // requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    this.renderer.setSize(this.vp.w, this.vp.h);
    this.camera.aspect = this.vp.w / this.vp.h;
    this.camera.updateProjectionMatrix();
    this.vp.resize();

    if (this.scene) this.scene.resize();
  }

  /* Utils
   */

  get viewSize() {
    const fovInRad = (this.camera.fov * Math.PI) / 180;
    const height = Math.abs(
      this.camera.position.z * Math.tan(fovInRad / 2) * 2
    );
    return { w: height * (this.vp.w / this.vp.h), h: height };
  }

  get pixelSize() {
    return (this.viewSize.w / this.vp.w + this.viewSize.h / this.vp.h) / 2;
  }
}
