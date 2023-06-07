import { ASSETS } from "../assets/";
import loadTexture from "./texture-loader";
import loadModel from "./model-loader";

export default class {
  constructor(data) {
    this.data = data;
    this.progress = 0;
    this.total = 3;
  }

  async load() {
    console.time("::");

    const [m_type, tx_mac, tx_rock] = await Promise.all([
      loadModel(ASSETS.m_type).then((val) => this.updateCallback(val)),
      loadTexture(ASSETS.tx_mac).then((val) => this.updateCallback(val)),
      loadTexture(ASSETS.tx_rock).then((val) => this.updateCallback(val)),
    ]);

    tx_mac.flipY = false;
    tx_rock.flipY = false;

    console.timeEnd("::");

    return {
      m_type,
      tx_mac,
      tx_rock,
    };
  }

  updateCallback(val) {
    this.progress++;

    // console.log("updateCallback", this.progress / this.total);

    window.dispatchEvent(
      new CustomEvent("loadProgress", {
        detail: {
          progress: this.progress / this.total,
        },
      })
    );

    return val;
  }

  // pipeload() {}
}
