import vertexShader from '../shaders/ChromaKeyMaterial/vert.glsl';
import fragmentShader from '../shaders/ChromaKeyMaterial/frag.glsl';

class ChromaKeyMaterial extends THREE.ShaderMaterial {

	constructor(url, r, g, b, opFactor) {
		super();

		this.opFactor = opFactor ? opFactor : 1;

		this.url = url;
		this.colorKey = new THREE.Color(r, g, b);

		let video      = document.createElement('video');
		video.src      = this.url;
		video.autoplay = true;
		video.loop = true;
		video.load();

		let texture = new THREE.VideoTexture( video );
		texture.minFilter = THREE.LinearFilter;
		texture.format = THREE.RGBFormat;

		texture.needsUpdate = true;

		this.vertexShader   = vertexShader;
		this.fragmentShader = fragmentShader;
		this.uniforms       = {
			texture: {
				type: "t",
				value: texture
			},
			color: {
				type: "c",
				value: this.colorKey
			},
			opFactor: {
				type: "f",
				value: this.opFactor
			}
		};

		this.transparent = true;

		this.needsUpdate = true;

		this.side = THREE.DoubleSide;

	}

}

export default ChromaKeyMaterial;