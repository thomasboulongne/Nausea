import Wagner from '@superguigui/wagner';
import NoisePass from '@superguigui/wagner/src/passes/noise/noise';
import VignettePass from '@superguigui/wagner/src/passes/vignette/VignettePass';

import './utils/PointerLockControls';

import WebglCursor from './misc/WebglCursor';

import Field from './objects/Field';
import HomeTitle from './objects/HomeTitle';
import Particles from './objects/Particles';
import Skybox from './objects/Skybox';
import Store from './WebGLStore';

import SoundManager from '../sound/SoundManager';
import Emitter from '../core/Emitter';

import Lights from './lights/Lights';
import HomeLights from './lights/HomeLights';

import { throttle } from 'lodash';

class HomeScene {

	/**
	 * @constructor
	 */
	constructor(domElement) {
		this.domElement = domElement;

		this.cursor = new WebglCursor(this.domElement, 'CURSOR_ENTER');

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.environmentColor = 0x2a2a2a;

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

		this.center = new THREE.Vector3( 0, 1, 0 );

		this.cameraPositionInitial = {
			x: -10,
			y: -.3,
			z: 0
		};

		this.cameraPosition = {
			x: -6,
			y: 1,
			z: 0
		};

		this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, .1, 1000 );

		this.camera.position.set( this.cameraPositionInitial.x, this.cameraPositionInitial.y, this.cameraPositionInitial.z );

		this.camera.lookAt(this.center);

		this.scene.fog = new THREE.FogExp2( this.environmentColor, .1 );

		this.setLights();

		this.setComposer();

		this.setRaycast();

		this.setSounds();

		this.initObjects();

		this.addEventListeners();

		this.exitFlag = false;

	}

	destructor() {
		this.removeEventListeners();
		this.scene = null;
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

		this.homeLights = new HomeLights();
		for (let i = 0; i < this.homeLights.lights.length; i++) {
			this.add(this.homeLights.lights[i]);
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

	setSounds() {
		this.enableHoverSound = true;

		this.setAmbiantSound();
	}

	/**
	 * Create sound manager
	 */
	setAmbiantSound() {
		SoundManager.play('atmos01');
	}

	initObjects() {
		let objs = [
			{
				'name': 'bench',
				'materialize': true
			},
			{
				'name': 'chestnut',
				'materialize': true
			},
			{
				'name': 'fern',
				'materialize': true
			},
			{
				'name': 'fountain',
				'materialize': true
			},
			{
				'name': 'kiosque',
				'materialize': true
			},
			{
				'name': 'mineral',
				'materialize': true
			},
			{
				'name': 'sartre_bench_intro',
				'materialize': false
			},
			{
				'name': 'sartre_bench_xp',
				'materialize': false
			},
			{
				'name': 'sartres',
				'materialize': true
			},
			{
				'name': 'shrub',
				'materialize': false
			},
			{
				'name': 'stand',
				'materialize': true
			},
			{
				'name': 'statue',
				'materialize': true
			},
			{
				'name': 'streetLamp',
				'materialize': false
			},
			{
				'name': 'root',
				'materialize': false
			},
			{
				'name': 'root2',
				'materialize': false
			},
			{
				'name': 'root02',
				'materialize': false
			}
		];

		let promises = [];
		for (let i = 0; i < objs.length; i++) {
			promises.push(Store.get(objs[i].name, objs[i]));
		}

		Promise.all(promises)
		.then(() => {
			this.createObjects();
		});
	}

	/**
	 * Create and load the 3d objects
	 */
	createObjects() {

		this.field = new Field();
		
		this.title = new HomeTitle();

		this.particles = new Particles('particleWhite', 500, { x: 10});

		this.skybox = new Skybox('assets2d/homeSkybox/');

		Promise.all([
			Store.get('sartre_bench_intro',{
				'name': 'sartre_bench_intro',
				'x': 0,
				'y': -5,
				'z': 0,
				'color': 0xcacaca
			}),
			this.skybox.load(),
			this.field.load(),
			this.particles.load()
		])
		.then(data => {
			this.bench = data[0];
			this.bench.mesh.position.y = -0.22;
			this.scene.background = data[1];

			this.add(this.title.mesh);
			this.add(this.bench.mesh);
			this.add(this.field.mesh);
			this.add(this.particles.mesh);

			this.raycastMeshes.push( this.bench.mesh );
			this.startRaycast = true;
		});
		
	}

	/**
	 * Add all the listeners
	 */
	addEventListeners() {
		this.bindResize = this.onResize.bind(this);
		window.addEventListener('resize', this.bindResize);
		this.bindClick = this.onClick.bind(this);
		Emitter.on('CURSOR_ENTER', this.bindClick);
		this.bindRender = this.render.bind(this);
		TweenMax.ticker.addEventListener('tick', this.bindRender);
		this.bindEnter = this.enter.bind(this);
		Emitter.on('LOADING_COMPLETE', this.bindEnter);
	}

	/**
	 * remove all the listeners
	 */
	removeEventListeners() {
		window.removeEventListener('resize', this.bindResize);
		this.domElement.removeEventListener('click', this.bindClick);
		TweenMax.ticker.removeEventListener('tick', this.bindRender);
		Emitter.off('LOADING_COMPLETE', this.bindEnter);
		window.removeEventListener('mousemove', this.boundMouseMove);
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
		if(!this.in) {
			Emitter.emit('HOME_MOUSEENTER');

			this.cursor.onMouseEnter();
		}
		this.in = true;
	}

	onMouseLeave() {
		Emitter.emit('HOME_MOUSELEAVE');

		this.in = false;

		this.cursor.onMouseLeave();
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
				this.endStartAnimation = true;
				Emitter.emit('HOME_ENDENTER');
			}
		}, "-=0.5");
	}

	exit() {
		this.startRaycast = false;
		if(!this.exitFlag) {
			SoundManager.play('enter');
			let exitTime = .7;
			let tl = new TimelineLite();
			tl.to(this.camera.position, exitTime, {
				x: -.1,
				y: .9,
				z: .2,
				ease: Power4.easeIn,
				onComplete: ()=>{
					Emitter.emit('GOTO_EXPERIENCE');
				}
			}, 0)
			.to(this.center, exitTime, {
				x: -.1,
				y: .9,
				z: .2,
				ease: Power4.easeIn,
			}, 0)
			.to(this.passes[1].params, exitTime * .7, {
				boost: 7,
				ease: Power4.easeIn,
			}, .3);
		}

		this.exitFlag = true;
	}

	/**
	 * @method
	 * @name render
	 * @description Renders/Draw the scene
	 */
	render() {

		this.homeLights.update();

		//Particles 

		if(this.particles)
			this.particles.update();

		if(this.title)
			this.title.update();

		this.renderer.autoClearColor = true;

		this.camera.lookAt( this.center );

		if( this.startRaycast ) {
			this.raycaster.setFromCamera( this.mouseRaycast, this.camera );

			let intersects = this.raycaster.intersectObjects( this.raycastMeshes, true );

			if ( intersects.length == 0 ) {
				if(this.INTERSECTED) {
					this.onMouseLeave();
				}
				this.INTERSECTED = false;
			}
			else {
				if(!this.INTERSECTED) {
					this.onMouseEnter();
				}
				this.enableHoverSound = true;
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