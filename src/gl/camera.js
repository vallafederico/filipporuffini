import { PerspectiveCamera } from "three";

export default class extends PerspectiveCamera {
  constructor(
    fov = 20,
    aspect = window.innerWidth / window.innerHeight,
    near = 0.1,
    far = 100
  ) {
    super(fov, aspect, near, far);
  }
}
