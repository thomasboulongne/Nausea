import ChromaKeyMaterial from '../materials/ChromaKeyMaterial';

class ChromaKeyPlane {

	/**
	 * @constructor
	 */
	constructor(video, options) {

		if( !options ) options = {};

		let r, g, b;

		if (options.r && options.g && options.b) {
			r = options.r;
			g = options.g;
			b = options.b;
		}
		else {
			r = g = b = 0;
		}

		this.material = new ChromaKeyMaterial("./assets2d/videos/" + video + ".mp4", r, g, b);

		let width = options.width ? options.width : 2;
		let height = options.height ? options.height : 2;
		let plane = new THREE.PlaneGeometry( width, height );
		this.mesh = new THREE.Mesh( plane, this.material );
		this.mesh.name = 'video-' + video;


		this.mesh.position.x = options.x ? options.x : 0;
		this.mesh.position.y = options.y ? options.y : .8;
		this.mesh.position.z = options.z ? options.z : 6;
		// this.mesh.rotation.y = options.rotY ? options.rotY : Math.PI / 2;
	}

	/**
	 * @method
	 * @name update
	 * @description Triggered on every TweenMax tick
	 */
	update() {
		this.material.update();
	}

}

export default ChromaKeyPlane;