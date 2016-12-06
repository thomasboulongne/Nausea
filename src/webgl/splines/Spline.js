class Spline {

	/**
	* @constructor
	*/
	constructor(target, scene, camera, controlsContainer) {

		this.target = target;
		this.scene = scene;
		this.camera = camera;
		this.controlsContainer = controlsContainer;

		this.count = 0;
		this.amount = 0.001;
		this.ratio = 100;
	}


	init() {
		this.curve = new THREE.CatmullRomCurve3(this.points);

		//this.createGeometry();
		this.enableSpline();
	}

	initTimeline () {
		this.tweenTime = { time : 0};
		this.timeline = new TimelineMax();
		this.timeline.to(this.tweenTime, 10, {time: 1, onComplete: () => {
			this.reverseTimeline();
		}});
		this.timeline.play();
	}

	reverseTimeline () {
		//this.timeline.to(this.tweenTime, 1.5, {time: 0, ease: Circ.easeOut});
		TweenMax.to(this.controlsContainer.position, 1.5, {x: 0, y: 1, z: 0, ease: Circ.easeOut, onComplete: () => {
			console.log(this.controlsContainer);
		}});
		// console.log('gogo reverse')
		// this.timeline.to(this.controlsContainer.position, 3, {'x': 0, 'y': 1, z:'0', ease: Circ.easeOut});
	}


	createGeometry() {
		this.geometry = new THREE.Geometry();
		this.geometry.vertices = this.curve.getPoints(50);
		this.material = new THREE.LineBasicMaterial({
			color: 0xFF0000
		});
		
		this.line = new THREE.Line(this.geometry, this.material);

		this.scene.add(this.line);
	}

	enableSpline() {
		this.initTimeline();
		this.enabledSpline = true;

		console.log(this.scene);
	}

	disableSpline() {
		this.scene.remove(this.line);
		this.enabledSpline = false;
		this.scene.controls.enabled = true;
	}

	/**
	 * @method
	 * @name update
	 * @description Triggered on every TweenMax tick
	 */
	update() {
		if(this.enabledSpline) {

			let prevCamPos = this.curve.getPoint(this.tweenTime.time);

			let camPos = this.curve.getPoint(this.tweenTime.time);

			let vector = {};
			vector.x = this.target.x - camPos.x;
			vector.z = this.target.z - camPos.z;

			let angle = Math.atan2(vector.x, vector.z);

			this.controlsContainer.position.z = camPos.z;
			this.controlsContainer.position.x = camPos.x;
			this.controlsContainer.position.y = camPos.y + 1;

			this.controlsContainer.translateZ(camPos.z - prevCamPos.z);
			this.controlsContainer.translateX(camPos.x - prevCamPos.x);
			this.controlsContainer.translateY(camPos.y - prevCamPos.y);

			this.controlsContainer.rotation.y = angle;
		}

		//console.log(this.controlsContainer.position);

	}

}

export default Spline
