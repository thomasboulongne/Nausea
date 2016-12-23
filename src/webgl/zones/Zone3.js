import Zone from './Zone';

import Spline from '../objects/Spline';

import Store from '../WebGLStore';

import DataEmitter from '../data/DataEmitter';

import NumberUtils from '../utils/number-utils';

import SoundManager from '../../sound/SoundManager';

class Zone3 extends Zone {

	init() {
		
		return new Promise( resolve => {
			Promise.all([
				Store.get('statue', {
					'name' : 'statue',
					'x' : 6,
					'y' : 0,
					'z' : -2.5,
					'scale' : 1.1,
					'rotate' : true,
					'rotx' : 0,
					'roty' : 91,
					'rotz' : 0,
					'materialize': true
				}),

				Store.get('chestnut', {
					'name' : 'chestnut1-z3',
					'x' : 14,
					'y' : 0,
					'z' : -7.5,
					'scale' : 0.8,
					'rotate' : true,
					'rotx' : 0,
					'roty' : 175,
					'rotz' : 0
				}),

				Store.get('shrub', {
					'name' : 'shrub1-z3',
					'x' : 10,
					'y' : 0,
					'z' : -1.47,
					'scale' : 0.9,
					'rotate' : true,
					'rotx' : 0,
					'roty' : 0,
					'rotz' : 0
				}),

				Store.get('shrub', {
					'name' : 'shrub2-z3',
					'x' : 13,
					'y' : 0,
					'z' : -4,
					'scale' : 1.2,
					'rotate' : true,
					'rotx' : 0,
					'roty' : 0,
					'rotz' : 0
				}),

				Store.get('shrub', {
					'name' : 'shrub3-z3',
					'x' : 14,
					'y' : 0,
					'z' : -3,
					'scale' : 0.71,
					'rotate' : true,
					'rotx' : 0,
					'roty' : 0,
					'rotz' : 0
				})
			])
			.then(objs => {
				super.init(objs);

				this.sound = SoundManager.get(this.soundId).volume(3);

				this.datas = new DataEmitter(this.controlsContainer, ['statue1', 'statue2', 'statue3'], {
					x: 6,
					y: 2,
					z: -2.5,
					particles: 15,
					side: 2,
					minDistance: 1.3
				});

				this.initSpline();
				resolve();
			});
		});
	}

	playAnim(nb) {
		super.playAnim(nb);
		let statue = this.objects[0].mesh;
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
		this.splinePoints = [
			new THREE.Vector3(0, 0, 0),
			new THREE.Vector3(4, 0.5, 0),
			new THREE.Vector3(8, 0.75, 0),
			new THREE.Vector3(12, 0.65, -1),
			new THREE.Vector3(10, 0.75, -4),
			new THREE.Vector3(8, 1.1, -5)
		];
		this.spline = new Spline(this.objects[0].mesh.position, this.controlsContainer, this.zoomParams, this.splinePoints, this.id);
		this.spline.init();
	}

}

export default Zone3;