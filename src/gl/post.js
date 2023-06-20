import * as THREE from "three";
// import { Vector2 } from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";

import { Shader } from "./mat/post/base";

export class Post extends EffectComposer {
  constructor({ renderer, scene, camera }) {
    super(renderer);
    window.isMobile ? (this.isOn = false) : (this.isOn = true);
    this.renderer = renderer;

    this.renderPass = new RenderPass(scene, camera);
    this.addPass(this.renderPass);

    this.createPasses();
  }

  createPasses() {
    this.createTexture();
    this.pass = new Shader({
      tx: this.tx,
    });

    this.addPass(this.pass);
  }

  createTexture() {
    this.size = 32;
    const width = this.size;
    const height = this.size;

    const size = width * height;
    const data = new Float32Array(4 * size);
    const color = new THREE.Color(0xffffff);

    const r = Math.floor(color.r * 255);
    const g = Math.floor(color.g * 255);
    const b = Math.floor(color.b * 255);

    for (let i = 0; i < size; i++) {
      const r = Math.random() * 255;
      const stride = i * 4;

      data[stride] = r;
      data[stride + 1] = g;
      data[stride + 2] = b;
      data[stride + 3] = 255;
    }

    this.tx = new THREE.DataTexture(
      data,
      width,
      height,
      THREE.RGBFormat,
      THREE.FloatType
    );

    this.tx.minFilter = this.tx.magFilter = THREE.NearestFilter;
    this.tx.needsUpdate = true;
  }

  renderPasses(t) {
    this.updateTexture();

    //  -----------
    this.pass?.run(t);
  }

  updateTexture() {
    if (!this.isRunning) return;
    const data = this.tx.image.data;
    const { mouse } = window.app.gl;

    for (let i = 0; i < data.length; i += 4) {
      data[i] *= 0.9;
      data[i + 1] *= 0.9;
    }

    // window.app.gl.mouse.
    let gridMouseX = this.size * mouse.x;
    let gridMouseY = this.size * (1 - mouse.y);
    let maxDist = 12;

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        let distance = (gridMouseX - i) ** 2 + (gridMouseY - j) ** 2;
        let maxDistSq = maxDist ** 2;

        if (distance < maxDistSq) {
          let index = (i + this.size * j) * 4;

          let power = maxDist / Math.sqrt(distance);
          if (distance === 0) power = 1;

          data[index] += mouse.vx * 1 * power;
          data[index + 1] += mouse.vy * 1 * power;
        }
      }
    }

    this.tx.needsUpdate = true;
  }
}
