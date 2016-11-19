import 'three/examples/js/loaders/AWDLoader';
import NumberUtils from './utils/number-utils';
import LoadingManager from './utils/LoadingManager';

class AWDObject {

	/**
	 * @constructor
	 */
	constructor(name, options) {
		this.name = name;
		this.options = options;
	}

	load() {

		let loader = new THREE.AWDLoader( LoadingManager );

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
				for (let i = 0; i < this.mesh.children.length; i++) {
					this.mesh.children[i].name = this.name;
				}
				this.mesh.position.set(options.x, options.y, options.z);
				this.mesh.children[0].material.color = new THREE.Color( options.color );
				this.mesh.children[0].material.transparent = true;

				resolve('success');
			}.bind(this) );
		});
	}

	addToGUI(gui, name) {
		let folder = gui.addFolder(name);

		folder.add(this.mesh.position, 'x', -50, 50).name('posx');
		folder.add(this.mesh.position, 'y', -10, 10).name('posy');
		folder.add(this.mesh.position, 'z', -50, 50).name('posz');

		let params = {
			degx : 0,
			degy : 0,
			degz : 0
		};

		folder.add(params, 'degx', 0, 360).name('rotationx').onChange((degValue) => {
			let angle = NumberUtils.toRadians(degValue);
			this.mesh.rotation.x = angle;
		});
		folder.add(params, 'degy', 0, 360).name('rotationy').onChange((degValue) => {
			let angle = NumberUtils.toRadians(degValue);
			this.mesh.rotation.y = angle;
		});
		folder.add(params, 'degz', 0, 360).name('rotationz').onChange((degValue) => {
			let angle = NumberUtils.toRadians(degValue);
			this.mesh.rotation.z = angle;
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