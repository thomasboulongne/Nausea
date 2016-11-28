class Spline {

	/**
	* @constructor
	*/
	constructor(scene) {

		this.scene = scene;
		console.log(this.scene)
		this.camera = this.scene.camera;

		console.log('yolo spline')

		this.curve = new THREE.CatmullRomCurve3([
			new THREE.Vector3(0, 2, 0),
			new THREE.Vector3(3, 2, 0),
			new THREE.Vector3(5, 2, 0),
			new THREE.Vector3(5, 2, 3),
			new THREE.Vector3(5, 2, 5),
			new THREE.Vector3(0, 2, 5),
			new THREE.Vector3(0, 2, -2)
		]);

		this.geometry = new THREE.Geometry();
		this.geometry.vertices = this.curve.getPoints(50);
		this.material = new THREE.LineBasicMaterial({
			color: 0xFF0000
		});
		
		this.line = new THREE.Line(this.geometry, this.material); 

		this.count = 0;
		this.amount = 0.001;
		this.ratio = 100;
	}

	enableSpline() {
		//this.scene.controls.enabled = false;
		console.log(this.camera);
		let init = this.curve.getPoint(0);
		// this.camera.position.set(init.x, init.y, init.z);
		// this.camera.lookAt(this.curve.getPoint(init));
		this.scene.add(this.line);
		console.log(init)
		console.info(this.camera.position)
		this.enabledSpline = true;
		console.log(this.curve);


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

			this.scene.controls.getObject().position.z = camPos.z;
			this.scene.controls.getObject().position.x = camPos.x;
			this.scene.controls.getObject().position.y = camPos.y + 1;

			this.scene.controls.getObject().translateZ(camPos.z - prevCamPos.z);
			this.scene.controls.getObject().translateX(camPos.x - prevCamPos.x);
			this.scene.controls.getObject().translateY(camPos.y - prevCamPos.y);


			console.log(this.scene.controls.getObject())

			//console.log(this.scene.controls.getObject().translateX(camPos.x));

			// this.camera.rotation.x = camRot.x;
			// this.camera.rotation.y = camRot.y;
			// this.camera.rotation.z = camRot.z;

			//this.camera.lookAt(this.curve.getPoint(this.count));

			if (this.count >= (1 - this.amount * this.ratio)) {
				this.count = 0;
				this.camera.position.z = 0;
				this.disableSpline()
			}
		}

	}

}

export default Spline
