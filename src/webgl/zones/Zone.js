import SoundManager from '../../sound/SoundManager';
import Emitter from '../../core/Emitter';
import Dat from 'dat-gui';

import NumberUtils from '../utils/number-utils';

class Zone {

	/**
	 * @constructor
	 * param [objects] : array of object
	 * param scene : experience scene
	 */
	constructor(scene, orientation, controlsContainer, zoomParams) {

		this.scene = scene;
		this.controlsContainer = controlsContainer;
		this.zoomParams = zoomParams;
		this.idZone;

		this.animated = false;

		this.objects = [];

		this.orientation = orientation ? orientation : {
			x: [
				0,
				0
			],
			y: [
				0,
				0
			]
		};

		this.addListeners();
	}

	init() {

		for(let i = 0; i < this.objects.length; i++) {
			const obj = this.objects[i];
			if(!(obj.object.options.materialize)) {
				obj.object.material.opacity = 0;
			}
		}

		SoundManager.get('materialize').volume(0.35);
		this.soundsEndZone = ['04', '10'];
	}

	setMeshNames () {
		for( let i = 0;  i < this.objects.length; i++ ) {
			this.objects[i].object.mesh.name = this.objects[i].name;
		}
	}

	initHoverTimeline () {
		this.hoverTl = new TimelineMax();
		for(let i = 0; i < this.objects.length; i++) {
			let obj = this.objects[i].object;
			if(obj.material.fragmentShader) {
				this.hoverTl.to(obj.material.uniforms.opacity, 3.1, {value: 1}, 0);
				if(this.objects[i].rotate)
					this.hoverTl.to(obj.mesh.rotation, 3.1, {y: NumberUtils.toRadians(10), ease: Circ.easeInOut}, 0);
			}
		}

		this.hoverTl.pause();
	}

	initTimeline () {
		this.animate = true;
		this.initHoverTimeline();
		this.tweenTime = { time : 0};
		this.timeline = new TimelineMax();
		this.timeline.to(this.tweenTime, 7, {
			time: 2,
			ease: Circ.easeOut,
			onComplete: () => {
				this.animate = false;
				this.scene.add(this.datas.group);
			},
		}, '1');

		this.timeline.pause();
	}

	addListeners() {
		// Emitter.on('LEAVE_ZONE', () => {
		// 	this.playEndZoneSound(0);
		// });
		// Emitter.on('END_ZONE4', () => {
		// 	this.playEndZoneSound(1);
		// });
		Emitter.on('LEAVE_ZONE', (idZone) => {
			if(idZone === 1) {
				// Play sound after scene 1 and disable hover during this time
			}
			switch (idZone) {
				case 1:
					// PLay sound, play with fog
					this.playEndZoneSound(0);
					break;
				case 4:
					// PLay sound, play with fog
					this.playEndZoneSound(1);
					break;
				default:
					break;
			}
		});
	}

	playTimeline () {
		this.timeline.play();
	}

	playAnim () {
		Emitter.emit('ENTER_ZONE');
		this.animated = true;
		for(let i = 0; i < this.objects.length; i++) {
			this.objects[i].object.material.transparent = false;
		}
		this.playTimeline();

		this.zoomParams.strength = 0.020;

		TweenMax.delayedCall(2, () => {
			this.spline.enableSpline();
		});

		for(let i = 0; i < this.objects.length; i++) {
			const curObj = this.objects[i];
			if(curObj.rotate)
				this.timeline.to(curObj.object.mesh.rotation, 11, {'y': NumberUtils.toRadians(curObj.roty), ease: Circ.easeInOut}, '0');
			if(!(curObj.object.options.materialize)) {
				this.timeline.to(curObj.object.material, 3 , {'opacity': 1, ease: Expo.easeOut, onComplete: () => {
					curObj.object.material.transparent = false;
				}}, '0');
				this.timeline.fromTo(curObj.object.mesh.scale, 3, 
					{'x': 0.6, y: '0.8', z: '0.8', ease: Expo.easeOut},
					{'x': 1.2, y: '1.2', z: '1.2', ease: Expo.easeOut},
				'0');
				this.timeline.from(curObj.object.mesh.rotation, 3, {'y': NumberUtils.toRadians(-10)}, '0');
			}
		}

		SoundManager.play('materialize');
	}

