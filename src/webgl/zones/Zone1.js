import NumberUtils from '../utils/number-utils';

class Zone1 {

	/**
	 * @constructor
	 * param [objects] : array of object
	 * param scene : experience scene
	 */
	constructor(scene) {
		this.scene = scene;

		//properties to count how many objects to clone
		this.nbChestnuts = 1;
		this.nbBenches = 1;
		this.nbMinerals = 3;

		this.objects = [];
	}

	init(chestnuts, benches, minerals) {
		
		this.chestnut = {
			'name' : 'chestnut',
			'object' : chestnuts[0],
			'x' : 0,
			'y' : 0,
			'z' : 11.8,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 139,
			'rotz' : 0
		};

		this.bench = {
			'name' : 'bench',
			'object' : benches[0],
			'x' : -1.7,
			'y' : 0,
			'z' : 9.6,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 143,
			'rotz' : 0
		};

		this.mineral1 = {
			'name' : 'mineral1',
			'object' : minerals[0],
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
			'x' : 1.6,
			'y' : 0,
			'z' : 6.2,
			'scale' : 0.5,
			'rotx' : 0,
			'roty' : 175,
			'rotz' : 0
		};

		//Splice experience arrays
		chestnuts.splice(0,1);
		benches.splice(0,1);
		minerals.splice(0,3);

		this.objects.push(this.chestnut, this.bench, this.mineral1, this.mineral2, this.mineral3);

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

export default Zone1;