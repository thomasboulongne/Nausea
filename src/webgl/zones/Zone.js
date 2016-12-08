import SoundManager from '../sound/SoundManager';
import Emitter from '../../core/Emitter';

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
		this.soundMaterialize = SoundManager.load('materialize.mp3', {
			volume: 0.35
		});
		this.soundsEndZone = [SoundManager.load('04-cache.mp3'), SoundManager.load('10-debordait.mp3')];
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
				
			}
		});

		this.timeline.pause();
	}

	addListeners() {
		Emitter.on('END_ZONE1', () => {
			this.playEndZoneSound(0);
		});
		Emitter.on('END_ZONE4', () => {
			this.playEndZoneSound(1);
		});
	}

	playTimeline () {
		this.timeline.play();
	}

	playAnim () {
		this.animated = true;
		for(let i = 0; i < this.objects.length; i++) {
			this.objects[i].object.material.transparent = false;
		}
		this.playTimeline();

		this.zoomParams.strength = 0.020;

		TweenMax.delayedCall(2, () => {
			this.spline.enableSpline();
		});


		SoundManager.play(this.soundMaterialize);
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
			this.scene.add(this.objects[i].object.mesh);
			this.objects[i].object.mesh.position.set(this.objects[i].x, this.objects[i].y, this.objects[i].z);
			this.objects[i].object.mesh.rotation.set(NumberUtils.toRadians(this.objects[i].rotx), NumberUtils.toRadians(this.objects[i].roty), NumberUtils.toRadians(this.objects[i].rotz));
			this.objects[i].object.mesh.scale.set(this.objects[i].scale, this.objects[i].scale, this.objects[i].scale);
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