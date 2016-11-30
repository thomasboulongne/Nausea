import NumberUtils from '../utils/number-utils';

class Zone2 {

	/**
	 * @constructor
	 * param [objects] : array of object
	 * param scene : experience scene
	 */
	constructor(stand, streetLamps, shrubs, scene) {
		this.scene = scene;

		//properties to count how many objects to clone
		this.nbStreetLamps = 4;
		this.nbShrubs = 2;

		this.objects = [];

		this.stand = {
			'name' : 'stand',
			'object' : stand,
			'x' : -10.3,
			'y' : 0,
			'z' : -0.4,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 326,
			'rotz' : 0
		};

		this.streetLamp1 = {
			'name' : 'streetLamp1',
			'object' : streetLamps[0],
			'x' : -13.6,
			'y' : 0,
			'z' : 7,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.streetLamp2 = {
			'name' : 'streetLamp2',
			'object' : streetLamps[1],
			'x' : -13.6,
			'y' : 0,
			'z' : -4.8,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.streetLamp3 = {
			'name' : 'streetLamp3',
			'object' : streetLamps[2],
			'x' : -11.4,
			'y' : 0,
			'z' : 7,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.streetLamp4 = {
			'name' : 'streetLamp4',
			'object' : streetLamps[3],
			'x' : -15.8,
			'y' : 0,
			'z' : 7,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.shrub1 = {
			'name' : 'shrub1',
			'object' : shrubs[0],
			'x' : -14.7,
			'y' : 0,
			'z' : 4,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.shrub2 = {
			'name' : 'shrub2',
			'object' : shrubs[1],
			'x' : -14.7,
			'y' : 0,
			'z' : -5.9,
			'scale' : 0.7,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};


		//Splice experience arrays
		shrubs.splice(0,2);
		streetLamps.splice(0,3);

		this.objects.push(this.stand, this.shrub1, this.shrub2, this.streetLamp1, this.streetLamp2, this.streetLamp3, this.streetLamp4);
	}

	addToGUI(gui) {

		for(let i = 0; i < this.objects.length; i++) {
			let folder = gui.addFolder(this.objects[i].name);

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
			console.log(this.objects[i])
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

export default Zone2;