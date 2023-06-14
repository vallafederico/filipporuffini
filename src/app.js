import { Gl } from "./gl/gl.js";
import { Scroll } from "./scroll.js";

class App {
  constructor() {
    console.log("App live");

    this.init();
  }

  init() {
    this.scroll = new Scroll();
    this.gl = new Gl();

    this.render();
  }

  render(time) {
    this.scroll.render(time);
    this.gl?.render();

    requestAnimationFrame(this.render.bind(this));
  }
}

window.app = new App();
