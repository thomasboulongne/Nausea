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

		let width = options.width ? options.width : 1;
		let height = options.height ? options.height : 3.5;
		let plane = new THREE.PlaneGeometry( width, height );
		this.mesh = new THREE.Mesh( plane, this.material );

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