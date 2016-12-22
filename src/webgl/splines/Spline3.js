import Spline from './Spline';

class Spline3 extends Spline {

	/**
	* @constructor
	*/
	constructor(target, controlsContainer, zoomParams) {

		super(target, controlsContainer, zoomParams);
		this.zoneSpline = 3;
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
	}

}

export default Spline3;
