precision mediump float;

uniform float u_time;
uniform sampler2D u_t1; 
uniform vec2 u_ratio;

varying vec2 v_uv;


void main() {

  vec2 uv = v_uv;
  uv -= vec2(0.5);
  uv *= u_ratio.yx * .8;
  uv += vec2(0.5);
  
  vec4 img = texture2D(u_t1, uv);
  

  gl_FragColor = vec4(img.rgb, 1.);
  // gl_FragColor = vec4(1., 0., 0., 1.);
}
