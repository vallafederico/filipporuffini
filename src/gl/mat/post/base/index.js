import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import fragmentShader from "./fragment.frag";
import vertexShader from "./vertex.vert";

export const CopyShader = {
  uniforms: {
    tDiffuse: { value: null },
    opacity: { value: 1.0 },
    u_tx: { value: null },
  },
  vertexShader,
  fragmentShader,
};

export class Shader extends ShaderPass {
  constructor({ tx }) {
    super(CopyShader);

    this.uniforms.u_tx.value = tx;
  }

  run(t) {
    // console.log(t);
  }
}
