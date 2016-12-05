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
			new THREE.Vector3(0, 1, 0),
			new THREE.Vector3(-1, 1, 0),
			new THREE.Vector3(-1, 1, 1),
			new THREE.Vector3(-1, 1, 2),
			new THREE.Vector3(-1, 1, 3),
			new THREE.Vector3(-1, 1, 4),
			new THREE.Vector3(0, 1, 5)
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
