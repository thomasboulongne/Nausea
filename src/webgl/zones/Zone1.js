import Zone from './Zone';
import Spline1 from '../splines/Spline1';

import DataEmitter from '../data/DataEmitter';

//import NumberUtils from '../utils/number-utils';
import SoundManager from '../../sound/SoundManager';

class Zone1 extends Zone {

	/**
	 * param scene : experience scene
	 */
	constructor(scene, orientation, controlsContainer, zoomParams) {
		super(scene, orientation, controlsContainer, zoomParams);
		//properties to count how many objects to clone
		this.nbChestnuts = 1;
		this.nbBenches = 1;
		this.nbMinerals = 3;
		this.idZone = 1;
		this.name = 'Le Maronnier';
	}

	init(chestnuts, benches, minerals) {
		
		this.chestnut = {
			'name' : 'chestnut1-z1',
			'object' : chestnuts[0],
			'x' : 0,
			'y' : 0,
			'z' : 12,
			'scale' : 1,
			'rotate' : true,
			'rotx' : 0,
			'roty' : 139,
			'rotz' : 0
		};

		this.bench = {
			'name' : 'bench',
			'object' : benches[0],
			'x' : -3,
			'y' : 0.15,
			'z' : 10.9,
			'scale' : 1,
			'rotate' : false,
			'rotx' : 0,
			'roty' : 130,
			'rotz' : 0
		};

		this.mineral1 = {
			'name' : 'mineral1',
			'object' : minerals[0],
			'x' : 2.5,
			'y' : 0,
			'z' : 8,
			'scale' : 1.4,
			'rotate' : true,
			'rotx' : 0,
			'roty' : 238,
			'rotz' : 0
		};

		this.mineral2 = {
			'name' : 'mineral2',
			'object' : minerals[1],
			'x' : 2,
			'y' : 0,
			'z' : 9.6,
			'scale' : 0.5,
			'rotate' : true,
			'rotx' : 322,
			'roty' : 75,
			'rotz' : 258
		};

		this.mineral3 = {
			'name' : 'mineral3',
			'object' : minerals[2],
			'x' : 1.6,
			'y' : 0,
			'z' : 6.2,
			'scale' : 0.5,
			'rotate' : true,
			'rotx' : 0,
			'roty' : 175,
			'rotz' : 0
		};

		//Splice experience arrays
		chestnuts.splice(0, this.nbChestnuts);
		benches.splice(0, this.nbBenches);
		minerals.splice(0, this.nbMinerals);

		this.objects.push(this.chestnut, this.bench, this.mineral1, this.mineral2, this.mineral3);

		super.init();

		SoundManager.get('03').volume(3);

		this.datas = new DataEmitter(this.controlsContainer, ['chest1', 'chest2', 'chest3'], {
			x: 0,
			y: 4,
			z: 12,
			particles: 20,
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
		// let chestnutMesh = this.chestnut.object.mesh;
		// let benchMesh = this.bench.object.mesh;

		//this.timeline.to(chestnutMesh.scale, 10, {x: 1.2, y: 1.2, z:1.2, ease: Circ.easeInOut}, '0');

		// this.timeline.to(chestnutMesh.rotation, 12, {'y': NumberUtils.toRadians(this.chestnut.roty), ease: Circ.easeInOut}, '0');
		// this.timeline.to(benchMesh.rotation, 12, {'y': NumberUtils.toRadians(this.bench.roty), ease: Circ.easeInOut}, '0');

		this.playSound();
	}

	playSound() {
		SoundManager.play('03');
	}


	/**
	 * @Spline
	 */
	initSpline() {
		this.spline = new Spline1(this.chestnut, this.scene, this.controlsContainer, this.zoomParams);
		this.spline.init();
	}

	/**
	 * @update
	 */
	update() {
		//permanant rotation
		super.update();
		this.spline.update();
	}

}

export default Zone1;