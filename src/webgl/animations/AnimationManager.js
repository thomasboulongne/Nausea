import NumberUtils from '../utils/number-utils';

class AnimationManager {

	/**
	 * @constructor
	 */
	constructor() {

	}

	/**
	 * @method
	 * @name add
	 * @description Add a child to the scene
	 * @param {object} child - A THREE object
	 */
	initScene1(treeBig, statue, treeLittle) {
		
		this.timeline1 = new TimelineMax();

		this.statueMesh = statue.mesh;
		this.statueMaterial = statue.mesh.material;

		console.log(statue)

		this.treeBigMesh = treeBig.mesh;
		this.treeBigMaterial = treeBig.mesh.material;

		this.treeLittleMesh = treeLittle.mesh;
		this.treeLittleMaterial = treeLittle.mesh.material;

		this.objectsMesh = [this.statueMesh, this.treeBigMesh, this.treeLittleMesh];
		this.objectsMaterial = [this.statueMaterial, this.treeBigMaterial, this.treeLittleMaterial];
		this.timeline1.set(this.objectsMaterial, {'opacity': 0});

	}

	animateScene1() {

		this.timeline1.to(this.treeBigMaterial, 6, {'opacity': 1, ease: Expo.easeOut}, '0 ');
		this.timeline1.to(this.treeBigMesh.scale, 10, {'x': 1.2, 'y': 1.2, z:'1.2', ease: Expo.easeOut}, '0');
		this.timeline1.from(this.treeBigMesh.position, 10, {'y': -0.1,ease: Expo.easeOut}, '0');
		this.timeline1.from(this.treeBigMesh.rotation, 10, {'y': NumberUtils.toRadians(-50), ease: Expo.easeOut}, '0');

		this.timeline1.to(this.statueMaterial, 6, {'opacity': 1, ease: Expo.easeOut}, '1');
		this.timeline1.to(this.statueMesh.scale, 8, {'x': 1.2, 'y': 1.2, z:'1.2', ease: Expo.easeOut}, '1');
		this.timeline1.from(this.statueMesh.position, 8, {'y': 1.9,ease: Expo.easeOut}, '1');
		this.timeline1.from(this.statueMesh.rotation, 8, {'y': NumberUtils.toRadians(-50), ease: Expo.easeOut}, '1');

		this.timeline1.to(this.treeLittleMaterial, 12 , {'opacity': 1, ease: Expo.easeOut}, '2');
		this.timeline1.fromTo(this.treeLittleMesh.scale, 12, 
			{'x': 0.6, y: '0.6', z: '0.6', ease: Expo.easeOut},
			{'x': 1.2, y: '1.2', z: '1.2', ease: Expo.easeOut},
		'2');
	}
}

export default AnimationManager;