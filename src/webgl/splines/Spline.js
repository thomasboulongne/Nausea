import SoundManager from '../sound/SoundManager';

class Spline {

	/**
	* @constructor
	*/
	constructor(target, scene, controlsContainer, zoomParams) {

		this.target = target;
		this.zoomParams = zoomParams;
		this.scene = scene;
		this.controlsContainer = controlsContainer;

		this.count = 0;
		this.amount = 0.001;
		this.ratio = 100;

		this.enabledSpline = false;

		console.log('create spline', this.controlsContainer);
	}


	init() {
		this.curve = new THREE.CatmullRomCurve3(this.points);

		//this.createGeometry();
		this.initTimeline();
		this.backSound = SoundManager.load('back.mp3');
		//this.enableSpline();
	}

	initTimeline () {
		this.tweenTime = { time : 0};
		this.timeline = new TimelineMax();
		this.timeline.to(this.tweenTime, 10, {time: 1, onComplete: () => {
			this.reverseTimeline();
		}});
		this.timeline.pause();
	}

	reverseTimeline () {
		this.timeline.to(this.tweenTime, 1.5, {time: 0, ease: Circ.easeInOut});
		SoundManager.play(this.backSound);
		this.timeline.fromTo(this.zoomParams, 1.5, {strength: 0.5}, {strength: 0.0025, ease: Circ.easeInOut, onComplete: () => {
			// this.controlsContainer.children[0].rotation.y = 0;
			// TweenMax.to(this.controlsContainer.children[0].rotation, .6, {y: 0});
			this.disableSpline();
			TweenMax.to(this.controlsContainer.rotation, .6, {y: 0}, 1);
		}}, "-=1.5");
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
		console.log('PLAY TIMELINE');
		console.log('early', this.controlsContainer);
		this.enabledSpline = true;
		this.timeline.play();
	}

	disableSpline() {
		this.scene.remove(this.line);
		this.enabledSpline = false;
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

export default Spline;