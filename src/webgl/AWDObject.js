import 'three/examples/js/loaders/AWDLoader';

class AWDObject {

	/**
	 * @constructor
	 */
	constructor(name, options) {
		this.name = name;
		this.options = options;
	}

	load() {

		let loader = new THREE.AWDLoader();

		const options = {
			x : this.options.x ? this.options.x : 0,
			y : this.options.y ? this.options.y : 0,
			z : this.options.z ? this.options.z : 0,
			color : this.options.color ? this.options.color : "0xcacaca"
		};

		return new Promise(resolve => {
			loader.load( './assets3d/' + this.name + '.awd', function ( mesh ) {
				this.mesh = mesh;
				this.mesh.name = this.name;
				this.mesh.position.set(options.x, options.y, options.z);
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