import NumberUtils from '../utils/number-utils';

class Zone {

	/**
	 * @constructor
	 * param [objects] : array of object
	 * param scene : experience scene
	 */
	constructor(scene) {
		this.scene = scene;

		this.objects = [];
	}

	init() {
		this.setMeshNames();
	}

	setMeshNames () {
		for( let i = 0;  i < this.objects.length; i++ ) {
			this.objects[i].object.mesh.name = this.objects[i].name;
		}
	}

	addToGUI(gui) {

		for(let i = 0; i < this.objects.length; i++) {

			let object = this.objects[i].object.mesh;

			//gui.remember(object);

			let folder = gui.addFolder(object.name);

			folder.add(object.position, 'x', -50, 50).name('posx');
			folder.add(object.position, 'y', -10, 10).name('posy');
			folder.add(object.position, 'z', -50, 50).name('posz');

			folder.add(object.scale, 'x', 0, 2).name('scale').onChange((scale) => {
				object.scale.x = object.scale.y = object.scale.z = scale;
			});

			let params = {
				'x' : NumberUtils.toDegree(object.rotation.x),
				'y' : NumberUtils.toDegree(object.rotation.y),
				'z' : NumberUtils.toDegree(object.rotation.z)
			}

			folder.add(params, 'x', 0, 360).name('rotationx').onChange((degValue) => {
				let angle = NumberUtils.toRadians(degValue);
				object.rotation.x = angle;
			});
			folder.add(params, 'y', 0, 360).name('rotationy').onChange((degValue) => {
				let angle = NumberUtils.toRadians(degValue);
				object.rotation.y = angle;
			});
			folder.add(params, 'z', 0, 360).name('rotationz').onChange((degValue) => {
				let angle = NumberUtils.toRadians(degValue);
				object.rotation.z = angle;
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

export default Zone;