import SoundManager from '../../sound/SoundManager';
import Emitter from '../../core/Emitter';

import SceneManager from '../SceneManager';

import NumberUtils from '../utils/number-utils';

class Zone {

	/**
	 * @constructor
	 * param [objects] : array of object
	 * param scene : experience scene
	 */
	constructor(orientation, controlsContainer, zoomParams, id, name, soundId) {

		this.controlsContainer = controlsContainer;
		this.zoomParams = zoomParams;
		this.id = id;

		this.name = name;

		this.soundId = soundId;

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

	init(objs) {
		for(let i = 0; i < objs.length; i++) {
			const obj = objs[i];
			if(!(obj.options.materialize)) {
				obj.material.opacity = obj.options.opacity ? obj.options.opacity : 0;
			}
			this.objects.push(obj);
		}

		SoundManager.get('materialize').volume(0.35);
		this.soundsEndZone = ['04', '10'];

	}

	initHoverTimeline () {
		this.hoverTl = new TimelineMax({paused: true});

		for(let i = 0; i < this.objects.length; i++) {
			let obj = this.objects[i];
			if(obj.material.fragmentShader) {
				this.hoverTl.to(obj.material.uniforms.opacity, 3.1, {value: 1}, 0);
				if(obj.options.rotate) {
					this.hoverTl.to(obj.mesh.rotation, 3.1, {y: NumberUtils.toRadians(10), ease: Circ.easeInOut}, 0);
				}
			}
		}
	}

	initTimeline () {
		this.animate = true;
		this.initHoverTimeline();
		this.tweenTime = { time : 0};
		this.timeline = new TimelineMax({paused: true});
		this.timeline.to(this.tweenTime, 7, {
			time: 2,
			ease: Circ.easeOut,
			onComplete: () => {
				this.animate = false;
				SceneManager.add('experience', this.datas.group);
			},
		}, '1');
	}

	addListeners() {
		// Emitter.on('LEAVE_ZONE', () => {
		// 	this.playEndZoneSound(0);
		// });
		// Emitter.on('END_ZONE4', () => {
		// 	this.playEndZoneSound(1);
		// });
		Emitter.on('LEAVE_ZONE', (zoneId) => {
			if(zoneId === 1) {
				// Play sound after scene 1 and disable hover during this time
			}
			// switch (zoneId) {
			// 	case 1:
			// 		// PLay sound, play with fog
			// 		this.playEndZoneSound(0);
			// 		break;
			// 	case 4:
			// 		// PLay sound, play with fog
			// 		this.playEndZoneSound(1);
			// 		break;
			// 	default:
			// 		break;
			// }
		});
	}

	playTimeline () {
		this.timeline.play();
	}

	playAnim (zoneNumber) {

		Emitter.emit('ENTER_ZONE', this.name, zoneNumber);
		this.animated = true;
		for(let i = 0; i < this.objects.length; i++) {
			this.objects[i].material.transparent = false;
		}
		this.playTimeline();

		this.zoomParams.strength = 0.020;

		TweenMax.delayedCall(2, () => {
			this.spline.enableSpline();
		});

		for(let i = 0; i < this.objects.length; i++) {
			const curObj = this.objects[i];
			if(curObj.options.rotate)
				this.timeline.to(curObj.mesh.rotation, 11, {'y': NumberUtils.toRadians(curObj.roty), ease: Circ.easeInOut}, '0');
			if(!(curObj.options.materialize)) {
				this.timeline.to(curObj.material, 3 , {'opacity': 1, ease: Expo.easeOut, onComplete: () => {
					curObj.material.transparent = false;
				}}, '0');
				this.timeline.fromTo(curObj.mesh.scale, 3, 
					{'x': 0.6, y: '0.8', z: '0.8', ease: Expo.easeOut},
					{'x': 1.2, y: '1.2', z: '1.2', ease: Expo.easeOut},
				'0');
				this.timeline.from(curObj.mesh.rotation, 3, {'y': NumberUtils.toRadians(-10)}, '0');
			}
		}

		SoundManager.play('materialize');
	}

	playEndZoneSound (id) {
		TweenMax.delayedCall(3, () => {
			SoundManager.play(this.soundsEndZone[id]);
		});
	}

	playSound() {
		SoundManager.play(this.soundId);
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
	 * @update
	 */
	update() {

		if(this.animate) {
			for(let i = 0; i < this.objects.length; i++) {
				if(this.objects[i].options.materialize) {
					this.objects[i].material.uniforms.time.value = this.tweenTime.time;
				}
			}
		}

		if(this.datas)
			this.datas.update();

		if(this.spline)
			this.spline.update();
	}

}

export default Zone;