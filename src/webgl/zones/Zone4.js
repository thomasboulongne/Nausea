import NumberUtils from '../utils/number-utils';

class Zone4 {

	/**
	 * @constructor
	 * param [objects] : array of object
	 * param scene : experience scene
	 */
	constructor(scene) {
		this.scene = scene;

		//properties to count how many objects to clone
		this.nbBenches = 4;
		this.nbStreetLamps = 4;

		this.objects = [];
	}

	init(fountain, benches, streetLamps) {

		this.fountain = {
			'name' : 'fountain',
			'object' : fountain,
			'x' : 10,
			'y' : 0,
			'z' : 6.2,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.bench1 = {
			'name' : 'bench1-z4',
			'object' : benches[0],
			'x' : 12,
			'y' : 0,
			'z' : 3,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.bench2 = {
			'name' : 'bench2-z4',
			'object' : benches[1],
			'x' : 12,
			'y' : 0,
			'z' : 4,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.bench3 = {
			'name' : 'bench3-z4',
			'object' : benches[2],
			'x' : 12,
			'y' : 0,
			'z' : 5,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.bench4 = {
			'name' : 'bench4-z4',
			'object' : benches[3],
			'x' : 12,
			'y' : 0,
			'z' : 6,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.streetLamp1 = {
			'name' : 'streetLamp1-z4',
			'object' : streetLamps[0],
			'x' : 10,
			'y' : 0,
			'z' : 10,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.streetLamp2 = {
			'name' : 'streetLamp2-z4',
			'object' : streetLamps[1],
			'x' : 10,
			'y' : 0,
			'z' : 3,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.streetLamp3 = {
			'name' : 'streetLamp3-z4',
			'object' : streetLamps[2],
			'x' : 14,
			'y' : 0,
			'z' : 6,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.streetLamp4 = {
			'name' : 'streetLamp4-z4',
			'object' : streetLamps[3],
			'x' : 6,
			'y' : 0,
			'z' : 8.5,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		//Splice experience arrays
		benches.splice(0,this.nbBenches);
		streetLamps.splice(0, this.nbStreetLamps)

		this.objects.push(this.fountain, this.bench1, this.bench2, this.bench3, this.bench4, this.streetLamp1, this.streetLamp2, this.streetLamp3, this.streetLamp4);
	}

	addToGUI(gui) {

		for(let i = 0; i < this.objects.length; i++) {
			let folder = gui.addFolder(this.objects[i].name);
			console.log(this.objects[i])

			folder.add(this.objects[i].object.mesh.position, 'x', -50, 50).name('posx');
			folder.add(this.objects[i].object.mesh.position, 'y', -10, 10).name('posy');
			folder.add(this.objects[i].object.mesh.position, 'z', -50, 50).name('posz');

			folder.add(this.objects[i].object.mesh.scale, 'x', 0, 2).name('scale').onChange((scale) => {
				this.objects[i].object.mesh.scale.x = this.objects[i].object.mesh.scale.y = this.objects[i].object.mesh.scale.z = scale;
			});

			let params = {
				degx : 0,
				degy : 0,
				degz : 0
			};

			folder.add(params, 'degx', 0, 360).name('rotationx').onChange((degValue) => {
				let angle = NumberUtils.toRadians(degValue);
				this.objects[i].object.mesh.rotation.x = angle;
			});
			folder.add(params, 'degy', 0, 360).name('rotationy').onChange((degValue) => {
				let angle = NumberUtils.toRadians(degValue);
				this.objects[i].object.mesh.rotation.y = angle;
			});
			folder.add(params, 'degz', 0, 360).name('rotationz').onChange((degValue) => {
				let angle = NumberUtils.toRadians(degValue);
				this.objects[i].object.mesh.rotation.z = angle;
			});
		}
	}

	/**
	 * @addScene
	 */
	addScene() {
		for ( let i = 0; i < this.objects.length; i++) {
			this.scene.add(this.objects[i].object.mesh);
			this.objects[i].object.mesh.position.set(this.objects[i].x, this.objects[i].y, this.objects[i].z);
			this.objects[i].object.mesh.rotation.set(NumberUtils.toRadians(this.objects[i].rotx), NumberUtils.toRadians(this.objects[i].roty), NumberUtils.toRadians(this.objects[i].rotz));
			this.objects[i].object.mesh.scale.set(this.objects[i].scale, this.objects[i].scale, this.objects[i].scale);

		}
	}

	/**
	 * @update
	 */
	update() {

	}

}

export default Zone4;