import NumberUtils from '../utils/number-utils';

class Zone3 {

	/**
	 * @constructor
	 * param [objects] : array of object
	 * param scene : experience scene
	 */
	constructor(scene) {
		this.scene = scene;

		//properties to count how many objects to clone
		this.nbShrubs = 3;

		this.objects = [];
	}

	init(statue, shrubs) {

		this.statue = {
			'name' : 'statue',
			'object' : statue,
			'x' : 11,
			'y' : 0,
			'z' : -1.5,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 32,
			'rotz' : 0
		};

		this.shrub1 = {
			'name' : 'shrub1-z3',
			'object' : shrubs[0],
			'x' : 14,
			'y' : 0,
			'z' : 0.7,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.shrub2 = {
			'name' : 'shrub2-z3',
			'object' : shrubs[1],
			'x' : 15,
			'y' : 0,
			'z' : -3.7,
			'scale' : 1,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		this.shrub3 = {
			'name' : 'shrub3-z3',
			'object' : shrubs[2],
			'x' : 13,
			'y' : 0,
			'z' : -1.5,
			'scale' : 0.5,
			'rotx' : 0,
			'roty' : 0,
			'rotz' : 0
		};

		//Splice experience arrays
		shrubs.splice(0, this.nbShrubs);

		this.objects.push(this.statue, this.shrub1, this.shrub2, this.shrub3);
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

export default Zone3;