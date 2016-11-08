import 'three/examples/js/loaders/AWDLoader';

class AWDObject {

	/**
	 * @constructor
	 */
	constructor() {
	}

	load(filename, opt) {

		let loader = new THREE.AWDLoader();

		const options = {
			x : opt.x ? opt.x : 0,
			y : opt.y ? opt.y : 0,
			z : opt.z ? opt.z : 0,
			color : opt.color ? opt.color : "0xcacaca"
		};

		return new Promise(resolve => {
			loader.load( './assets3d/' + filename + '.awd', function ( mesh ) {
				this.mesh = mesh;

				this.mesh.position.set(options.x, options.y, options.z)
				this.mesh.children[0].material.color = new THREE.Color( options.color );

				resolve('success');
			}.bind(this) );
		});
	}

	/**
	 * @method
	 * @name update
	 * @description Triggered on every TweenMax tick
	 */
	update() {

	}

}

export default AWDObject;