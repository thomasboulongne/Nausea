import Wagner from '@superguigui/wagner';
import NoisePass from '@superguigui/wagner/src/passes/noise/noise';

import './utils/PointerLockControls';

import Field from './objects/Field';
import Particles from './objects/Particles';
import AWDObject from './AWDObject';

import SoundManager from './SoundManager';

import Lights from './Lights';

class Scene {

	/**
	 * @constructor
	 */
	constructor(domElement) {
		this.domElement = domElement;

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.scene = new THREE.Scene();

		this.scene.fog = new THREE.FogExp2( 0xffffff, 0.15 );

		this.renderer = new THREE.WebGLRenderer({antialias: true});
		this.renderer.setSize(this.width, this.height);
		this.renderer.setClearColor(0xffffff);
		this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, .1, 1000 );

		this.setControls();

		this.setLights();

		this.setRaycast();

		this.setComposer();

		this.setAmbiantSound();

		this.createObjects();

		this.addEventListeners();

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

		this.controls = new THREE.PointerLockControls(this.camera, {
			z: 0,
			y: 1,
			x: 0
		}, this.center
		);
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
		this.soundManager.play(this.soundExist);
	}

	createObjects() {
		this.objects = [];
		this.field = new Field();
		this.field.load()
		.then(() => {
			this.objects.push(this.field.mesh);
			this.add(this.field.mesh);
		});

		this.bench = new AWDObject('bench',{
			'name': 'bench',
			'x': 0,
			'y': 0,
			'z': 0,
			'color': 0xcacaca
		});
		this.bench.load()
		.then(() => {
			this.objects.push(this.bench.hitbox);
			this.add(this.bench.hitbox);
			this.add(this.bench.mesh);
		});

		this.treeBig = new AWDObject('tree-big',{
			'name': 'treeBig',
			'x': 5,
			'y': 0,
			'z': 5,
			'color': 0xcacaca
		});
		this.treeBig.load()
		.then(() => {
			this.objects.push(this.treeBig.hitbox);
			this.add(this.treeBig.hitbox);
			this.add(this.treeBig.mesh);
		});

		this.treeLittle = new AWDObject('tree-little',{
			'name': 'treeLittle',
			'x': 9,
			'y': 0,
			'z': -6,
			'color': 0xcacaca
		});
		this.treeLittle.load()
		.then(() => {
			this.objects.push(this.treeLittle.hitbox);
			this.add(this.treeLittle.hitbox);
			this.add(this.treeLittle.mesh);
		});

		this.rock = new AWDObject('rock',{
			'name': 'rock',
			'x': 6,
			'y': 0,
			'z': -2.6,
			'color': 0xcacaca
		});
		this.rock.load()
		.then(() => {
			this.objects.push(this.rock.hitbox);
			this.add(this.rock.hitbox);
			this.add(this.rock.mesh);
		});

		this.particles = new Particles();
		this.particles.load()
		.then(() => {
			this.add(this.particles.mesh);
		});
	}

	addEventListeners() {
		window.addEventListener('resize', this.onResize.bind(this));
		TweenMax.ticker.addEventListener('tick', this.render.bind(this));
		this.domElement.addEventListener('click', this.toggleCamera.bind(this));
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


		if ( intersects.length > 0 && intersects[0].object.name != 'field' ) {
			// The raycast encouters an object
			console.log('Casted object: ', intersects[0].object.name);
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

export default Scene;