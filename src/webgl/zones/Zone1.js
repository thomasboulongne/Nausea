import Zone from './Zone';
import Spline1 from '../splines/Spline1';

import DataEmitter from '../data/DataEmitter';

import SoundManager from '../../sound/SoundManager';

import Store from '../WebGLStore';

class Zone1 extends Zone {

	/**
	 * param scene : experience scene
	 */
	constructor(scene, orientation, controlsContainer, zoomParams) {
		super(scene, orientation, controlsContainer, zoomParams);

		this.idZone = 1;
		this.name = 'Le Maronnier';
	}

	init() {

		return new Promise( resolve => {
			Promise.all([
				Store.get('chestnut',{
					'name' : 'chestnut1-z1',
					'x' : 0,
					'y' : 0,
					'z' : 12,
					'scale' : 1,
					'rotate' : true,
					'rotx' : 0,
					'roty' : 139,
					'rotz' : 0,
					'materialize': true
				}),
				Store.get('bench',{
					'name' : 'bench-z1',
					'x' : -3,
					'y' : 0.15,
					'z' : 10.9,
					'scale' : 1,
					'rotate' : false,
					'rotx' : 0,
					'roty' : 130,
					'rotz' : 0
				}),
				Store.get('mineral', {
					'name' : 'mineral1',
					'x' : 2.5,
					'y' : 0,
					'z' : 8,
					'scale' : 1.4,
					'rotate' : true,
					'rotx' : 0,
					'roty' : 238,
					'rotz' : 0
				}),
				Store.get('mineral', {
					'name' : 'mineral2',
					'x' : 2,
					'y' : 0,
					'z' : 9.6,
					'scale' : 0.5,
					'rotate' : true,
					'rotx' : 322,
					'roty' : 75,
					'rotz' : 258
				}),

				Store.get('mineral', {
					'name' : 'mineral3',
					'x' : 1.6,
					'y' : 0,
					'z' : 6.2,
					'scale' : 0.5,
					'rotate' : true,
					'rotx' : 0,
					'roty' : 175,
					'rotz' : 0
				})
			])
			.then( objs => {

				SoundManager.get('03').volume(3);

				this.datas = new DataEmitter(this.controlsContainer, ['chest1', 'chest2', 'chest3'], {
					x: 0,
					y: 4,
					z: 12,
					particles: 20,
					side: 3.5,
					minDistance: 1.15
				});

				super.init(objs);
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
		this.spline = new Spline1(this.objects[0].mesh.position, this.scene, this.controlsContainer, this.zoomParams);
		this.spline.init();
	}

	/**
	 * @update
	 */
	update() {
		//permanant rotation
		super.update();
		if(this.spline)
			this.spline.update();
	}

}

export default Zone1;