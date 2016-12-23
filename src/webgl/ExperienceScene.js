import Wagner from '@superguigui/wagner';
import NoisePass from '@superguigui/wagner/src/passes/noise/noise';
import VignettePass from '@superguigui/wagner/src/passes/vignette/VignettePass';
import ZoomBlurPass from '@superguigui/wagner/src/passes/zoom-blur/ZoomBlurPass';

import './utils/PointerLockControls';
import Config from './config';
import Dat from 'dat-gui';

import Field from './objects/Field';
import Particles from './objects/Particles';
import Skybox from './objects/Skybox';
import ChromaKeyPlane from './objects/ChromaKeyPlane';

import SoundManager from '../sound/SoundManager';

import SceneManager from './SceneManager';

import Emitter from '../core/Emitter';

import Lights from './lights/Lights';

import WebglCursor from './misc/WebglCursor';

import Zone0 from './zones/Zone0';
import Zone1 from './zones/Zone1';
import Zone2 from './zones/Zone2';
import Zone3 from './zones/Zone3';
import Zone4 from './zones/Zone4';

//import NumberUtils from './utils/number-utils';

class ExperienceScene {

	/**
	 * @constructor
	 */
	constructor(domElement) {
		if(Config.gui) this.gui = new Dat.GUI();


		this.domElement = domElement;

		this.INTERSECTED = null;

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.scene = new THREE.Scene();

		SceneManager.addScene('experience', this);

		this.countZones = 0;

		// this.add(new THREE.AxisHelper(8));

		this.renderer = new THREE.WebGLRenderer({antialias: true});
		this.renderer.setSize(this.width, this.height);
		this.renderer.setClearColor(0xffffff);

		this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, .01, 100000 );

		this.scene.fog = new THREE.FogExp2( 0xffffff, 0.08 );
		if(Config.gui) this.gui.add(this.scene.fog, 'density', 0, 0.2).name('fog');

		this.enabledRaycast = false;

		this.doneZonesNumber = 0;

		this.setControls();

		this.setLights();

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

		let controlsPosition = {
			z: 0,
			y: 1,
			x: 0
		};

