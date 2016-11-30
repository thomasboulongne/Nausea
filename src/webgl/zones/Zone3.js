import Zone from './Zone';

class Zone3 extends Zone {

	/**
	 * @constructor
	 * param [objects] : array of object
	 * param scene : experience scene
	 */
	constructor(scene) {
		super(scene);

		//properties to count how many objects to clone
		this.nbChestnuts = 1;
		this.nbShrubs = 3;
	}

	init(statue, chestnuts, shrubs) {

		this.statue = {
			'name' : 'statue',
			'object' : statue,
			'x' : 11,
			'y' : 0,
			'z' : -1.5,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 32,
			'rotz' : 0
		};

		this.chestnut = {
			'name' : 'chestnut1-z3',
			'object' : chestnuts[0],
			'x' : 13,
			'y' : 0,
			'z' : -1.5,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 139,
			'rotz' : 0
		};

		this.shrub1 = {
			'name' : 'shrub1-z3',
			'object' : shrubs[0],
			'x' : 14,
			'y' : 0,
			'z' : 0.7,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.shrub2 = {
			'name' : 'shrub2-z3',
			'object' : shrubs[1],
			'x' : 15,
			'y' : 0,
			'z' : -3.7,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.shrub3 = {
			'name' : 'shrub3-z3',
			'object' : shrubs[2],
			'x' : 13,
			'y' : 0,
			'z' : -1.5,
			'scale' : 0.5,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		//Splice experience arrays
		chestnuts.splice(0, this.nbChestnuts);
		shrubs.splice(0, this.nbShrubs);

		this.objects.push(this.statue, this.chestnut, this.shrub1, this.shrub2, this.shrub3);

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

	/**
	 * @update
	 */
	update() {

	}

}

export default Zone3;