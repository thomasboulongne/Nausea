import Wagner from '@superguigui/wagner';
import NoisePass from '@superguigui/wagner/src/passes/noise/noise';
import VignettePass from '@superguigui/wagner/src/passes/vignette/VignettePass';

import './utils/PointerLockControls';

import Field from './objects/Field';
import HomeTitle from './objects/HomeTitle';
import Particles from './objects/Particles';
import Skybox from './objects/Skybox';
import AWDObject from './AWDObject';

import SoundManager from './sound/SoundManager';
import Emitter from '../core/Emitter';

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

		this.cameraPositionInitial = {
			x: -7,
			y: -.3,
			z: 0
		};

		this.cameraPosition = {
			x: -5,
			y: .3,
			z: 0
		};

		this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, .1, 1000 );

		this.camera.position.set( this.cameraPositionInitial.x, this.cameraPositionInitial.y, this.cameraPositionInitial.z );

		this.camera.lookAt(this.center);

		this.scene.fog = new THREE.FogExp2( this.environmentColor, .15 );

		this.setLights();

		this.setComposer();

		this.setRaycast();

		this.loadSounds();

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

	/**
	 * Setup the scene lights
	 */
	setLights() {
		this.lights = new Lights();
		for (let i = 0; i < this.lights.list.length; i++) {
			this.add(this.lights.list[i]);
		}
	}

	/**
	 * Add the possprocess composer and the passes
	 */
	setComposer() {
		this.composer = new Wagner.Composer(this.renderer);

		this.passes = [
			new NoisePass({
				amount: .05
			}),
			new VignettePass({
				boost: 1,
				reduction: .4
			})
		];
	}

	setRaycast() {

		this.INTERSECTED = false;

		this.raycastMeshes = [];

		this.raycaster = new THREE.Raycaster();

		this.startRaycast = false;

		this.mouseRaycast = {
			x: this.mousePosition.x,
			y: this.mousePosition.y
		};
	}

	loadSounds() {
		this.sounds = {};
		this.sounds['ambiant'] = SoundManager.load('ambiant.wav', {loop: true});
		this.sounds['exist'] = SoundManager.load('exist.wav');
		this.sounds['enter'] = SoundManager.load('Enter.mp3');
		this.sounds['hover'] = SoundManager.load('Hover.mp3');
		this.sounds['progression'] = SoundManager.load('ProgressBar.mp3');
	}

	/**
	 * Create sound manager
	 */
	setAmbiantSound() {
		SoundManager.play(this.sounds.ambiant);
	}

	/**
	 * Create and load the 3d objects
	 */
	createObjects() {

		this.field = new Field();
		
		this.bench = new AWDObject('bench',{
			'name': 'bench',
			'x': 0,
			'y': .2,
			'z': 0,
			'color': 0xcacaca
		});
		
		this.sartres = new AWDObject('sartres',{
			'name': 'sartres',
			'x': 0,
			'y': .2,
			'z': 0,
			'color': 0xcacaca
		});

		this.title = new HomeTitle();

		this.particles = new Particles('particleWhite', 500, { x: 10});

		this.skybox = new Skybox('assets2d/skybox/');

		this.skybox.load()
		.then( texture => {
			this.scene.background = texture;
		});

		Promise.all([
			this.field.load(),
			this.bench.load(),
			this.particles.load(),
			this.sartres.load()
		])
		.then(() => {
			this.add(this.title.mesh);
			this.add(this.bench.mesh);
			this.add(this.field.mesh);
			this.add(this.sartres.mesh);
			this.add(this.particles.mesh);

			this.raycastMeshes.push( this.bench.mesh );
			this.raycastMeshes.push( this.sartres.mesh );
			this.startRaycast = true;
		});
		
	}

	/**
	 * Add all the listeners
	 */
	addEventListeners() {
		window.addEventListener('resize', this.onResize.bind(this));
		this.domElement.addEventListener('click', this.onClick.bind(this));
		TweenMax.ticker.addEventListener('tick', this.render.bind(this));
		Emitter.on('LOADING_COMPLETE', this.enter.bind(this));
		Emitter.on('EXPERIENCE_CLICKED', this.exit.bind(this));
	}

	toggleCamera() {
		this.controls.enabled = !this.controls.enabled;
	}

	/**
	 * Handle the camera position based on mouseMove event
	 * @param  {DOM Event} event Return of mouseMove event
	 */
	updateCameraPosition(event) {
		throttle(() => {

			this.mouseRaycast.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			this.mouseRaycast.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			this.mousePosition.x = event.clientX;
			this.mousePosition.y = event.clientY;
			this.percentX = ( this.mousePosition.x - this.halfWidth ) * 100 / this.halfWidth;
			this.percentY = ( this.mousePosition.y - this.halfHeight ) * 100 / this.halfHeight;

			TweenLite.to(this.camera.position, 1, {
				y: this.cameraPosition.y + this.percentY * .002,
				z: this.cameraPosition.z + this.percentX * .006,
				ease: Expo.easeOut
			});

		}, 100)(event);
	}

	onMouseEnter() {
		console.log('hover', this.sounds['hover']);
		this.sounds['hover'].stop();
		this.sounds['hover'].play();
	}

	onMouseLeave() {
		this.sounds['hover'].fade(1,0,.3);
	}

	onClick() {
		if( this.INTERSECTED ) {
			this.exit();
		}
	}

	/**
	 * Triggered when all objects are loaded - Start entry camera move
	 */
	enter() {
		let tl = new TimelineLite();
		tl.to(this.camera.position, 2,  {
			x: -5.5,
			y: 0,
			z: -.4,
			ease: Power2.easeIn
		})
		.to(this.camera.position, 2, {
			x: this.cameraPosition.x,
			y: this.cameraPosition.y,
			z: this.cameraPosition.z,
			ease: Power2.easeOut,
			onComplete: ()=>{
				this.boundMouseMove = event => this.updateCameraPosition(event);
				window.addEventListener('mousemove', this.boundMouseMove);
			}
		}, "-=0.5");
	}

	exit() {


		window.removeEventListener('mousemove', this.boundMouseMove);
		let exitTime = .7;
		let tl = new TimelineLite();
		tl.to(this.camera.position, exitTime, {
			x: -.1,
			y: 1,
			ease: Power4.easeIn,
			onComplete: ()=>{
				Emitter.emit('GOTO_EXPERIENCE');
			}
		}, 0)
		.to(this.center, exitTime, {
			y: 1,
			ease: Power4.easeIn,
		}, 0)
		.to(this.passes[1].params, exitTime * .7, {
			boost: 7,
			ease: Power4.easeIn,
		}, .3);
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

		if( this.startRaycast ) {
			this.raycaster.setFromCamera( this.mouseRaycast, this.camera );

			let intersects = this.raycaster.intersectObjects( this.raycastMeshes, true );

			if ( intersects.length == 0 ) {
				if( this.INTERSECTED ) {
					this.onMouseLeave();
				}
				this.INTERSECTED = false;
			}
			else {
				console.log('yo raycast');
				if( !this.INTERSECTED ) {
					this.onMouseEnter();
				}
				this.INTERSECTED = true;
			}
		}

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