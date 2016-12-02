import Zone from './Zone';

import NumberUtils from '../utils/number-utils';

class Zone2 extends Zone {

	/**
	 * @constructor
	 * param [objects] : array of object
	 * param scene : experience scene
	 */
	constructor(scene) {
		super(scene);

		//properties to count how many objects to clone
		this.nbChestnuts = 1;
		this.nbStreetLamps = 4;
		this.nbShrubs = 2;
	}

	init(stand, chestnuts, streetLamps, shrubs) {

		this.stand = {
			'name' : 'stand',
			'object' : stand,
			'x' : -16,
			'y' : -0.2,
			'z' : 0,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 349,
			'rotz' : 0
		};

		this.chestnut = {
			'name' : 'chestnut1-z2',
			'object' : chestnuts[0],
			'x' : -17,
			'y' : 0,
			'z' : 5,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 260,
			'rotz' : 0
		};

		this.streetLamp1 = {
			'name' : 'streetLamp1-z2',
			'object' : streetLamps[0],
			'x' : -9,
			'y' : 0,
			'z' : 0.7,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.streetLamp2 = {
			'name' : 'streetLamp2-z2',
			'object' : streetLamps[1],
			'x' : -12,
			'y' : 0,
			'z' : 3,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.streetLamp3 = {
			'name' : 'streetLamp3-z2',
			'object' : streetLamps[2],
			'x' : -15,
			'y' : 0,
			'z' : 5.7,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.streetLamp4 = {
			'name' : 'streetLamp4-z2',
			'object' : streetLamps[3],
			'x' : -17,
			'y' : 0,
			'z' : 8.5,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.shrub1 = {
			'name' : 'shrub1-z2',
			'object' : shrubs[0],
			'x' : -16,
			'y' : 0,
			'z' : -4.9,
			'scale' : 0.6,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.shrub2 = {
			'name' : 'shrub2-z2',
			'object' : shrubs[1],
			'x' : -15,
			'y' : 0,
			'z' : -6,
			'scale' : 0.7,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};


		//Splice experience arrays
		chestnuts.splice(0, this.nbChestnuts);
		shrubs.splice(0, this.nbShrubs);
		streetLamps.splice(0, this.nbStreetLamps);

		this.objects.push(this.stand, this.chestnut, this.shrub1, this.shrub2, this.streetLamp1, this.streetLamp2, this.streetLamp3, this.streetLamp4);

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
		super.initAnim(); 

	}

	playAnim() {
		super.playAnim();
		let stand = this.stand.object.mesh;
		this.timeline.from(stand.scale, 10, {'x': 0.8, 'y': 0.8, z:'0.8', ease: Expo.easeOut}, '0');
		this.timeline.from(stand.rotation, 10, {'y': NumberUtils.toRadians(-205), ease: Expo.easeOut}, '0');
	}

	/**
	 * @update
	 */
	update() {
		super.update();
	}

}

export default Zone2;