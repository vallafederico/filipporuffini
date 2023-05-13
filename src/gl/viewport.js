export default class {
  constructor() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio, 2);
    this.container = document.querySelector('[data-gl="c"]');
  }

  resize() {
    this.w = this.container.offsetWidth;
    this.h = this.container.offsetHeight;
  }

  get viewSize() {
    const fovInRad = (this.camera.fov * Math.PI) / 180;
    const height = Math.abs(
      this.camera.position.z * Math.tan(fovInRad / 2) * 2
    );

    // console.log(this.camera);
    return { w: height * (this.w / this.h), h: height };
  }

  get pixelSize() {
    return (this.viewSize.w / this.w + this.viewSize.h / this.h) / 2;
  }
}
