import { ShaderMaterial, DoubleSide, FrontSide, Texture } from "three";
import vertexShader from "./vertex.vert";
import fragmentShader from "./fragment.frag";

export default class extends ShaderMaterial {
  constructor(options) {
    super({
      vertexShader,
      fragmentShader,
    });

    this.uniforms = {
      u_time: { value: options?.u_time || 0 },
      u_res: { value: [window.app.gl.vp.w, window.app.gl.vp.h] },
      u_diff: { value: new Texture() },
      u_bs: { value: new Texture() },
    };

    this.side = FrontSide;
    // this.wireframe= true;
    // this.transparent= true;
  }

  set time(t) {
    this.uniforms.u_time.value = t;
  }

  set texture(t) {
    this.uniforms.u_diff.value = t;
  }

  set bstexture(t) {
    this.uniforms.u_bs.value = t;
  }
}
