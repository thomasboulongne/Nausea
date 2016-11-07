import Wagner from '@superguigui/wagner';
import NoisePass from '@superguigui/wagner/src/passes/noise/noise';
import './utils/PointerLockControls';
import Field from './objects/Field';

class Scene {

	/**
	 * @constructor
	 */
	constructor(domElement) {
		this.domElement = domElement;

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.scene = new THREE.Scene();

		this.renderer = new THREE.WebGLRenderer({antialias: true});
		this.renderer.setSize(this.width, this.height);
		this.renderer.setClearColor(0xcccccc);
		this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );

		this.setControls();

		this.setLights();

		this.setRaycast();

		this.setComposer();

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
			z: 100,
			y: 30,
			x: 45
		}, this.center
		);
		this.add( this.controls.getObject() );
	}

	setLights() {

		this.light = new THREE.DirectionalLight( 0xffffff, 2 );
		this.light.position.set( 1500, 850, 1500 );

		this.light.castShadow = true;
		this.add( this.light );
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

	createObjects() {
		this.field = new Field();
		this.field.load()
		.then(() => {
			this.add(this.field.mesh);
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

		this.rotation.set( this.controls.getPitch().rotation.x, this.controls.getObject().rotation.y, 0 );

		this.raycaster.ray.direction.copy( this.direction ).applyEuler( this.rotation );
		this.raycaster.ray.origin.copy( this.controls.getObject().position );

		let intersects = this.raycaster.intersectObjects( this.scene.children );

		if ( intersects.length > 0 ) {
			// The raycast encouters an object
			console.log('Casted object: ', intersects[0]);
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