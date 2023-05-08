# Webflow Dev Boilerplate

#### Webflow

- [ ] canvas

- [ ] triggers for changing model

- [ ] remove lenis from site code
  - [ ] remove import script

- [ ] markers for tracking (hero-w)

- [ ] data-e on hero triggers

<!--
// Lenis starter by Off Brand
class Scroll extends Lenis {
  constructor() {
    super({
      duration: 1.1,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // https://easings.net
      direction: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.2
    });

    this.time = 0;
    this.isActive = true;
    this.init();
  }

  init() {
    this.config();
    this.render();
  }

  config() {
    // allow scrolling on overflow elements
    const overscroll = [
      ...document.querySelectorAll('[data-scroll="overscroll"]')
    ];

    if (overscroll.length > 0) {
      overscroll.forEach((item) =>
        item.setAttribute("onwheel", "event.stopPropagation()")
      );
    }

    // toggle page scrolling
    const toggle = [...document.querySelectorAll('[data-scroll="toggle"]')];
    if (toggle.length > 0) {
      toggle.forEach((item) => {
        item.onclick = () => {
          if (this.isActive) {
            this.stop();
            this.isActive = false;
          } else {
            this.start();
            this.isActive = true;
          }
        };
      });
    }

    // anchor links
    const anchor = [...document.querySelectorAll("[data-scrolllink]")];
    if (anchor.length > 0) {
      anchor.forEach((item) => {
        const id = parseFloat(item.dataset.scrolllink);
        const target = document.querySelector(`[data-scrolltarget="${id}"]`);
        if (target) {
          console.log(id, target);
          item.onclick = () => this.scrollTo(target);
        }
      });
    }
  }

  render() {
    this.raf((this.time += 10));
    window.requestAnimationFrame(this.render.bind(this));
  }
}

window.Scroll = new Scroll();
observeEditor(); // don't trigger if it's webflow editor view


function observeEditor() {
  const html = document.documentElement;
  const config = { attributes: true, childList: false, subtree: false };

  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === "attributes") {
        const btn = document.querySelector(".w-editor-bem-EditSiteButton");
        const bar = document.querySelector(".w-editor-bem-EditorMainMenu");
        const addTrig = (target) =>
          target.addEventListener("click", () => window.Scroll.destroy());

        if (btn) addTrig(btn);
        if (bar) addTrig(bar);
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(html, config);
}
</script>
-->
