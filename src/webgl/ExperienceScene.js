import Wagner from '@superguigui/wagner';
import NoisePass from '@superguigui/wagner/src/passes/noise/noise';

import './utils/PointerLockControls';
import Config from './config';
import Dat from 'dat-gui';

import Field from './objects/Field';
//import Particles from './objects/Particles';
import AWDObject from './AWDObject';

import SoundManager from './sound/SoundManager';
import AnimationManager from './animations/AnimationManager';

import Lights from './Lights';

import Zone1 from './zones/Zone1';
import Zone2 from './zones/Zone2';
import Zone3 from './zones/Zone3';
import Zone4 from './zones/Zone4';

import NumberUtils from './utils/number-utils';

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
		this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, .1, 10000 );

		this.scene.fog = new THREE.FogExp2( 0xffffff, 0.1 );

		this.setControls();

		this.setLights();

		this.setRaycast();

		this.setComposer();

		this.setAmbiantSound();

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

		if(Config.controls) {
			this.controls = new THREE.PointerLockControls( this.camera, controlsPosition, this.center, 0.002 );
			this.add( this.controls.getObject() );
		}
		else {
			this.camera.position.y = 1;
			this.camera.rotation.y = NumberUtils.toRadians(180);
			let folder = this.gui.addFolder('camera');
			let params = {
				degx : 0,
				degy : 0,
				degz : 0
			};

			folder.add(params, 'degy', 90, 270).name('rotationy').onChange((degValue) => {
				let angle = NumberUtils.toRadians(degValue);
				this.camera.rotation.y = angle;
			});
			//folder.add(this.objects[i].object.mesh.position, 'x', -50, 50).name('posx');
		}
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
		this.soundAmbiant = SoundManager.load('ambiant.wav');
		this.soundExist = SoundManager.load('exist.wav');

		SoundManager.play(this.soundAmbiant);
	}

	createObjects() {
		//this.objects = [];
		this.chestnuts = [];
		this.statues = [];
		this.benches = [];
		this.minerals = [];
		this.shrubs = [];
		this.streetLamps = [];

		this.raycastMeshes = [];

		this.field = new Field();
		
		this.bench = new AWDObject('bench',{
			'name': 'bench',
			'color': 0xcacaca,
			'materialize': false
		});

		this.chestnut = new AWDObject('chestnut',{
			'name': 'chestnut',
			'color': 0xcacaca,
			'materialize': false
		});

		this.shrub = new AWDObject('shrub',{
			'name': 'shrub',
			'color': 0xcacaca,
			'materialize': false
		});

		this.stand = new AWDObject('stand',{
			'name': 'stand',
			'color': 0xcacaca,
			'materialize': false
		});

		this.streetLamp = new AWDObject('street_lamp',{
			'name': 'streetLamp',
			'color': 0xcacaca,
			'materialize': false
		});

		this.statue = new AWDObject('statue',{
			'name': 'statue',
			'color': 0xcacaca,
			'materialize': false
		});

		this.fountain = new AWDObject('fountain',{
			'name': 'fountain',
			'color': 0xcacaca,
			'materialize': false
		});

		this.mineral = new AWDObject('rock',{
			'name': 'mineral',
			'color': 0xcacaca,
			'materialize': false
		});


		Promise.all([
			this.field.load(),
			this.bench.load(),
			this.chestnut.load(),
			this.shrub.load(),
			this.stand.load(),
			this.streetLamp.load(),
			this.statue.load(),
			this.fountain.load(),
			this.mineral.load()
		])
		.then(() => {
			this.add(this.field.mesh);

			this.zone1 = new Zone1(this.scene);
			this.zone2 = new Zone2(this.scene);
			this.zone3 = new Zone3(this.scene);
			this.zone4 = new Zone4(this.scene);

			this.zones = [this.zone1, this.zone2, this.zone3, this.zone4];

			this.statues.push(this.statue);
			this.chestnuts.push(this.chestnut);

			let totalBenches = 0,
				totalMinerals = 0,
				totalShrubs = 0,
				totalStreetLamps = 0;

			for(let i = 0; i < this.zones.length; i++) {
				console.log(this.zones[i]);
				if(this.zones[i].nbBenches)
					totalBenches += this.zones[i].nbBenches;
				if(this.zones[i].nbMinerals)
					totalMinerals += this.zones[i].nbMinerals;
				if(this.zones[i].nbShrubs)
					totalShrubs += this.zones[i].nbShrubs;
				if(this.zones[i].nbStreetLamps)
					totalStreetLamps += this.zones[i].nbStreetLamps;
			}

			for(let i = 0; i < totalBenches; i++) {
				let bench = Object.assign({}, this.bench);
				bench.mesh = bench.mesh.clone();
				this.benches.push(bench);
			}

			for( let i = 0; i < totalMinerals; i++ ) {
				let mineral = Object.assign({}, this.mineral);
				mineral.mesh = mineral.mesh.clone();
				this.minerals.push(mineral);
			}

			for( let i = 0; i < totalShrubs; i++ ) {
				let shrub = Object.assign({}, this.shrub);
				shrub.mesh = shrub.mesh.clone();
				this.shrubs.push(shrub);
			}

			for( let i = 0; i < totalStreetLamps; i++ ) {
				let streetLamp = Object.assign({}, this.streetLamp);
				streetLamp.mesh = streetLamp.mesh.clone();
				this.streetLamps.push(streetLamp);
			}


			// this.objects.push(this.treeBig);
			// this.raycastMeshes.push(this.treeBig.mesh);
			// this.add(this.treeBig.mesh);

			// this.objects.push(this.statue);
			// this.raycastMeshes.push(this.statue.mesh);
			// this.add(this.statue.mesh);

			// this.objects.push(this.shrub);
			// this.raycastMeshes.push(this.shrub.mesh);
			// this.add(this.shrub.mesh);

			// this.objects.push(this.rock);
			// this.add(this.rock.mesh);

			this.zone1.init(this.chestnuts, this.benches, this.minerals);
			this.zone1.addScene();

			this.zone2.init(this.stand, this.streetLamps, this.shrubs);
			this.zone2.addScene();

			this.zone3.init(this.statue, this.shrubs);
			this.zone3.addScene();

			this.zone4.init(this.fountain, this.benches, this.streetLamps);
			this.zone4.addScene();

			if(Config.gui) {
				this.zone2.addToGUI(this.gui);
				this.zone3.addToGUI(this.gui);
				this.zone4.addToGUI(this.gui);
			}

			//this.animationManager.initScene1([this.treeBig, this.statue, this.shrub]);
		});

		// this.particles = new Particles('particleNoborder', 500);
		// this.particles.load()
		// .then(() => {
		//  this.add(this.particles.mesh);
		// });
		
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

		// for(let i = 0; i < this.objects.length; i++) {
		// 	this.objects[i].update();
		// }
		//Particles 
		//this.particles.update();

		if(Config.controls) {
			this.rotation.set( this.controls.getPitch().rotation.x, this.controls.getObject().rotation.y, 0 );

			this.raycaster.ray.direction.copy( this.direction ).applyEuler( this.rotation );
			this.raycaster.ray.origin.copy( this.controls.getObject().position );

			let intersects = this.raycaster.intersectObjects( this.raycastMeshes, true );

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

	onKeydown(ev) {
		if(ev.keyCode === 73) {
			// SoundManager.play(this.soundExist);
			// this.animationManager.initScene1([this.treeBig, this.statue, this.shrub]);
			this.toggleCamera();
		}
		if(ev.keyCode === 32) {
			this.animationManager.animateScene1();
		}
			
	}
}

export default ExperienceScene;