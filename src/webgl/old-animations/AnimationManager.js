import NumberUtils from '../utils/number-utils';
import SoundManager from '../../sound/SoundManager';

class AnimationManager {

	/**
	 * @constructor
	 */
	constructor() {
		this.animated = false;
	}

	/**
	 * @method
	 * @name add
	 * @description Add a child to the scene
	 * @param {object} child - A THREE object
	 */
	initScene1(objects) {

		this.objects = objects;

		for(let i = 0; i < objects.length; i++) {
			objects[i].initTimeline();
		}
		
		this.timeline1 = new TimelineMax();

		this.treeBigMesh = objects[0].mesh;
		this.treeBigMaterial = objects[0].mesh.material;

		this.statueMesh = objects[1].mesh;
		this.statueMaterial = objects[1].mesh.material;

		this.treeLittleMesh = objects[2].mesh;
		this.treeLittleMaterial = objects[2].mesh.material;

		this.objectsMesh = [this.statueMesh, this.treeBigMesh, this.treeLittleMesh];
		this.objectsMaterial = [this.statueMaterial, this.treeBigMaterial, this.treeLittleMaterial];
		this.timeline1.set(this.objectsMaterial, {'opacity': 0});

	}

	animateScene1() {

		for(let i = 0; i < this.objects.length; i ++) {
			this.objects[i].playTimeline();
		}

		if(!this.animated) {
			this.timeline1.to(this.treeBigMaterial, 6, {'opacity': 1, ease: Expo.easeOut}, '0 ');
			this.timeline1.to(this.treeBigMesh.scale, 10, {'x': 1.2, 'y': 1.2, z:'1.2', ease: Expo.easeOut}, '0');
			this.timeline1.from(this.treeBigMesh.position, 10, {'y': -0.1,ease: Expo.easeOut}, '0');
			this.timeline1.from(this.treeBigMesh.rotation, 10, {'y': NumberUtils.toRadians(-205), ease: Expo.easeOut}, '0');

			this.timeline1.to(this.statueMaterial, 6, {'opacity': 1, ease: Expo.easeOut}, '1');
			this.timeline1.to(this.statueMesh.scale, 8, {'x': 1.2, 'y': 1.2, z:'1.2', ease: Expo.easeOut}, '1');
			this.timeline1.from(this.statueMesh.position, 8, {'y': 1.9,ease: Expo.easeOut}, '1');
			this.timeline1.from(this.statueMesh.rotation, 8, {'y': NumberUtils.toRadians(-205), ease: Expo.easeOut}, '1');

			this.timeline1.to(this.treeLittleMaterial, 12 , {'opacity': 1, ease: Expo.easeOut}, '2');
			this.timeline1.fromTo(this.treeLittleMesh.scale, 12, 
				{'x': 0.6, y: '0.6', z: '0.6', ease: Expo.easeOut},
				{'x': 1.2, y: '1.2', z: '1.2', ease: Expo.easeOut},
			'2');

			this.soundMaterialize = SoundManager.load('materialize.wav');

			SoundManager.play(this.soundMaterialize);
		}

		this.animated = true;
	}
}

export default AnimationManager;