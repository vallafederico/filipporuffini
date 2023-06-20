import { WebGLRenderer } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Tween from "gsap";

import Viewport from "./viewport.js";
import Scene from "./scene.js";
import Camera from "./camera.js";
import Loader from "./util/loader.js";

import { Post } from "./post.js";

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
    this.mouse = { x: 0, y: 0, ex: 0, ey: 0, ox: 0, oy: 0 };

    this.create();
    this.initEvents();
  }

  initEvents() {
    // prettier-ignore
    new ResizeObserver((entry) => this.resize(entry[0].contentRect)).observe(this.vp.container);

    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX / this.vp.w;
      this.mouse.y = e.clientY / this.vp.h;

      Tween.to(this.mouse, {
        ex: this.mouse.x * 2 - 1,
        ey: -this.mouse.y * 2 - 1,
        duration: 0.5,
        ease: "linear",
      });

      this.mouse.vx = this.mouse.x - this.mouse.ox;
      this.mouse.vy = this.mouse.y - this.mouse.oy;

      this.mouse.ox = this.mouse.x;
      this.mouse.oy = this.mouse.y;

      // console.log(this.mouse.vx, this.mouse.vy);
    });
  }

  create() {
    this.scene = new Scene();
    this.post = new Post({
      renderer: this.renderer,
      scene: this.scene,
      camera: this.camera,
    });

    this.load();
  }

  async load() {
    this.loader = new Loader();
    this.assets = await this.loader.load();
    this.scene.create();

    this.render();
  }

  animateIn() {
    // console.log("animateIn from the outside");
    this.scene.glass.introAnimation();
    window.sscroll.start();
    this.post.isRunning = true;
  }

  render() {
    if (this.paused) return;
    this.time += 0.01;

    this.controls?.update();

    this.mouse.vx *= 0.9;
    this.mouse.vy *= 0.9;

    if (this.scene && this.scene.render) this.scene.render(this.time);

    // requestAnimationFrame(this.render.bind(this));
    // this.renderer.render(this.scene, this.camera);

    if (this.post?.isOn) {
      this.post.renderPasses(this.time);
      this.post.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }

  resize() {
    // console.log("resize");
    this.vp.resize();
    this.renderer.setSize(this.vp.w, this.vp.h);
    this.camera.aspect = this.vp.w / this.vp.h;
    this.camera.updateProjectionMatrix();

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
