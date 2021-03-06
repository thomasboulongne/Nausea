import Zone from './Zone';
import Spline3 from '../splines/Spline3';

import DataEmitter from '../data/DataEmitter';

import NumberUtils from '../utils/number-utils';
import SoundManager from '../../sound/SoundManager';

class Zone3 extends Zone {

	/**
	 * @constructor
	 * param scene : experience scene
	 */
	constructor(scene, orientation, controlsContainer, zoomParams) {
		super(scene, orientation, controlsContainer, zoomParams);

		//properties to count how many objects to clone
		this.nbChestnuts = 1;
		this.nbShrubs = 3;
		this.idZone = 3;
		this.name = 'La Statue';
	}

	init(statue, chestnuts, shrubs) {

		this.statue = {
			'name' : 'statue',
			'object' : statue,
			'x' : 6,
			'y' : 0,
			'z' : -2.5,
			'scale' : 1.1,
			'rotate' : true,
			'rotx' : 0,
			'roty' : 91,
			'rotz' : 0
		};

		this.chestnut = {
			'name' : 'chestnut1-z3',
			'object' : chestnuts[0],
			'x' : 14,
			'y' : 0,
			'z' : -7.5,
			'scale' : 0.8,
			'rotate' : true,
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
			'rotate' : true,
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
			'rotate' : true,
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
			'rotate' : true,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		//Splice experience arrays
		chestnuts.splice(0, this.nbChestnuts);
		shrubs.splice(0, this.nbShrubs);

		this.objects.push(this.statue, this.chestnut, this.shrub1, this.shrub2, this.shrub3);

		super.init();

		this.sound = SoundManager.get('05').volume(3);

		this.datas = new DataEmitter(this.controlsContainer, ['statue1', 'statue2', 'statue3'], {
			x: 6,
			y: 2,
			z: -2.5,
			particles: 15,
			side: 2,
			minDistance: 1.3
		});

		this.initSpline();
	}

	setMeshNames () {
		super.setMeshNames();
	}

	addToGUI(gui) {
		super.addToGUI(gui);
	}

	playSound() {
		SoundManager.play('05');
	}

	/**
	 * @addScene
	 */
	addScene() {
		super.addScene();
	}

	initTimeline() {
		super.initTimeline(); 

	}

	playAnim(nb) {
		super.playAnim(nb);
		this.scene.add(this.datas.group);
		let statue = this.statue.object.mesh;
		this.timeline.from(statue.scale, 10, {'x': 0.8, 'y': 0.8, z:'0.8', ease: Expo.easeOut}, '0');
		this.timeline.from(statue.rotation, 10, {'y': NumberUtils.toRadians(-205), ease: Expo.easeOut}, '0');

		TweenMax.delayedCall(2.5, () => {
			this.playSound();
		});
	}

	/**
	 * @Spline
	 */
	initSpline() {
		this.spline = new Spline3(this.statue, this.scene, this.controlsContainer, this.zoomParams);
		this.spline.init();
	}

	/**
	 * @update
	 */
	update() {
		super.update();
		this.spline.update();
	}

}

export default Zone3;