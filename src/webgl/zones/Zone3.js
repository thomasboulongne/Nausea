import Zone from './Zone';

import NumberUtils from '../utils/number-utils';

class Zone3 extends Zone {

	/**
	 * @constructor
	 * param scene : experience scene
	 */
	constructor(scene, orientation) {
		super(scene, orientation);

		//properties to count how many objects to clone
		this.nbChestnuts = 1;
		this.nbShrubs = 3;
	}

	init(statue, chestnuts, shrubs) {

		this.statue = {
			'name' : 'statue',
			'object' : statue,
			'x' : 6,
			'y' : 0,
			'z' : -2.5,
			'scale' : 1.1,
			'rotx' : 0,
			'roty' : 71,
			'rotz' : 0
		};

		this.chestnut = {
			'name' : 'chestnut1-z3',
			'object' : chestnuts[0],
			'x' : 14,
			'y' : 0,
			'z' : -7.5,
			'scale' : 0.8,
			'rotx' : 0,
			'roty' : 175,
			'rotz' : 0
		};

		this.shrub1 = {
			'name' : 'shrub1-z3',
			'object' : shrubs[0],
			'x' : 10,
			'y' : 0,
			'z' : -1.47,
			'scale' : 0.9,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.shrub2 = {
			'name' : 'shrub2-z3',
			'object' : shrubs[1],
			'x' : 13,
			'y' : 0,
			'z' : -4,
			'scale' : 1.2,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.shrub3 = {
			'name' : 'shrub3-z3',
			'object' : shrubs[2],
			'x' : 14,
			'y' : 0,
			'z' : -3,
			'scale' : 0.71,
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

	initAnim() {
		super.initAnim(); 

	}

	playAnim() {
		super.playAnim();
		let statue = this.statue.object.mesh;
		this.timeline.from(statue.scale, 10, {'x': 0.8, 'y': 0.8, z:'0.8', ease: Expo.easeOut}, '0');
		this.timeline.from(statue.rotation, 10, {'y': NumberUtils.toRadians(-205), ease: Expo.easeOut}, '0');
	}

	/**
	 * @update
	 */
	update() {
		super.update();
	}

}

export default Zone3;