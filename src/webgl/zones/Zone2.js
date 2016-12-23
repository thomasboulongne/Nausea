import Zone from './Zone';

import Spline from '../splines/Spline';

import Store from '../WebGLStore';

import DataEmitter from '../data/DataEmitter';

import NumberUtils from '../utils/number-utils';

import SoundManager from '../../sound/SoundManager';

class Zone2 extends Zone {

	init() {

		return new Promise( resolve => {
			Promise.all([
				Store.get('stand', {
					'name' : 'stand',
					'x' : -16,
					'y' : -0.2,
					'z' : 0,
					'scale' : 1,
					'rotate' : true,
					'rotx' : 0,
					'roty' : 349,
					'rotz' : 0,
					'materialize': true
				}),

				Store.get('chestnut', {
					'name' : 'chestnut1-z2',
					'x' : -17,
					'y' : 0,
					'z' : 5,
					'scale' : 1,
					'rotate' : true,
					'rotx' : 0,
					'roty' : 260,
					'rotz' : 0
				}),

				Store.get('streetLamp', {
					'name' : 'streetLamp1-z2',
					'x' : -9,
					'y' : 0,
					'z' : 0.7,
					'scale' : 1,
					'rotate' : true,
					'rotx' : 0,
					'roty' : 0,
					'rotz' : 0
				}),

				Store.get('streetLamp', {
					'name' : 'streetLamp2-z2',
					'x' : -12,
					'y' : 0,
					'z' : 3,
					'scale' : 1,
					'rotate' : true,
					'rotx' : 0,
					'roty' : 0,
					'rotz' : 0
				}),

				Store.get('streetLamp', {
					'name' : 'streetLamp3-z2',
					'x' : -15,
					'y' : 0,
					'z' : 5.7,
					'scale' : 1,
					'rotate' : true,
					'rotx' : 0,
					'roty' : 0,
					'rotz' : 0
				}),

				Store.get('streetLamp', {
					'name' : 'streetLamp4-z2',
					'x' : -17,
					'y' : 0,
					'z' : 8.5,
					'scale' : 1,
					'rotate' : true,
					'rotx' : 0,
					'roty' : 0,
					'rotz' : 0
				}),

				Store.get('shrub', {
					'name' : 'shrub1-z2',
					'x' : -16,
					'y' : 0,
					'z' : -4.9,
					'scale' : 0.6,
					'rotate' : true,
					'rotx' : 0,
					'roty' : 0,
					'rotz' : 0
				}),

				Store.get('shrub', {
					'name' : 'shrub2-z2',
					'x' : -15,
					'y' : 0,
					'z' : -6,
					'scale' : 0.7,
					'rotate' : true,
					'rotx' : 0,
					'roty' : 0,
					'rotz' : 0
				})
			])
			.then( objs => {

				super.init(objs);

				this.sound = SoundManager.get(this.soundId).volume(4);

				this.datas = new DataEmitter(this.controlsContainer, ['stand1', 'stand2', 'stand3'], {
					x: -16,
					y: 2.5,
					z: 0,
					particles: 30,
					side: 3.5,
					minDistance: 1.15
				});

				this.initSpline();
				resolve();
			});
		});
	}

	playAnim(nb) {
		super.playAnim(nb);
		let stand = this.objects[0].mesh;
		this.timeline.from(stand.scale, 10, {'x': 0.8, 'y': 0.8, z:'0.8', ease: Expo.easeOut}, '0');
		this.timeline.from(stand.rotation, 10, {'y': NumberUtils.toRadians(-205), ease: Expo.easeOut}, '0');

		TweenMax.delayedCall(3.5, () => {
			this.playSound();
		});
			
	}

	initSpline() {
		this.splinePoints = [
			new THREE.Vector3(0, 0, 0),
			new THREE.Vector3(-4, 0.5, 0),
			new THREE.Vector3(-10, 1, 0),
			new THREE.Vector3(-14, 1.5, -3),
			new THREE.Vector3(-18, 1.5, -6),
			new THREE.Vector3(-20, 1.5, 0),
		];
		this.spline = new Spline(this.objects[0].mesh.position, this.controlsContainer, this.zoomParams, this.splinePoints, this.idZone);
		this.spline.init();
	}

}

export default Zone2;