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

    const [m_type, tx_mac, tx_rock, grid_tx] = await Promise.all([
      loadModel(ASSETS.m_type),
      loadTexture(ASSETS.tx_mac),
      loadTexture(ASSETS.tx_rock),
    ]);

    tx_mac.flipY = false;
    tx_rock.flipY = false;

    console.timeEnd("::");

    this.updateCallback(1);

    return {
      m_type,
      tx_mac,
      tx_rock,
    };
  }

  updateCallback(val) {
    this.progress++;

    window.dispatchEvent(
      new CustomEvent("loadProgress", {
        detail: {
          progress: this.progress / this.total,
        },
      })
    );

    return val;
  }
}
