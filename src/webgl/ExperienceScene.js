import Wagner from '@superguigui/wagner';
import NoisePass from '@superguigui/wagner/src/passes/noise/noise';

import './utils/PointerLockControls';
import Config from './config';
import Dat from 'dat-gui';

import Field from './objects/Field';
import Particles from './objects/Particles';
import AWDObject from './AWDObject';

import SoundManager from './sound/SoundManager';
import AnimationManager from './animations/AnimationManager';

import Lights from './Lights';

class ExperienceScene {

	/**
	 * @constructor
	 */
	constructor(domElement) {
		if(Config.gui) this.gui = new Dat.GUI;

		this.domElement = domElement;

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.scene = new THREE.Scene();

		this.renderer = new THREE.WebGLRenderer({antialias: true});
		this.renderer.setSize(this.width, this.height);
		this.renderer.setClearColor(0xffffff);
		this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, .1, 1000 );

		this.scene.fog = new THREE.FogExp2( 0xffffff, 0.15 );

		this.setControls();

		this.setLights();

		this.setRaycast();

		this.setComposer();

		//this.setAmbiantSound();

		this.createObjects();

		this.addEventListeners();

		this.animationManager = new AnimationManager();

	}

	/**
	 * @method
	 * @name add
	 * @description Add a child to the scene
	 * @param {object} child - A THREE object
	 */
	add(child) {

		this.scene.add(child);

	}

	/**
	 * @method
	 * @name remove
	 * @description Remove a child from the scene
	 * @param {object} child - A THREE object
	 */
	remove(child) {

		this.scene.remove(child);

	}

	setControls() {

		this.center = new THREE.Vector3( );

		let controlsPosition = {
			z: 0,
			y: 1,
			x: 0
		};

		this.controls = new THREE.PointerLockControls( this.camera, controlsPosition, this.center, 0.002 );
		this.add( this.controls.getObject() );
	}

	setLights() {
		this.lights = new Lights();
		for (let i = 0; i < this.lights.list.length; i++) {
			this.add(this.lights.list[i]);
		}
	}

	setRaycast() {

		this.INTERSECTED;

		this.raycaster = new THREE.Raycaster();

		this.direction = new THREE.Vector3( 0, 0, -1 );
		this.rotation = new THREE.Euler( 0, 0, 0, "YXZ" );
	}

	setComposer() {
		this.composer = new Wagner.Composer(this.renderer);

		this.passes = [
			new NoisePass({
				amount: .05
			})
		];
	}

	setAmbiantSound() {
		this.soundManager = new SoundManager();

		this.soundAmbiant = this.soundManager.load('ambiant.wav');
		this.soundExist = this.soundManager.load('exist.wav');

		this.soundManager.play(this.soundAmbiant);
	}

	createObjects() {
		this.objects = [];

		this.field = new Field();
		
		this.bench = new AWDObject('bench',{
			'name': 'bench',
			'x': 0,
			'y': 0,
			'z': 0,
			'color': 0xcacaca
		});

		this.treeBig = new AWDObject('tree-big',{
			'name': 'treeBig',
			'x': 4,
			'y': 0,
			'z': 8.5,
			'color': 0xcacaca
		});

		this.treeLittle = new AWDObject('tree-little',{
			'name': 'treeLittle',
			'x': 6,
			'y': 0,
			'z': 8,
			'color': 0xcacaca
		});

		this.statue = new AWDObject('statue001',{
			'name': 'statue',
			'x': 5,
			'y': 0,
			'z': 5,
			'color': 0xcacaca
		});

		this.rock = new AWDObject('rock',{
			'name': 'rock',
			'x': 3,
			'y': 0,
			'z': 8,
			'color': 0xcacaca
		});

		this.field.load()
		.then(() => {
			this.add(this.field.mesh);
		});

		this.bench.load()
		.then(() => {
			this.objects.push(this.bench.mesh);
			this.add(this.bench.mesh);
		});

		Promise.all([
			this.treeBig.load(),
			this.treeLittle.load(),
			this.statue.load()
		])
		.then(() => {
			this.objects.push(this.treeBig.mesh);
			this.add(this.treeBig.mesh);

			this.objects.push(this.statue.mesh);
			this.add(this.statue.mesh);

			this.objects.push(this.treeLittle.mesh);
			this.add(this.treeLittle.mesh);

			if(Config.gui) {
				this.treeBig.addToGUI(this.gui, 'bigTree');
				this.treeLittle.addToGUI(this.gui, 'littleTree');
				this.statue.addToGUI(this.gui, 'statue');
			}

			this.animationManager.initScene1(this.treeBig, this.statue, this.treeLittle);
		});

		this.rock.load()
		.then(() => {
			this.objects.push(this.rock.mesh);
			this.add(this.rock.mesh);
			if(Config.gui) this.rock.addToGUI(this.gui, 'rock');
		});

		this.particles = new Particles('particleNoborder', 500);
		this.particles.load()
		.then(() => {
			this.add(this.particles.mesh);
		});
		
	}

	addEventListeners() {
		window.addEventListener('resize', this.onResize.bind(this));
		TweenMax.ticker.addEventListener('tick', this.render.bind(this));
	}

	toggleCamera() {
		this.controls.enabled = !this.controls.enabled;
	}

	/**
	 * @method
	 * @name render
	 * @description Renders/Draw the scene
	 */
	render() {

		//Particles 
		this.particles.update();

		this.rotation.set( this.controls.getPitch().rotation.x, this.controls.getObject().rotation.y, 0 );

		this.raycaster.ray.direction.copy( this.direction ).applyEuler( this.rotation );
		this.raycaster.ray.origin.copy( this.controls.getObject().position );

		let intersects = this.raycaster.intersectObjects( this.objects, true );


		if ( intersects.length > 0 ) {
			// The raycast encouters an object
			let objName = intersects[0].object.name;
			console.log('Casted object: ', intersects[0].object.name);
			if(objName == 'statue001' || objName == 'tree-little' || objName == 'tree-big') {
				this.animationManager.animateScene1();
			}
		} else {
			this.INTERSECTED = null;
		}

		this.renderer.autoClearColor = true;

		this.composer.reset();
		this.composer.render(this.scene, this.camera);

		for (let i = 0; i < this.passes.length; i++) {
			this.composer.pass(this.passes[i]);
		}

		this.composer.toScreen();

	}

	/**
	 * @method
	 * @name onResize
	 * @description Resize the scene according to screen size
	 * @param {number} newWidth
	 * @param {number} newHeight
	 */
	onResize() {

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(this.width, this.height);

	}

}

export default ExperienceScene;