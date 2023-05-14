import { ASSETS } from "../assets/";
import loadTexture from "./texture-loader";
import loadModel from "./model-loader";

export default class {
  constructor(data) {
    this.data = data;
  }

  async load() {
    console.time("::");
    const [m_type, tx_mac] = await Promise.all([
      loadModel(ASSETS.m_type),
      loadTexture(ASSETS.tx_mac),
    ]);

    tx_mac.flipY = false;
    // window.loaded = {};
    console.timeEnd("::");

    return {
      m_type,
      tx_mac,
    };
  }

  pipeload() {}
}
