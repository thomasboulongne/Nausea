import vertexShader from '../shaders/ChromaKeyMaterial/vert.glsl';
import fragmentShader from '../shaders/ChromaKeyMaterial/frag.glsl';

class ChromaKeyMaterial extends THREE.ShaderMaterial {

	constructor(url, r, g, b, opFactor, options) {
		super();

		if(!options) options = {};

		this.opFactor = opFactor ? opFactor : 1;

		this.url = url;
		this.colorKey = new THREE.Color(r, g, b);

		this.video      = document.createElement('video');
		this.video.src      = this.url;
		this.video.autoplay = options.autoplay ? options.autoplay : true;
		this.video.loop = options.loop ? options.loop : true;
		this.video.load();

		let texture = new THREE.VideoTexture( this.video );
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

	play() {
		this.video.play();
	}

}

export default ChromaKeyMaterial;