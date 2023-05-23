#define MPI 3.1415926535897932384626433832795

// attribute vec2 uv1;

uniform float u_time;
varying vec2 v_uv;
// varying vec2 v_uv1;


void main() {
  vec3 pos = position;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  v_uv = uv;
  // v_uv1 = uv1;
}
