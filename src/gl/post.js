// import { Vector2 } from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";

import { Shader } from "./mat/post/base";

export class Post extends EffectComposer {
  constructor({ renderer, scene, camera }) {
    super(renderer);
    this.isOn = true;
    this.renderer = renderer;

    this.renderPass = new RenderPass(scene, camera);
    this.addPass(this.renderPass);

    this.createPasses();
  }

  createPasses() {
    this.addPass(new Shader());
  }

  renderPasses(t) {}
}

/*
if (this.post?.isOn) {
    this.post.renderPasses(this.time);
    this.post.render();
  } else {
    this.renderer.render(this.scene, this.camera);
  }
*/
