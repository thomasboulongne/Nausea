class Spline {

	/**
	* @constructor
	*/
	constructor(scene, camera, controls) {

		this.scene = scene;
		this.camera = camera;
		this.controls = controls;

		this.count = 0;
		this.amount = 0.001;
		this.ratio = 100;
	}


	init() {
		this.curve = new THREE.CatmullRomCurve3(this.points);

		this.createGeometry();
		this.enableSpline();
	}

	createGeometry() {
		this.geometry = new THREE.Geometry();
		this.geometry.vertices = this.curve.getPoints(50);
		this.material = new THREE.LineBasicMaterial({
			color: 0xFF0000
		});
		
		this.line = new THREE.Line(this.geometry, this.material); 

		console.log(this.line);

		this.scene.add(this.line);
	}

	enableSpline() {
		//let init = this.curve.getPoint(0);
		// this.camera.position.set(init.x, init.y, init.z);
		// this.camera.lookAt(this.curve.getPoint(init));
		
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

			let prevCamPos = this.curve.getPoint(this.count);

			this.count += this.amount;

			let camPos = this.curve.getPoint(this.count);
			// let camNextPos = this.curve.getPoint(this.count + 10);

			// let camRot = this.curve.getTangent(this.count + 100);

			// let vector = {};
			// vector.x = camNextPos.x - camPos.x;
			// vector.z = camNextPos.z - camPos.z;

			// let angle = Math.atan2(camRot.x, camRot.z);

			// //console.log(angle);
			// console.log(this.controls);

			// this.controls.orientation = angle;

			let yawObject = this.controls.getObject();
			//let pitchObject = this.controls.getPitch();

			yawObject.position.z = camPos.z;
			yawObject.position.x = camPos.x;
			yawObject.position.y = camPos.y + 1;

			yawObject.translateZ(camPos.z - prevCamPos.z);
			yawObject.translateX(camPos.x - prevCamPos.x);
			yawObject.translateY(camPos.y - prevCamPos.y);

			// pitchObject.rotation.y = camRot.y;
			// yawObject.rotation.y = camRot.y;
			//this.controls.orientation = 3.6;

			//console.log(camPos);

			// this.camera.rotation.x = camRot.x;
			// this.camera.rotation.y = camRot.y;
			// this.camera.rotation.z = camRot.z;

			//this.camera.lookAt(this.curve.getPoint(this.count / 1000));

			if (this.count >= (1 - this.amount * this.ratio)) {
				this.count = 0;
				this.camera.position.z = 0;
				this.disableSpline()
			}
		}

	}

}

export default Spline
