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
				for (let i = 0; i < this.mesh.children.length; i++) {
					this.mesh.children[i].name = this.name;
				}
				this.mesh.position.set(options.x, options.y, options.z);
				this.mesh.children[0].material.color = new THREE.Color( options.color );

				this.boundingBox = new THREE.Box3().setFromObject(this.mesh);
				this.boundingSize = this.boundingBox.getSize();

				let hitboxGeometry = new THREE.BoxGeometry(this.boundingSize.x,this.boundingSize.y,this.boundingSize.z);

				let hitboxMaterial = new THREE.MeshBasicMaterial( {transparent: true, opacity: 0} );

				this.hitbox = new THREE.Mesh( hitboxGeometry, hitboxMaterial );

				this.hitbox.position.set(options.x, options.y + this.boundingSize.y / 2, options.z);

				this.hitbox.name = this.name + '_hb';

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