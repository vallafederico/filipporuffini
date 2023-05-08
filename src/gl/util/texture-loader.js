import { TextureLoader } from "three";
const tl = new TextureLoader();

export default function loadTexture(url) {
  return new Promise((resolve) => {
    tl.load(url, (data) => {
      data.needsUpdate = true;
      resolve(data);
    });
  });
}

// this.texture = await loadTexture(dbgImg);
