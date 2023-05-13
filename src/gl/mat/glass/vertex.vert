#define MPI 3.1415926535897932384626433832795


uniform float u_time;
varying vec2 v_uv;
varying vec3 v_nor;

varying vec3 eyeVector;
varying vec3 worldNormal;



void main() {
  vec3 pos = position;

  vec4 worldPos = modelMatrix * vec4( position, 1.0);
	eyeVector = normalize(worldPos.xyz - cameraPosition);
	worldNormal = normalize( modelViewMatrix * vec4(normal, 0.0)).xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  v_uv = uv;
  v_nor = normal;
}
