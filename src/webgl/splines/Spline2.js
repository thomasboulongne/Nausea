import Spline from './Spline';

class Spline2 extends Spline {

	/**
	* @constructor
	*/
	constructor(target, controlsContainer, zoomParams) {

		super(target, controlsContainer, zoomParams);
		this.zoneSpline = 2;
	}

	init() {
		this.points = [
			new THREE.Vector3(0, 0, 0),
			new THREE.Vector3(-4, 0.5, 0),
			new THREE.Vector3(-10, 1, 0),
			new THREE.Vector3(-14, 1.5, -3),
			new THREE.Vector3(-18, 1.5, -6),
			new THREE.Vector3(-20, 1.5, 0),
		];
		super.init();
	}

}

export default Spline2;