	playEndZoneSound (id) {
		TweenMax.delayedCall(3, () => {
			SoundManager.play(this.soundsEndZone[id]);
		});
	}

	startHoverAnimation() {
		this.hoverTl.play();
	}

	endHoverAnimation() {
		this.hoverTl.reverse();
	}

	addToGUI(gui) {

		for(let i = 0; i < this.objects.length; i++) {

			let object = this.objects[i].object.mesh;

			//gui.remember(object);

			let folder = gui.addFolder(object.name);

			folder.add(object.position, 'x', -50, 50).name('posx');
			folder.add(object.position, 'y', -10, 10).name('posy');
			folder.add(object.position, 'z', -50, 50).name('posz');

			folder.add(object.scale, 'x', 0, 2).name('scale').onChange((scale) => {
				object.scale.x = object.scale.y = object.scale.z = scale;
			});

			let params = {
				'x' : NumberUtils.toDegree(object.rotation.x),
				'y' : NumberUtils.toDegree(object.rotation.y),
				'z' : NumberUtils.toDegree(object.rotation.z)
			};

			folder.add(params, 'x', 0, 360).name('rotationx').onChange((degValue) => {
				let angle = NumberUtils.toRadians(degValue);
				object.rotation.x = angle;
			});
			folder.add(params, 'y', 0, 360).name('rotationy').onChange((degValue) => {
				let angle = NumberUtils.toRadians(degValue);
				object.rotation.y = angle;
			});
			folder.add(params, 'z', 0, 360).name('rotationz').onChange((degValue) => {
				let angle = NumberUtils.toRadians(degValue);
				object.rotation.z = angle;
			});
		}
	}

	/**
	 * @addScene
	 */
	addScene() {
		for ( let i = 0; i < this.objects.length; i++) {
			let obj = this.objects[i];
			this.scene.add(obj.object.mesh);
			obj.object.mesh.position.set(obj.x, obj.y, obj.z);
			obj.object.mesh.rotation.set(NumberUtils.toRadians(obj.rotx), NumberUtils.toRadians(obj.roty), NumberUtils.toRadians(obj.rotz));
			obj.object.mesh.scale.set(obj.scale, obj.scale, obj.scale);
			if(obj.name == 'root') {
				this.gui = new Dat.GUI();
				this.gui.add(obj.object.mesh.scale, 'x', 0, 10);
				this.gui.add(obj.object.mesh.scale, 'y', 0, 10);
				this.gui.add(obj.object.mesh.scale, 'z', 0, 10);
				this.gui.add(obj.object.mesh.position, 'x', -3, Math.PI * 2);
				this.gui.add(obj.object.mesh.position, 'y', -3, Math.PI * 2);
				this.gui.add(obj.object.mesh.position, 'z', -3, Math.PI * 2);
				this.gui.add(obj.object.mesh.rotation, 'x', 0, Math.PI * 2);
				this.gui.add(obj.object.mesh.rotation, 'y', 0, Math.PI * 2);
				this.gui.add(obj.object.mesh.rotation, 'z', 0, Math.PI * 2);
			}
		}
	}

	/**
	 * @update
	 */
	update() {
		for(let i = 0; i < this.objects.length; i++) {
			// console.log(this.objects);
			if(this.objects[i].object.options.materialize && this.objects[i].rotate) {
				//this.objects[i].object.mesh.rotation.y += 0.01;
			}
		}

		if(this.animate) {
			for(let i = 0; i < this.objects.length; i++) {
				if(this.objects[i].object.options.materialize) {
					this.objects[i].object.material.uniforms.time.value = this.tweenTime.time;
					//this.objects[i].object.options.material.uniforms.time.value = this.tweenTime.time;
				}
			}
		}

		if(this.datas)
			this.datas.update();
	}

}

export default Zone;