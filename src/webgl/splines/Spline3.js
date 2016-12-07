import Spline from './Spline';

class Spline3 extends Spline {

	/**
	* @constructor
	*/
	constructor(target, scene, camera, controlsContainer, zoomParams) {

		super(target, scene, camera, controlsContainer, zoomParams);
	}

	init() {
		this.points = [
			new THREE.Vector3(0, 0, 0),
			new THREE.Vector3(4, 0.5, 0),
			new THREE.Vector3(8, 0.75, 0),
			new THREE.Vector3(12, 0.65, -1),
			new THREE.Vector3(10, 0.75, -4),
			new THREE.Vector3(8, 1.1, -5)
		];
		super.init();

		//this.createGeometry();

		this.enableSpline();
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

export default Spline3;
