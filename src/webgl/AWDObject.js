import 'three/examples/js/loaders/AWDLoader';

class AWDObject {

	/**
	 * @constructor
	 */
	constructor() {
	}

	load(filename, options) {

		let loader = new THREE.AWDLoader();

		return new Promise(resolve => {
			loader.load( './assets3d/' + filename + '.awd', function ( mesh ) {
				this.mesh = mesh;

				for( let key in options) {
					this.mesh[key] = options[key];
				}

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