uniform float u_time;

uniform sampler2D u_diff; 
uniform sampler2D u_bs; 
uniform vec2 u_res; 

varying vec2 v_uv;
varying vec3 v_nor;


const vec3 BG_COLOR = vec3(0.054901960784313725, 0.054901960784313725, 0.054901960784313725);
// const vec3 BG_COLOR = vec3(1., 0., 0.);

varying vec3 worldNormal;
varying vec3 eyeVector;

const float ior = 1.05;
const float a = 0.45;

float Fresnel(vec3 eyeVector, vec3 worldNormal) {
	return pow( 1.0 + dot( eyeVector, worldNormal), 3.0 );
}


void main() {
	vec2 uv = gl_FragCoord.xy / u_res;

  vec3 backfaceNormal = texture2D(u_bs, uv).rgb;
	vec3 normal = worldNormal * (1.0 - a) - backfaceNormal * a;

	vec3 refracted = refract(eyeVector, normal, 1.0/ior);
	uv += refracted.xy;

  vec4 diff = texture2D(u_diff, uv);
  float f = Fresnel(eyeVector, normal);
  diff.rgb = mix(diff.rgb, vec3(.3), f);


  gl_FragColor.rgb = diff.rgb;
  gl_FragColor.a = 1.;
  // gl_FragColor = vec4(1., 0., 0., 1.);
}
