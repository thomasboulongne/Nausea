import Wagner from '@superguigui/wagner';
import NoisePass from '@superguigui/wagner/src/passes/noise/noise';

import './utils/PointerLockControls';

import Field from './objects/Field';
import HomeTitle from './objects/HomeTitle';
import Particles from './objects/Particles';
import AWDObject from './AWDObject';

import SoundManager from './sound/SoundManager';

import Lights from './Lights';

import { throttle } from 'lodash';

class HomeScene {

	/**
	 * @constructor
	 */
	constructor(domElement) {

		this.domElement = domElement;

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.environmentColor = 0x999999;

		this.halfWidth = this.width / 2;
		this.halfHeight = this.height / 2;

		this.scene = new THREE.Scene();

		this.renderer = new THREE.WebGLRenderer({antialias: true});
		this.renderer.setSize(this.width, this.height);
		this.renderer.setClearColor(this.environmentColor);

		this.mousePosition = {
			x: this.halfWidth,
			y: this.halfHeight
		};

		this.center = new THREE.Vector3( );

		this.cameraPosition = {
			x: -4,
			y: 0.3,
			z: 0
		};

		this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, .1, 1000 );

		this.camera.position.set( this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z );

		this.camera.lookAt(this.center);

		this.scene.fog = new THREE.FogExp2( this.environmentColor, 0.15 );

		this.setLights();

		this.setComposer();

		//this.setAmbiantSound();

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

	setLights() {
		this.lights = new Lights();
		for (let i = 0; i < this.lights.list.length; i++) {
			this.add(this.lights.list[i]);
		}
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

		this.title = new HomeTitle();
		this.add(this.title.mesh);

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
			this.add(this.treeBig.mesh);

			this.add(this.statue.mesh);

			this.add(this.treeLittle.mesh);

		});

		this.rock.load()
		.then(() => {
			this.objects.push(this.rock.mesh);
			this.add(this.rock.mesh);
		});

		this.particles = new Particles('particleWhite', 500, { x: 10});
		this.particles.load()
		.then(() => {
			this.add(this.particles.mesh);
		});
		
	}

	addEventListeners() {
		window.addEventListener('resize', this.onResize.bind(this));
		window.addEventListener('mousemove', this.updateCameraPosition.bind(this));
		TweenMax.ticker.addEventListener('tick', this.render.bind(this));
	}

	toggleCamera() {
		this.controls.enabled = !this.controls.enabled;
	}

	updateCameraPosition(event) {
		throttle(() => {

			this.mousePosition.x = event.clientX;
			this.mousePosition.y = event.clientY;
			this.percentX = ( this.mousePosition.x - this.halfWidth ) * 100 / this.halfWidth;
			this.percentY = ( this.mousePosition.y - this.halfHeight ) * 100 / this.halfHeight;

			TweenLite.to(this.camera.position, 1, {
				z: this.cameraPosition.z + this.percentX * .006,
				y: this.cameraPosition.y + this.percentY * .002,
				ease: Expo.easeOut
			});
			// this.camera.position.z = ;
			// this.camera.position.;

		}, 100)(event);
	}

	/**
	 * @method
	 * @name render
	 * @description Renders/Draw the scene
	 */
	render() {

		//Particles 
		this.particles.update();

		this.renderer.autoClearColor = true;

		this.camera.lookAt( this.center );

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

		this.halfWidth = this.width / 2;
		this.halfHeight = this.height / 2;

		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(this.width, this.height);

	}

}

export default HomeScene;