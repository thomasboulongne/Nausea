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
import Store from './WebGLStore';

//import SoundManager from './sound/SoundManager';

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

		this.cursor = new WebglCursor(this.domElement, 'ZONE_FOCUSED', {color: '#4a4a4a'});

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.scene = new THREE.Scene();

		this.renderer = new THREE.WebGLRenderer({antialias: true});
		this.renderer.setSize(this.width, this.height);
		this.renderer.setClearColor(0xffffff);

		this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, .01, 100000 );

		this.scene.fog = new THREE.FogExp2( 0xffffff, 0.08 );
		if(Config.gui) this.gui.add(this.scene.fog, 'density', 0, 0.2).name('fog');

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
		//this.soundAmbiant = SoundManager.load('ambiant.wav');
		//this.soundExist = SoundManager.load('exist.wav');

		//SoundManager.play(this.soundAmbiant);
	}

	createObjects() {
		this.chestnuts = [];
		this.statues = [];
		this.benches = [];
		this.minerals = [];
		this.shrubs = [];
		this.streetLamps = [];

		this.field = new Field();


		Promise.all([
			Store.get('sartre_bench_xp',{
				'name': 'sartreBench',
				'color': 0xcacaca
			}),
	
			Store.get('bench',{
				'name': 'bench',
				'color': 0xcacaca
			}),
	
			Store.get('chestnut',{
				'name': 'chestnut',
				'color': 0xcacaca
			}),
	
			Store.get('shrub',{
				'name': 'shrub',
				'color': 0xcacaca
			}),
	
			Store.get('stand',{
				'name': 'stand',
				'color': 0xcacaca
			}),
	
			Store.get('streetLamp',{
				'name': 'streetLamp',
				'color': 0xcacaca
			}),
	
			Store.get('statue',{
				'name': 'statue',
				'color': 0xcacaca
			}),
	
			Store.get('fountain',{
				'name': 'fountain',
				'color': 0xcacaca
			}),
	
			Store.get('mineral',{
				'name': 'mineral',
				'color': 0xcacaca
			}),
			this.field.load()
		])
		.then( data => {
			this.sartreBench = data[0];
	
			this.bench = data[1];
	
			this.chestnut = data[2];
	
			this.shrub = data[3];
	
			this.stand = data[4];
	
			this.street_lamp = data[5];
	
			this.statue = data[6];
	
			this.fountain = data[7];
	
			this.rock = data[8];

			this.add(this.field.mesh);

			this.zone0 = new Zone0(this.scene);

			this.zone1 = new Zone1(this.scene, {
				x: [
					882,
					1059
				],
				y: [
					541,
					674
				]
			}, this.controlsContainer, this.passes[2].params);

			this.zone2 = new Zone2(this.scene, {
				x: [
					1407,
					1640
				],
				y: [
					555,
					696
				]
			}, this.controlsContainer, this.passes[2].params);

			this.zone3 = new Zone3(this.scene, {
				x: [
					132,
					252
				],
				y: [
					553,
					677
				]
			}, this.controlsContainer, this.passes[2].params);

			this.zone4 = new Zone4(this.scene, {
				x: [
					459,
					552
				],
				y: [
					592,
					677
				]
			}, this.controlsContainer, this.passes[2].params);

			this.zones = [this.zone0, this.zone1, this.zone2, this.zone3, this.zone4];

			this.statues.push(this.statue);

			let totalBenches = 0,
				totalChestnuts = 0,
				totalMinerals = 0,
				totalShrubs = 0,
				totalStreetLamps = 0;

			for(let i = 0; i < this.zones.length; i++) {

				let curZone = this.zones[i];

				if(curZone.nbBenches)
					totalBenches += curZone.nbBenches;
				if(this.zones[i].nbMinerals)
					totalMinerals += curZone.nbMinerals;
				if(this.zones[i].nbShrubs)
					totalShrubs += curZone.nbShrubs;
				if(this.zones[i].nbStreetLamps)
					totalStreetLamps += curZone.nbStreetLamps;
				if(this.zones[i].nbChestnuts)
					totalChestnuts += curZone.nbChestnuts;
			}

			let promises = [];

			const gChestnuts = {
				name: 'chestnut',
				total: totalChestnuts,
				objects: this.chestnuts
			};

			const gBenches = {
				name: 'bench',
				total: totalBenches,
				objects: this.benches
			};

			const gMinerals = {
				name: 'mineral',
				total: totalMinerals,
				objects: this.minerals
			};

			const gShrubs = {
				name: 'shrub',
				total: totalShrubs,
				objects: this.shrubs
			};

			const gStreetLamps = {
				name: 'streetLamp',
				total: totalStreetLamps,
				objects: this.streetLamps
			};

			let gObjects = [gChestnuts, gBenches, gMinerals, gShrubs, gStreetLamps];


			for(let i = 0; i < gObjects.length; i++) {

				for(let j = 0; j < gObjects[i].total; j++) {
					let name = gObjects[i].name;
					if(name == 'chestnut') {
						promises.push(Store.get(name, {name: name + '-' + i, materialize: true})
						.then( obj => {
							gObjects[i].objects.push(obj);
						}));
					}
					else {
						promises.push(Store.get(name, {name: name + '-' + i})
						.then( obj => {
							gObjects[i].objects.push(obj);
						}));
					}
				}

			}

			Promise.all(promises).then(() => {				
				this.zone0.init(this.sartreBench);
				this.zone1.init(gChestnuts.objects, gBenches.objects, gMinerals.objects);
				this.zone2.init(this.stand, gChestnuts.objects, gStreetLamps.objects, gShrubs.objects);
				this.zone3.init(this.statue, gChestnuts.objects, gShrubs.objects);
				this.zone4.init(this.fountain, gBenches.objects, gStreetLamps.objects);

				for (let i = 0; i < this.zones.length; i++) {
					this.zones[i].addScene();
					this.zones[i].initTimeline();
				}

				//this.createLeaves();
				
				this.intro();

				if(Config.gui) {
					this.zone1.addToGUI(this.gui);
					this.zone2.addToGUI(this.gui);
					this.zone3.addToGUI(this.gui);
					this.zone4.addToGUI(this.gui);
				}
			});
			
		});

		this.particles = new Particles('particle', 500);
		this.particles.load()
		.then(() => {
			this.add(this.particles.mesh);
		});

		this.skybox = new Skybox('assets2d/skybox/');

		this.skybox.load()
		.then( texture => {
			this.scene.background = texture;
		});
		
	}

	intro() {
		let tl = new TimelineLite();
		tl.to(this.passes[1].params, 4, {
			boost: 1
		})
		.to(this.controls.pitchObject.rotation, 5, {
			x: .1,
			ease: Power1.easeInOut,
			onComplete: () => {
				this.controls.enabled = true;
			}
		})
		.add(() => {
			Emitter.emit('INTRO_END');
		}, '-=1.5');
	}

	// createLeaves() {
	// 	let numberLeaves = 4;

	// 	let texture = new THREE.TextureLoader().load( "assets2d/leaves.png" );
	// 	// texture.wrapS = THREE.RepeatWrapping;
	// 	// texture.wrapT = THREE.RepeatWrapping;
	// 	//texture.repeat.set( 4, 4 );

	// 	let geometry = new THREE.PlaneGeometry( 15, 15, 1);
	// 	let material = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, map: texture, transparent: true} );
	// 	let plane = new THREE.Mesh( geometry, material );
	// 	this.scene.add( plane );
	// 	plane.position.z = 11;
	// 	plane.position.y = 7;
	// 	console.log(plane);

	// 	this.leaf = new THREE.Object3D();

	// 	for(let i = 0; i < numberLeaves; i++) {
	// 		let leaf = plane.clone();
	// 		leaf.rotation.y = i * 45;

	// 		this.scene.add(leaf);
	// 		this.leaf.children.push(leaf);
	// 	}

	// }

	addEventListeners() {
		window.addEventListener('resize', this.onResize.bind(this));
		TweenMax.ticker.addEventListener('tick', this.render.bind(this));
		Emitter.on('ZONE_FOCUSED', this.startZoneAnimation.bind(this));

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
		if(this.INTERSECTED != null)
			this.INTERSECTED.playAnim();
	}

	/**
	 * @method
	 * @name render
	 * @description Renders/Draw the scene
	 */
	render() {

		//Particles 
		//this.particles.update();

		if(this.zones) {

			this.intersect = null;

			for (let i = 0; i < this.zones.length; i++) {
				let zone = this.zones[i];
				zone.update();
				let mouse = this.controls.mouse;

				if( mouse.x > window.innerWidth * zone.orientation.x[0] / 1920
					&& mouse.x < window.innerWidth * zone.orientation.x[1] / 1920
					&& mouse.y > window.innerHeight * zone.orientation.y[0] / 1440
					&& mouse.y < window.innerHeight * zone.orientation.y[1] / 1440
					&& !zone.animated ) {
					this.intersect = zone;
				}
			}
			if(this.intersect != null) {
				if(this.INTERSECTED == null) {
					this.intersect.startHoverAnimation();
					this.cursor.onMouseEnter();
				}
			}
			else {
				if(this.INTERSECTED != null && !this.INTERSECTED.animated)
					this.INTERSECTED.endHoverAnimation();
				
				this.cursor.onMouseLeave();
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