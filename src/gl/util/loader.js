import { ASSETS } from "../assets/";
import loadTexture from "./texture-loader";
import loadModel from "./model-loader";

export default class {
  constructor(data) {
    this.data = data;
  }

  async load() {
    console.time("::");
    const [m_type] = await Promise.all([loadModel(ASSETS.m_type)]);

    // window.loaded = {};
    console.timeEnd("::");

    return {
      m_type,
    };
  }

  pipeload() {}
}
