import Zone from './Zone';
import Spline from '../objects/Spline';

import DataEmitter from '../data/DataEmitter';

import SoundManager from '../../sound/SoundManager';

import Store from '../WebGLStore';

class Zone1 extends Zone {

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

				SoundManager.get(this.soundId).volume(3);

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

	/**
	 * @Spline
	 */
	initSpline() {
		this.splinePoints = [
			new THREE.Vector3(0, 0, 0),
			new THREE.Vector3(0.5, 1, 3),
			new THREE.Vector3(1.5, 2, 6),
			new THREE.Vector3(2, 2.5, 11),
			new THREE.Vector3(0, 2, 14),
			new THREE.Vector3(-1, 1, 17),
			new THREE.Vector3(-3, 1.5, 11),
			new THREE.Vector3(-1, 2, 8)
		];
		this.spline = new Spline(this.objects[0].mesh.position, this.controlsContainer, this.zoomParams, this.splinePoints, this.id);
		this.spline.init();
	}

}

export default Zone1;