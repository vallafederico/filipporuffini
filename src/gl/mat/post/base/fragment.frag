uniform float opacity;
uniform sampler2D tDiffuse;
uniform sampler2D u_tx;
varying vec2 vUv;

void main() {
    vec4 tx = texture2D( u_tx, vUv );
    
    
    vec4 screen = texture2D( tDiffuse, vUv - .05 * vec2(tx.rg) );

    gl_FragColor.rgb = screen.rgb;
    gl_FragColor.a = screen.a;

    // gl_FragColor.rgb = vec3(tx.r, 0., 0.);
    // gl_FragColor.a = 1.;
}