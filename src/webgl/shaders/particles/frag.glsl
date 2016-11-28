uniform vec3 color;
uniform sampler2D texture;

void main() {

	vec4 outColor = texture2D( texture, gl_PointCoord );

	gl_FragColor = outColor;

}