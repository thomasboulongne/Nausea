uniform sampler2D texture;
uniform vec3 color;
varying vec2 vUv;
uniform float opFactor;
void main()
{
	vec3 tColor = texture2D( texture, vUv ).rgb;
	float a = (length(tColor - color) - 0.5) * 7.0;
	
	gl_FragColor = vec4(tColor, a * opFactor);
}