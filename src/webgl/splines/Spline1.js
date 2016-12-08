import Spline from './Spline';

class Spline1 extends Spline {

	/**
	* @constructor
	*/
	constructor(target, scene, controlsContainer, zoomParams) {

		super(target, scene, controlsContainer, zoomParams);
		this.zoneSpline = 1;
	}

	init() {
		this.points = [
			new THREE.Vector3(0, 0, 0),
			new THREE.Vector3(0.5, 1, 3),
			new THREE.Vector3(1.5, 2, 6),
			new THREE.Vector3(2, 2.5, 11),
			new THREE.Vector3(0, 2, 14),
			new THREE.Vector3(-1, 1, 17),
			new THREE.Vector3(-3, 1.5, 11),
			new THREE.Vector3(-1, 2, 8)
		];
		super.init();

		console.log('init spline', this.controlsContainer);
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
