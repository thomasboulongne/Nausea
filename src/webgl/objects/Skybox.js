// import TextureLoader from '../utils/TextureLoader';

class Skybox {
	constructor( texturePath ) {
		this.texturePath = texturePath;
	}

	load() {
		return new Promise(resolve => {
			let loader = new THREE.CubeTextureLoader();

			loader.load( [
				this.texturePath + 'px.jpg', this.texturePath + 'nx.jpg',
				this.texturePath + 'py.jpg', this.texturePath + 'ny.jpg',
				this.texturePath + 'pz.jpg', this.texturePath + 'nz.jpg'
			], texture => {

				texture.mapping = THREE.CubeRefractionMapping;

				resolve(texture);
			});
		});
	}
}

export default Skybox;