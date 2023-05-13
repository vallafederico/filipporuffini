precision mediump float;

uniform float u_time;
uniform sampler2D u_t1; 

varying vec2 v_uv;


void main() {

  vec4 img = texture2D(u_t1, v_uv);

  gl_FragColor.rgb = img.rgb;
  gl_FragColor.a = img.a;
  // gl_FragColor = vec4(1., 0., 0., 1.);
}
