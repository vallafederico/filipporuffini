uniform float u_time;
uniform sampler2D u_t1; 



varying vec2 v_uv;
// varying vec2 v_uv1;
// varying vec3 vPosition;


void main() {
vec4 img = texture2D(u_t1, v_uv);

  gl_FragColor = img;
  // gl_FragColor = vec4(1., 0., 0., 1.);
}
