import Zone from './Zone';

class Zone0 extends Zone {

	/**
	 * @constructor
	 * param scene : experience scene
	 */
	constructor(scene) {
		super(scene);
	}

	init(sartreBench) {

		this.bench = {
			'name' : 'sartre-bench',
			'object' : sartreBench,
			'x' : 0,
			'y' : 0,
			'z' : 0.2,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 270,
			'rotz' : 0
		};

		this.objects.push(this.bench);

		super.init();
	}

	setMeshNames () {
		super.setMeshNames();
	}

	addToGUI(gui) {
		super.addToGUI(gui);
	}

	/**
	 * @addScene
	 */
	addScene() {
		super.addScene();
	}

	initAnim() {
		// super.initAnim(); 

	}

	playAnim() {
		super.playAnim();
	}

	/**
	 * @update
	 */
	update() {
		//permanant rotation
	}

}

export default Zone0;