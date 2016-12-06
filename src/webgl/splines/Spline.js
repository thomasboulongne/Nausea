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
		//this.scene.controls.enabled = false;
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
			//let camRot = this.curve.getTangent(this.count);

			// this.camera.position.z = camPos.z;
			// this.camera.position.x = camPos.x;
			// this.camera.position.y = camPos.y + 1;
			//console.log(camPos.z - this.scene.controls.getObject().position.z);

			this.controls.getObject().position.z = camPos.z;
			this.controls.getObject().position.x = camPos.x;
			this.controls.getObject().position.y = camPos.y + 1;

			this.controls.getObject().translateZ(camPos.z - prevCamPos.z);
			this.controls.getObject().translateX(camPos.x - prevCamPos.x);
			this.controls.getObject().translateY(camPos.y - prevCamPos.y);


			//console.log(this.scene.controls.getObject())

			//console.log(this.scene.controls.getObject().translateX(camPos.x));

			// this.camera.rotation.x = camRot.x;
			// this.camera.rotation.y = camRot.y;
			// this.camera.rotation.z = camRot.z;

			//this.camera.lookAt(this.curve.getPoint(this.count + 1000));

			if (this.count >= (1 - this.amount * this.ratio)) {
				this.count = 0;
				this.camera.position.z = 0;
				this.disableSpline()
			}
		}

	}

}

export default Spline
