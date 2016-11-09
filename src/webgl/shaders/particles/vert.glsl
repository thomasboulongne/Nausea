attribute float size;
attribute float time;
uniform float globalTime;
uniform float scale;

void main() {

	vec3 pos = position; 

	// time
	float localTime = time + globalTime*0.01;
	float modTime = mod( localTime, 1.0 );
	float accTime = modTime * modTime;

	pos.x += cos(accTime*1.0 + (position.z))*10.0; 
	pos.y += sin(accTime*1.0 + (position.x))*10.0;

	pos.z += sin(accTime*1.0 + (position.y))*10.0; 


	vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );

	float sizem = sin(modTime*10.0 + (pos.z*0.1))+0.5;

	gl_PointSize = max(0.5, (size*sizem)) * ( scale / length( mvPosition.xyz ) );

	gl_Position = projectionMatrix * mvPosition;

}