		this.controls = new THREE.PointerLockControls( this.camera, controlsPosition, this.center, 0.01 );
		this.controlsContainer = new THREE.Object3D();
		this.controlsContainer.add( this.controls.getObject() );
		this.add( this.controlsContainer );
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
			}),
			new VignettePass({
				boost: 7,
				reduction: .4
			}),
			new ZoomBlurPass({
				strength: 0.0025
			})
		];
	}

	setAmbiantSound() {
		SoundManager.play('atmos01');
	}

	createObjects() {

		this.field = new Field();

		this.particles = new Particles('particle', 500);

		this.whiteSkybox = new Skybox('assets2d/skybox/');
		this.blackSkybox = new Skybox('assets2d/homeSkybox/');

		Promise.all([
			this.whiteSkybox.load(),
			this.blackSkybox.load(),
			this.field.load(),
			this.particles.load()
		])
		.then( () => {

			this.scene.background = this.whiteSkybox.texture;
			this.add(this.field.mesh);
			this.add(this.particles.mesh);

			this.zones = [
				new Zone0(),
				new Zone1({x: [882,1059],y: [541,674]}, this.controlsContainer, this.passes[2].params, 1, 'Le Maronnier', '03'),
				new Zone2({x: [1407,1640], y: [555,696]}, this.controlsContainer, this.passes[2].params, 2, 'Le Kiosque', '06'),
				new Zone3({x: [132,252], y: [553,677]}, this.controlsContainer, this.passes[2].params, 3, 'La Statue', '05'),
				new Zone4({x: [459,552], y: [592,677]}, this.controlsContainer, this.passes[2].params, 4, 'La Fontaine', '07')
			];

			Promise.all([
				this.zones[0].init(),
				this.zones[1].init(),
				this.zones[2].init(),
				this.zones[3].init(),
				this.zones[4].init()
			])
			.then( () => {

				for (let i = 0; i < this.zones.length; i++) {
					for (let j = 0; j < this.zones[i].objects.length; j++) {
						this.add(this.zones[i].objects[j].mesh);
					}
					this.zones[i].initTimeline();
				}

				Emitter.on('ZONE_FOCUSED', this.startZoneAnimation.bind(this));
				
				this.intro();
			});
		});


		this.videos = [];

		this.videos.push(new ChromaKeyPlane('business_sitting', {
			r: 1,
			g: 1,
			b: 1,
			x: -3.2,
			y: .7,
			z: 10.3,
			rotY: -1
		}));

		this.videos.push(new ChromaKeyPlane('man_sitting_tree', {
			r: 1,
			g: 1,
			b: 1,
			x: 1.3,
			y: .68,
			z: 10.3,
			rotY: 1
		}));

		this.videos.push(new ChromaKeyPlane('couple', {
			r: 1,
			g: 1,
			b: 1,
			x: -13,
			y: 1.4,
			z: -.3,
			rotY: 1
		}));
		
	}

	intro() {
		
		let cameraTl = new TimelineLite();

		cameraTl
		.add(() => {
			SoundManager.play('02');
		}, "+=4")
		.to(this.passes[1].params, 4, {
			delay: 2,
			boost: 1
		})
		.to(this.controls.pitchObject.rotation, 10, {
			x: .1,
			ease: Power1.easeInOut,
			onComplete: () => {
				this.controls.enabled = true;
				this.enabledRaycast = true;
				this.cursor = new WebglCursor(this.domElement, 'ZONE_FOCUSED', {color: '#4a4a4a'});
				Emitter.emit('SHOW_TT', 1);
			}
		}, '-=2')
		.add(() => {
			Emitter.emit('INTRO_END');
		}, '-=1.5');

		this.zones[0].rootsTl.play();
	}

	outro() {
		// launch
		let tl = new TimelineMax();
		

		tl.add( () => {
			this.endLights = true;
		}, '2')
		.to(this.passes[2].params, 20, {
			strength: 0.2
		}, '3')
		.to(this.camera, 20, {
			fov: 20
		}, '3')
		.add( () => {
			SoundManager.play('10');
		}, '3')
		.add( () => {
			SoundManager.play('16');
		}, '22')
		.add( () => {
			SoundManager.play('11');
		}, '41')
		.add( () => {
			SoundManager.play('13');
		}, '46')
		.add( () => {
			Emitter.emit('END_SCREEN');
			this.scene.background = this.blackSkybox.texture;
		}, '46');
	}

	addEventListeners() {
		window.addEventListener('resize', this.onResize.bind(this));
		TweenMax.ticker.addEventListener('tick', this.render.bind(this));
		Emitter.on('ENTER_ZONE', this.onEnterZone.bind(this));
		Emitter.on('LEAVE_ZONE', this.onLeaveZone.bind(this));
		Emitter.on('DISABLE_RAYCAST', () => {this.enabledRaycast = false;});
		Emitter.on('ENABLE_RAYCAST', () => {this.enabledRaycast = true;});

		window.addEventListener('keydown', this.toggleCamera.bind(this));
	}

	toggleCamera(event) {
		if(event != undefined || event.keyCode === 27)
			this.controls.enabled = !this.controls.enabled;
	}

	addCanvasElement(domElt) {
		this.canvasElement = domElt;
	}

	startZoneAnimation() {
		if(this.INTERSECTED != null) {
			this.doneZonesNumber++;

			this.INTERSECTED.playAnim(this.doneZonesNumber);
		}
	}

	onEnterZone() {
		TweenMax.to(this.scene.fog, 1, {density: 0.12, delay: 1});
	}

	onLeaveZone(idZone) {
		this.countZones ++;

		TweenMax.to(this.scene.fog, 1, {density: 0.12 - idZone/100});

		switch (this.countZones) {
			case 1:
				TweenMax.delayedCall(3, () => {
					SoundManager.play('04');
				});
				break;
			case 2:
				SoundManager.play('atmos02');
				break;
			case 3:
				SoundManager.play('atmos05');
				break;
			case 4:
				this.outro();
				SoundManager.play('atmos06');
				break;
			default:
				break;
		}

		TweenMax.to(this.scene.fog, 1, {density: 0.08});
		this.enabledRaycast = true;

		switch(idZone) {
			case 1:
				this.add(this.videos[0].mesh);
				this.videos[0].play();
				setTimeout(() => {
					this.add(this.videos[1].mesh);
					this.videos[1].play();
				}
				, 2000);
				break;
			case 2:
				this.add(this.videos[2].mesh);
				this.videos[2].play();
				break;
		}
	}

	/**
	 * @method
	 * @name render
	 * @description Renders/Draw the scene
	 */
	render() {

		if(this.zones) {

			this.intersect = null;

			for (let i = 0; i < this.zones.length; i++) {
				let zone = this.zones[i];
				zone.update();
				let mouse = this.controls.mouse;

				if( mouse.x > window.innerWidth * zone.orientation.x[0] / 1706
					&& mouse.x < window.innerWidth * zone.orientation.x[1] / 1706
					&& mouse.y > window.innerHeight * zone.orientation.y[0] / 1299
					&& mouse.y < window.innerHeight * zone.orientation.y[1] / 1299
					&& !zone.animated ) {
					this.intersect = zone;
				}
			}
			if(this.intersect != null && this.enabledRaycast) {
				if(this.INTERSECTED == null) {
					this.intersect.startHoverAnimation();
					this.cursor.onMouseEnter();
					setTimeout(() => Emitter.emit('HIDE_TT', 1), 500);
				}
			}
			else {
				if(this.INTERSECTED != null) {
					this.cursor.onMouseLeave();

					if(!this.INTERSECTED.animated){
						this.INTERSECTED.endHoverAnimation();
					}
				}
				
			}
			this.INTERSECTED = this.intersect;
		}

		this.renderer.autoClearColor = true;

		this.composer.reset();
		this.composer.render(this.scene, this.camera);

		for (let i = 0; i < this.passes.length; i++) {
			this.composer.pass(this.passes[i]);
		}

		this.composer.toScreen();

		if( this.canvasElement ) {
			this.canvasElement.style.opacity = 1;
		}

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