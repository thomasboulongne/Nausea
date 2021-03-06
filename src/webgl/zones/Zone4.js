import Zone from './Zone';
import Spline4 from '../splines/Spline4';

import DataEmitter from '../data/DataEmitter';

import NumberUtils from '../utils/number-utils';
import SoundManager from '../../sound/SoundManager';

class Zone4 extends Zone{

	/**
	 * @constructor
	 * param scene : experience scene
	 */
	constructor(scene, orientation, controlsContainer, zoomParams) {
		super(scene, orientation, controlsContainer, zoomParams);

		//properties to count how many objects to clone
		this.nbBenches = 4;
		this.nbStreetLamps = 4;
		this.idZone = 4;
		this.name = 'La Fontaine';
	}

	init(fountain, benches, streetLamps) {

		this.fountain = {
			'name' : 'fountain',
			'object' : fountain,
			'x' : 17,
			'y' : 0.35,
			'z' : 6.2,
			'scale' : 1,
			'rotate' : true,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.bench1 = {
			'name' : 'bench1-z4',
			'object' : benches[0],
			'x' : 14,
			'y' : 0,
			'z' : 1.8,
			'scale' : 1,
			'rotate' : false,
			'rotx' : 0,
			'roty' : 278,
			'rotz' : 0
		};

		this.bench2 = {
			'name' : 'bench2-z4',
			'object' : benches[1],
			'x' : 13,
			'y' : 0,
			'z' : 4.8,
			'scale' : 1,
			'rotate' : false,
			'rotx' : 0,
			'roty' : 345,
			'rotz' : 0
		};

		this.bench3 = {
			'name' : 'bench3-z4',
			'object' : benches[2],
			'x' : 12,
			'y' : 0,
			'z' : 7.3,
			'scale' : 1,
			'rotate' : false,
			'rotx' : 0,
			'roty' : 44,
			'rotz' : 0
		};

		this.bench4 = {
			'name' : 'bench4-z4',
			'object' : benches[3],
			'x' : 22,
			'y' : 0,
			'z' : 3.5,
			'scale' : 1,
			'rotate' : false,
			'rotx' : 0,
			'roty' : 234,
			'rotz' : 0
		};

		this.streetLamp1 = {
			'name' : 'streetLamp1-z4',
			'object' : streetLamps[0],
			'x' : 17,
			'y' : 0,
			'z' : 10,
			'scale' : 1,
			'rotate' : true,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.streetLamp2 = {
			'name' : 'streetLamp2-z4',
			'object' : streetLamps[1],
			'x' : 13,
			'y' : 0,
			'z' : 3,
			'scale' : 1,
			'rotate' : true,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.streetLamp3 = {
			'name' : 'streetLamp3-z4',
			'object' : streetLamps[2],
			'x' : 12,
			'y' : 0,
			'z' : 6.2,
			'scale' : 1,
			'rotate' : true,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.streetLamp4 = {
			'name' : 'streetLamp4-z4',
			'object' : streetLamps[3],
			'x' : 20.6,
			'y' : 0,
			'z' : 1.8,
			'scale' : 1,
			'rotate' : true,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		//Splice experience arrays
		benches.splice(0,this.nbBenches);
		streetLamps.splice(0, this.nbStreetLamps);

		this.objects.push(this.fountain, this.bench1, this.bench2, this.bench3, this.bench4, this.streetLamp1, this.streetLamp2, this.streetLamp3, this.streetLamp4);

		super.init();

		this.sound = SoundManager.get('07').volume(3);

		this.datas = new DataEmitter(this.controlsContainer, ['fountain1', 'fountain2'], {
			x: 17,
			y: 2,
			z: 6,
			particles: 30,
			side: 3.5,
			minDistance: 1.15
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
		SoundManager.play('07');
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
		let fountain = this.fountain.object.mesh;
		this.timeline.from(fountain.scale, 10, {'x': 0.8, 'y': 0.8, z:'0.8', ease: Expo.easeOut}, '0');
		this.timeline.from(fountain.rotation, 10, {'y': NumberUtils.toRadians(-205), ease: Expo.easeOut}, '0');

		this.playSound();
	}

	/**
	 * @Spline
	 */
	initSpline() {
		this.spline = new Spline4(this.fountain, this.scene, this.controlsContainer, this.zoomParams);
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

export default Zone4;