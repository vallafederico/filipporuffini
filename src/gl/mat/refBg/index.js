import { RawShaderMaterial, DoubleSide, Texture } from "three";
import loadTexture from "../../util/texture-loader";

import vertexShader from "./vertex.vert";
import fragmentShader from "./fragment.frag";

export default class extends RawShaderMaterial {
  constructor(options) {
    super({
      vertexShader,
      fragmentShader,
    });

    this.uniforms = {
      u_time: { value: options?.u_time || 0 },
      u_t1: { value: new Texture() },
    };

    this.getTexture(options.src);

    this.side = DoubleSide;
    // this.wireframe= true;
    this.transparent = true;
  }

  async getTexture(src) {
    const tx = await loadTexture(src);
    this.uniforms.u_t1.value = tx;
  }

  set time(t) {
    this.uniforms.u_time.value = t;
  }
}
