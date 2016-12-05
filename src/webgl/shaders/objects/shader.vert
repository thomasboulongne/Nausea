//attribute vec3 normal;
//attribute vec3 position;
attribute float random;
attribute float delai;

//uniform mat4 projectionMatrix;
//uniform mat4 modelViewMatrix;

uniform float time;

varying vec3 vNormal;
varying vec3 vViewPosition;



void main () {
  vNormal = normal;

  //working
  vec3 offset = position;
  // offset.xyz += normal * random;
  // gl_Position = projectionMatrix * modelViewMatrix * offset;

  //float timeDelayed = clamp(time - delai, 0.0, 1.0);
  float timeDelayed = clamp((1.0 + delai - time), 0.0, 1.0);

  vec3 minOffset = position;
  vec3 maxOffset = minOffset + normal * random;
  vec3 curOffset = mix(minOffset, maxOffset, timeDelayed);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(curOffset, 1.0);
  
}