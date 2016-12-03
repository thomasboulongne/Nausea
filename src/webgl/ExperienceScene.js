import Wagner from '@superguigui/wagner';
import NoisePass from '@superguigui/wagner/src/passes/noise/noise';
import VignettePass from '@superguigui/wagner/src/passes/vignette/VignettePass';

import './utils/PointerLockControls';
import Config from './config';
import Dat from 'dat-gui';

import Field from './objects/Field';
//import Particles from './objects/Particles';
import Skybox from './objects/Skybox';
import AWDObject from './AWDObject';

import SoundManager from './sound/SoundManager';

import Lights from './Lights';

import WebglCursor from './misc/WebglCursor';

import Zone0 from './zones/Zone0';
import Zone1 from './zones/Zone1';
import Zone2 from './zones/Zone2';
import Zone3 from './zones/Zone3';
import Zone4 from './zones/Zone4';

import DataEmitter from './data/DataEmitter';

//import NumberUtils from './utils/number-utils';

class ExperienceScene {

	/**
	 * @constructor
	 */
	constructor(domElement) {
		if(Config.gui) this.gui = new Dat.GUI();

		this.domElement = domElement;

		this.cursor = new WebglCursor(this.domElement, 'ZONE_FOCUSED');

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.scene = new THREE.Scene();

		this.renderer = new THREE.WebGLRenderer({antialias: true});
		this.renderer.setSize(this.width, this.height);
		this.renderer.setClearColor(0xffffff);

		this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, .1, 10000 );

		this.scene.fog = new THREE.FogExp2( 0xffffff, 0.08 );
		if(Config.gui) this.gui.add(this.scene.fog, 'density', 0, 0.2).name('fog');

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

		let controlsPosition = {
			z: 0,
			y: 1,
			x: 0
		};

