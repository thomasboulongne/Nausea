import Wagner from '@superguigui/wagner';
import NoisePass from '@superguigui/wagner/src/passes/noise/noise';

import './utils/PointerLockControls';
import Config from './config';
import Dat from 'dat-gui';

import Field from './objects/Field';
import Particles from './objects/Particles';
import Skybox from './objects/Skybox';
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
			})
		];
	}

	setAmbiantSound() {
		this.soundAmbiant = SoundManager.load('ambiant.wav');
		this.soundExist = SoundManager.load('exist.wav');

		SoundManager.play(this.soundAmbiant);
	}

	createObjects() {
		this.objects = [];
		this.raycastMeshes = [];

		this.field = new Field();
		
		this.bench = new AWDObject('bench',{
			'name': 'bench',
			'x': 0,
			'y': 0,
			'z': 0,
			'color': 0xcacaca,
			'materialize': false
		});

		this.treeBig = new AWDObject('chestnut_trunk',{
			'name': 'treeBig',
			'x': 4,
			'y': 0,
			'z': 6.2,
			'color': 0xcacaca,
			'materialize': true
		});

		this.treeLittle = new AWDObject('tree-little',{
			'name': 'treeLittle',
			'x': 7.3,
			'y': 0,
			'z': 6.2,
			'color': 0xcacaca,
			'materialize': false
		});

		this.statue = new AWDObject('statue001',{
			'name': 'statue',
			'x': 5,
			'y': 2.5,
			'z': 5,
			'color': 0xcacaca,
			'materialize': true
		});

		this.rock = new AWDObject('rock',{
			'name': 'rock',
			'x': 3,
			'y': 0,
			'z': 8,
			'color': 0xcacaca,
			'materialize': false
		});


		Promise.all([
			this.field.load(),
			this.bench.load(),
			this.treeBig.load(),
			this.treeLittle.load(),
			this.statue.load(),
			this.rock.load()
		])
		.then(() => {
			this.add(this.field.mesh);

			this.objects.push(this.bench);
			this.add(this.bench.mesh);

			this.objects.push(this.treeBig);
			this.raycastMeshes.push(this.treeBig.mesh);
			this.add(this.treeBig.mesh);

			this.objects.push(this.statue);
			this.raycastMeshes.push(this.statue.mesh);
			this.add(this.statue.mesh);

			this.objects.push(this.treeLittle);
			this.raycastMeshes.push(this.treeLittle.mesh);
			this.add(this.treeLittle.mesh);

			this.objects.push(this.rock);
			this.add(this.rock.mesh);

			if(Config.gui) {
				this.treeBig.addToGUI(this.gui, 'bigTree');
				this.statue.addToGUI(this.gui, 'statue');
				this.treeLittle.addToGUI(this.gui, 'littleTree');
				this.rock.addToGUI(this.gui, 'rock')
			}

			this.animationManager.initScene1(this.treeBig, this.statue, this.treeLittle);
		});

		this.rock.load()
		.then(() => {
			this.objects.push(this.rock);
			this.raycastMeshes.push(this.rock.mesh);
			this.add(this.rock.mesh);
			if(Config.gui) this.rock.addToGUI(this.gui, 'rock');
		});

		this.particles = new Particles('particleNoborder', 500);
		this.particles.load()
		.then(() => {
			this.add(this.particles.mesh);
		});

		let skybox = new Skybox('assets2d/skybox/');

		skybox.load()
		.then( texture => {
			this.scene.background = texture;
		});
		
	}

	addEventListeners() {
		window.addEventListener('resize', this.onResize.bind(this));
		TweenMax.ticker.addEventListener('tick', this.render.bind(this));
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

		for(let i = 0; i < this.objects.length; i++) {
			this.objects[i].update();
		}
		//Particles 
		this.particles.update();

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
		if(ev.keyCode === 73) {
			this.soundManager.play(this.soundExist);
			for(let i = 0; i < this.objects.length; i++) {
				this.objects[i].initTimeline();
			}
			this.animationManager.initScene1(this.treeBig, this.statue, this.treeLittle);
		}
		if(ev.keyCode === 32) {
			for(let i = 0; i < this.objects.length; i++) {
				this.objects[i].playTimeline();
			}
			this.animationManager.animateScene1();
		}
			
	}
}

export default ExperienceScene;