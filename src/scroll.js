import Lenis from "@studio-freight/lenis";

export function customExpo(x) {
  return Math.min(1, 1.001 - Math.pow(2, -10 * x));
}

const customcss = injectCSS(`
    .lenis.lenis-smooth {
      scroll-behavior: auto;  
    }
    html.lenis {
      height: auto;
    }
`);

function injectCSS(string) {
  const style = document.createElement("style");
  style.textContent = string;
  document.head.append(style);
}

injectCSS(customcss);

export class Scroll extends Lenis {
  constructor() {
    super({
      duration: 1,
      smoothWheel: true,
      easing: customExpo,
      orientation: "vertical",
      smoothTouch: false,
      touchMultiplier: 2,
    });

    this.isActive = true;
    this.timeFactor = 10;
    this.time = 0;

    this.init();
    window.sscroll = this;
  }

  init() {
    this.y = window.scrollY;
    this.max = window.innerHeight;
    this.speed = 0;
    this.percent = this.y / (document.body.scrollHeight - window.innerHeight);

    this.on("scroll", ({ scroll, limit, velocity, progress }) => {
      this.y = scroll || 0;
      this.max = limit || window.innerHeight;
      this.speed = velocity || 0;
      this.percent = progress || 0;
    });
  }

  to(target) {
    this.scrollTo(target, {
      offset: 0,
      duration: 0.8,
      easing: easeOutExpo,
      immediate: false,
    });
  }

  resize() {}

  render(t) {
    if (!this.isActive) return;
    // console.log(this.time);

    this.raf((t += this.timeFactor));
  }

  /**
   * @param {boolean} value
   */
  set active(value) {
    this.isActive = value;
  }
}
