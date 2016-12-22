import Spline from './Spline';

class Spline4 extends Spline {

	/**
	* @constructor
	*/
	constructor(target, controlsContainer, zoomParams) {

		super(target, controlsContainer, zoomParams);
		this.zoneSpline = 4;
	}

	init() {
		this.points = [
			new THREE.Vector3(0, 0, 0),
			new THREE.Vector3(5, 0.5, 2),
			new THREE.Vector3(10, 0.75, 5),
			new THREE.Vector3(12, 0.65, 7),
			new THREE.Vector3(14, 0.75, 9),
			new THREE.Vector3(20, 1.8, 12),
			new THREE.Vector3(21, 1.3, 11)
		];
		super.init();
	}

}

export default Spline4;
