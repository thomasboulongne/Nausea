import Spline from './Spline';

class Spline1 extends Spline {

	/**
	* @constructor
	*/
	constructor(scene, camera, controls) {

		super(scene, camera, controls);
	}

	init() {
		this.points = [
			new THREE.Vector3(0, 0, 0),
			new THREE.Vector3(0.5, 1, 3),
			new THREE.Vector3(1.5, 2, 6),
			new THREE.Vector3(2, 2.5, 10),
			new THREE.Vector3(0, 2, 13),
			new THREE.Vector3(-1, 1, 16),
			new THREE.Vector3(-3, 1.5, 10),
			new THREE.Vector3(-1, 2, 8)
		];
		super.init();

		this.createGeometry();
	}

	createGeometry() {
		super.createGeometry();
	}

	enableSpline() {
		super.enableSpline();
	}

	disableSpline() {
		super.disableSpline();
	}

	/**
	 * @method
	 * @name update
	 * @description Triggered on every TweenMax tick
	 */
	update() {
		super.update();
	}

}

export default Spline1
