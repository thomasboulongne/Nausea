import TextureLoader from '../utils/TextureLoader';

class Skybox {
	constructor( texturePath ) {
		this.geometry = new THREE.CylinderGeometry( 30, 30, 100, 50, 1);
		this.texturePath = texturePath;
	}

	load() {
		return new Promise(resolve => {
			TextureLoader.load(
				this.texturePath,
				texture => {
					let material = new THREE.MeshBasicMaterial( {
						map: texture,
						side: THREE.DoubleSide,
						fog: false
					});

					this.skybox = new THREE.Mesh( this.geometry, material);
					this.mesh = this.skybox;
					resolve('success');
				}
			);
		});
	}
}

export default Skybox;