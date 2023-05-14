uniform float u_time;
uniform sampler2D u_t1; 

varying vec2 v_uv;
// varying vec3 vPosition;


void main() {
  vec2 uv = v_uv;
  uv += vec2(0.5);
  uv.y *= 1.6;
  uv.y -= 0.6;
  uv -= vec2(0.5);


  vec4 img = texture2D(u_t1, uv);

  gl_FragColor = img;
  // gl_FragColor = vec4(1., 0., 0., 1.);
}