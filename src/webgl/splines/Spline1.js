import Spline from './Spline';

class Spline1 extends Spline {

	/**
	* @constructor
	*/
	constructor(target, scene, controlsContainer, zoomParams) {

		super(target, scene, controlsContainer, zoomParams);
	}

	init() {
		this.points = [
			new THREE.Vector3(0, 0, 0),
			new THREE.Vector3(0.5, 0, 3),
			new THREE.Vector3(1.5, 1, 6),
			new THREE.Vector3(2, 1.5, 11),
			new THREE.Vector3(0, 1, 14),
			new THREE.Vector3(-1, 0, 17),
			new THREE.Vector3(-3, 0.5, 11),
			new THREE.Vector3(-1, 1, 8)
		];
		super.init();

		console.log('init spline', this.controlsContainer);

		// this.createGeometry();

		// this.enableSpline();
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

export default Spline1;
