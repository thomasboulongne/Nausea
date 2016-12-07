import { toRadians } from '../utils/number-utils';
import ChromaKeyMaterial from '../materials/ChromaKeyMaterial';

class HomeTitle {

	/**
	 * @constructor
	 */
	constructor() {

		this.material = new ChromaKeyMaterial("./assets2d/videos/logo02.mp4", 0, 0, 0);

		let plane = new THREE.PlaneGeometry( 4, 1, 4, 4 );
		this.mesh = new THREE.Mesh( plane, this.material );

		this.mesh.rotation.y = toRadians(-90);
		this.mesh.position.y = 2;
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

export default HomeTitle;