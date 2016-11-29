import { toRadians } from '../utils/number-utils';

class HomeTitle {

	/**
	 * @constructor
	 */
	constructor() {
		// let video = document.getElementById( 'video' );
		// let texture = new THREE.VideoTexture( video );
		// let parameters = { color: 0xffffff, map: texture };
		let parameters = { color: 0xffffff, side: THREE.DoubleSide };

		let material = new THREE.MeshLambertMaterial( parameters );

		let plane = new THREE.PlaneGeometry( 3, 1, 4, 4 );
		this.mesh = new THREE.Mesh( plane, material );

		this.mesh.rotation.y = toRadians(90);
		this.mesh.position.y = 2;
	}


	/**
	 * @method
	 * @name update
	 * @description Triggered on every TweenMax tick
	 */
	update() {


	}

}

export default HomeTitle;