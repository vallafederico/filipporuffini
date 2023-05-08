import { CubeTextureLoader, Math } from "three";
const tl = new CubeTextureLoader();

/*  ORDER IS: px, nx, py, ny, pz, nz
    const { px, nx, py, ny, pz, nz } = IMPORTEDPATH;
    const cbmarr = [px, nx, py, ny, pz, nz]
*/

export default function loadCube(arr) {
  return new Promise((resolve) => {
    tl.load(arr, (data) => {
      data.needsUpdate = true;
      // console.log(data);
      resolve(data);
    });
  });
}
