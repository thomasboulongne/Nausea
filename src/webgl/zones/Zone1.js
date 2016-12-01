import Zone from './Zone';

class Zone1 extends Zone {

	/**
	 * @constructor
	 * param [objects] : array of object
	 * param scene : experience scene
	 */
	constructor(scene) {
		super(scene);
		//properties to count how many objects to clone
		this.nbChestnuts = 1;
		this.nbBenches = 1;
		this.nbMinerals = 3;

	}

	init(chestnuts, benches, minerals) {
		
		this.chestnut = {
			'name' : 'chestnut1-z1',
			'object' : chestnuts[0],
			'rotate' : true,
			'x' : 0,
			'y' : 0,
			'z' : 12,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 139,
			'rotz' : 0
		};

		this.bench = {
			'name' : 'bench',
			'object' : benches[0],
			'rotate' : false,
			'x' : -3,
			'y' : 0.15,
			'z' : 10.9,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 130,
			'rotz' : 0
		};

		this.mineral1 = {
			'name' : 'mineral1',
			'object' : minerals[0],
			'rotate' : false,
			'x' : 2.5,
			'y' : 0,
			'z' : 8,
			'scale' : 1.4,
			'rotx' : 0,
			'roty' : 238,
			'rotz' : 0
		};

		this.mineral2 = {
			'name' : 'mineral2',
			'object' : minerals[1],
			'rotate' : false,
			'x' : 2,
			'y' : 0,
			'z' : 9.6,
			'scale' : 0.5,
			'rotx' : 322,
			'roty' : 75,
			'rotz' : 258
		};

		this.mineral3 = {
			'name' : 'mineral3',
			'object' : minerals[2],
			'rotate' : false,
			'x' : 1.6,
			'y' : 0,
			'z' : 6.2,
			'scale' : 0.5,
			'rotx' : 0,
			'roty' : 175,
			'rotz' : 0
		};

		//Splice experience arrays
		chestnuts.splice(0, this.nbChestnuts);
		benches.splice(0, this.nbBenches);
		minerals.splice(0, this.nbMinerals);

		this.objects.push(this.chestnut, this.bench, this.mineral1, this.mineral2, this.mineral3);

		console.log(this.objects)

		super.init();

		this.initAnim();
		this.playAnim();

	}

	setMeshNames () {
		super.setMeshNames();
	}

	addToGUI(gui) {
		super.addToGUI(gui);
	}

	/**
	 * @addScene
	 */
	addScene() {
		super.addScene();
	}

	initAnim() {
		super.initAnim(); 

	}

	playAnim() {
		super.playAnim(); 
	}

	/**
	 * @update
	 */
	update() {
		//permanant rotation
		for(let i = 0; i < this.objects.length; i++) {
			if(this.objects[i].object.options.materialize && this.objects[i].rotate) {
				//this.objects[i].object.mesh.rotation.y += 0.01;
			}
		}

		if(this.animate) {
			for(let i = 0; i < this.objects.length; i++) {
				this.objects[i].object.material.uniforms.time.value = this.tweenTime.time;
			}
		}
	}

}

export default Zone1;