		this.controls = new THREE.PointerLockControls( this.camera, controlsPosition, this.center, 0.01 );
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
			}),
			new VignettePass({
				boost: 1,
				reduction: .4
			})
		];
	}

	setAmbiantSound() {
		this.soundAmbiant = SoundManager.load('ambiant.wav');
		this.soundExist = SoundManager.load('exist.wav');

		SoundManager.play(this.soundAmbiant);
	}

	createObjects() {
		this.chestnuts = [];
		this.statues = [];
		this.benches = [];
		this.minerals = [];
		this.shrubs = [];
		this.streetLamps = [];

		this.raycastMeshes = [];

		this.field = new Field();
		
		this.sartreBench = new AWDObject('sartre_bench_xp',{
			'name': 'sartreBench',
			'color': 0xcacaca,
			'materialize': false
		});

		this.bench = new AWDObject('bench',{
			'name': 'bench',
			'color': 0xcacaca,
			'materialize': true
		});

		this.chestnut = new AWDObject('chestnut',{
			'name': 'chestnut',
			'color': 0xcacaca,
			'materialize': true
		});

		this.shrub = new AWDObject('shrub',{
			'name': 'shrub',
			'color': 0xcacaca,
			'materialize': false
		});

		this.stand = new AWDObject('stand',{
			'name': 'stand',
			'color': 0xcacaca,
			'materialize': true
		});

		this.streetLamp = new AWDObject('street_lamp',{
			'name': 'streetLamp',
			'color': 0xcacaca,
			'materialize': false
		});

		this.statue = new AWDObject('statue',{
			'name': 'statue',
			'color': 0xcacaca,
			'materialize': true
		});

		this.fountain = new AWDObject('fountain',{
			'name': 'fountain',
			'color': 0xcacaca,
			'materialize': true
		});

		this.mineral = new AWDObject('rock',{
			'name': 'mineral',
			'color': 0xcacaca,
			'materialize': true
		});


		Promise.all([
			this.field.load(),
			this.sartreBench.load(),
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

			this.zone0 = new Zone0(this.scene);
			this.zone1 = new Zone1(this.scene);
			this.zone2 = new Zone2(this.scene);
			this.zone3 = new Zone3(this.scene);
			this.zone4 = new Zone4(this.scene);

			this.zones = [this.zone0, this.zone1, this.zone2, this.zone3, this.zone4];

			this.statues.push(this.statue);

			let totalBenches = 0,
				totalChestnuts = 0,
				totalMinerals = 0,
				totalShrubs = 0,
				totalStreetLamps = 0;

			for(let i = 0; i < this.zones.length; i++) {
				if(this.zones[i].nbBenches)
					totalBenches += this.zones[i].nbBenches;
				if(this.zones[i].nbMinerals)
					totalMinerals += this.zones[i].nbMinerals;
				if(this.zones[i].nbShrubs)
					totalShrubs += this.zones[i].nbShrubs;
				if(this.zones[i].nbStreetLamps)
					totalStreetLamps += this.zones[i].nbStreetLamps;
				if(this.zones[i].nbChestnuts)
					totalChestnuts += this.zones[i].nbChestnuts;
			}

			for(let i = 0; i < totalChestnuts; i++) {
				let name = 'chestnut-' + i;
				let chestnut = new AWDObject(name);
				chestnut.geometry = this.chestnut.geometry;
				chestnut.options = this.chestnut.options;
				chestnut.createMesh();
				this.chestnuts.push(chestnut);
			}

			for(let i = 0; i < totalBenches; i++) {
				let name = 'bench-' + i;
				let bench = new AWDObject(name);
				bench.geometry = this.bench.geometry;
				bench.options = this.bench.options;
				bench.createMesh();
				this.benches.push(bench);
			}	

			for( let i = 0; i < totalMinerals; i++ ) {
				let name = 'mineral-' + i;
				let mineral = new AWDObject(name);
				mineral.geometry = this.mineral.geometry;
				mineral.options = this.mineral.options;
				mineral.createMesh();
				this.minerals.push(mineral);
			}

			for( let i = 0; i < totalShrubs; i++ ) {
				let name = 'shrub-' + i;
				let shrub = new AWDObject(name);
				shrub.geometry = this.shrub.geometry;
				shrub.options = this.shrub.options;
				shrub.createMesh();
				this.shrubs.push(shrub);
			}

			for( let i = 0; i < totalStreetLamps; i++ ) {
				let name = 'streetLamp-' + i;
				let streetLamp = new AWDObject(name);
				streetLamp.geometry = this.streetLamp.geometry;
				streetLamp.options = this.streetLamp.options;
				streetLamp.createMesh();
				this.streetLamps.push(streetLamp);
			}

			this.sartreBench.createMesh(); 
			this.statue.createMesh();
			this.fountain.createMesh();
			this.stand.createMesh();

			this.zone0.init(this.sartreBench);
			this.zone1.init(this.chestnuts, this.benches, this.minerals);
			this.zone2.init(this.stand, this.chestnuts, this.streetLamps, this.shrubs);
			this.zone3.init(this.statue, this.chestnuts, this.shrubs);
			this.zone4.init(this.fountain, this.benches, this.streetLamps);

			for (let i = 0; i < this.zones.length; i++) {
				this.zones[i].addScene();
				this.zones[i].initAnim();
			}

			//this.createLeaves();

			if(Config.gui) {
				this.zone1.addToGUI(this.gui);
				this.zone2.addToGUI(this.gui);
				this.zone3.addToGUI(this.gui);
				this.zone4.addToGUI(this.gui);
			}
			
		});

		this.datas = new DataEmitter();

		this.add(this.datas.group);

		//this.particles = new Particles('particule05', 500);
		// this.particles.load()
		// .then(() => {
		// 	this.add(this.particles.mesh);
		// });

		this.skybox = new Skybox('assets2d/skybox/');

		this.skybox.load()
		.then( texture => {
			this.scene.background = texture;
		});
		
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
		window.addEventListener('keydown', this.onKeydown.bind(this));
	}

	toggleCamera() {
		this.controls.enabled = !this.controls.enabled;
	}

	addCanvasElement(domElt) {
		this.canvasElement = domElt;
	}

	/**
	 * @method
	 * @name render
	 * @description Renders/Draw the scene
	 */
	render() {

		//Particles 
		//this.particles.update();

		//Datas
		this.datas.update();

		if(this.zone1) this.zone1.update();
		if(this.zone2) this.zone2.update();
		if(this.zone3) this.zone3.update();
		if(this.zone4) this.zone4.update();

		this.rotation.set( this.controls.getPitch().rotation.x, this.controls.getObject().rotation.y, 0 );

		this.raycaster.ray.direction.copy( this.direction ).applyEuler( this.rotation );
		this.raycaster.ray.origin.copy( this.controls.getObject().position );

		//let intersects = this.raycaster.intersectObjects( this.raycastMeshes, true );

		// if ( intersects.length > 0 ) {
		// 	// The raycast encouters an object
		// 	let objName = intersects[0].object.name;
		// 	console.log('Casted object: ', intersects[0].object.name);
		// 	if(objName == 'statue001' || objName == 'tree-little' || objName == 'tree-big') {
				
		// 	}
		// } 
		// else {
		// 	this.INTERSECTED = null;
		// }


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

	onKeydown(ev) {
		if(ev.keyCode === 65) {
			// SoundManager.play(this.soundExist);
			this.zone1.playAnim();
		}
		if(ev.keyCode === 90) {
			// SoundManager.play(this.soundExist);
			this.zone2.playAnim();
		}
		if(ev.keyCode === 69) {
			// SoundManager.play(this.soundExist);
			this.zone3.playAnim();
		}
		if(ev.keyCode === 82) {
			// SoundManager.play(this.soundExist);
			this.zone4.playAnim();
		}
			
	}
}

export default ExperienceScene;