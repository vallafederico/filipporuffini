precision mediump float;

uniform float u_time;
// uniform sampler2D u_t1; vec4 img = texture2D(u_t1, v_uv);

varying vec2 v_uv;
varying vec3 worldNormal;

void main() {
	gl_FragColor = vec4(worldNormal, 1.0);
}