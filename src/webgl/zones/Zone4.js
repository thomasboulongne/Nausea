import Zone from './Zone';

import Spline4 from '../splines/Spline4';

import Store from '../WebGLStore';

import DataEmitter from '../data/DataEmitter';

import NumberUtils from '../utils/number-utils';

import SoundManager from '../../sound/SoundManager';

class Zone4 extends Zone{

	/**
	 * @constructor
	 * param scene : experience scene
	 */
	constructor(orientation, controlsContainer, zoomParams) {
		super(orientation, controlsContainer, zoomParams);

		//properties to count how many objects to clone
		this.nbBenches = 4;
		this.nbStreetLamps = 4;
		this.idZone = 4;
		this.name = 'La Fontaine';
	}

	init() {

		return new Promise( resolve => {
			Promise.all([
				Store.get('fountain', {
					'name' : 'fountain',
					'x' : 17,
					'y' : 0.35,
					'z' : 6.2,
					'scale' : 1,
					'rotate' : true,
					'rotx' : 0,
					'roty' : 0,
					'rotz' : 0,
					'materialize': true
				}),

				Store.get('bench', {
					'name' : 'bench1-z4',
					'x' : 14,
					'y' : 0,
					'z' : 1.8,
					'scale' : 1,
					'rotate' : false,
					'rotx' : 0,
					'roty' : 278,
					'rotz' : 0,
					'materialize': true
				}),

				Store.get('bench', {
					'name' : 'bench2-z4',
					'x' : 13,
					'y' : 0,
					'z' : 4.8,
					'scale' : 1,
					'rotate' : false,
					'rotx' : 0,
					'roty' : 345,
					'rotz' : 0,
					'materialize': true
				}),

				Store.get('bench', {
					'name' : 'bench3-z4',
					'x' : 12,
					'y' : 0,
					'z' : 7.3,
					'scale' : 1,
					'rotate' : false,
					'rotx' : 0,
					'roty' : 44,
					'rotz' : 0,
					'materialize': true
				}),

				Store.get('bench', {
					'name' : 'bench4-z4',
					'x' : 22,
					'y' : 0,
					'z' : 3.5,
					'scale' : 1,
					'rotate' : false,
					'rotx' : 0,
					'roty' : 234,
					'rotz' : 0,
					'materialize': true
				}),

				Store.get('streetLamp', {
					'name' : 'streetLamp1-z4',
					'x' : 17,
					'y' : 0,
					'z' : 10,
					'scale' : 1,
					'rotate' : true,
					'rotx' : 0,
					'roty' : 0,
					'rotz' : 0
				}),

				Store.get('streetLamp', {
					'name' : 'streetLamp2-z4',
					'x' : 13,
					'y' : 0,
					'z' : 3,
					'scale' : 1,
					'rotate' : true,
					'rotx' : 0,
					'roty' : 0,
					'rotz' : 0
				}),

				Store.get('streetLamp', {
					'name' : 'streetLamp3-z4',
					'x' : 12,
					'y' : 0,
					'z' : 6.2,
					'scale' : 1,
					'rotate' : true,
					'rotx' : 0,
					'roty' : 0,
					'rotz' : 0
				}),

				Store.get('streetLamp', {
					'name' : 'streetLamp4-z4',
					'x' : 20.6,
					'y' : 0,
					'z' : 1.8,
					'scale' : 1,
					'rotate' : true,
					'rotx' : 0,
					'roty' : 0,
					'rotz' : 0
				})
			])
			.then( objs => {
				super.init(objs);

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
				resolve();
			});
		});
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
		let fountain = this.objects[0].mesh;
		this.timeline.from(fountain.scale, 10, {'x': 0.8, 'y': 0.8, z:'0.8', ease: Expo.easeOut}, '0');
		this.timeline.from(fountain.rotation, 10, {'y': NumberUtils.toRadians(-205), ease: Expo.easeOut}, '0');

		this.playSound();
	}

	/**
	 * @Spline
	 */
	initSpline() {
		this.spline = new Spline4(this.objects[0].mesh.position, this.scene, this.controlsContainer, this.zoomParams);
		this.spline.init();
	}

	/**
	 * @update
	 */
	update() {
		super.update();
		if(this.spline)
			this.spline.update();
	}

}

export default Zone4;