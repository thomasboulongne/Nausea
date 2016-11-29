//import NumberUtils from '../utils/number-utils';

class Field {

	/**
	 * @constructor
	 */
	constructor() {
	}

	load() {

		let img = new Image();

		return new Promise(resolve => {
			img.onload = () => {

				//get height data from img
				let data = this.dataFromImage(img);

				// plane
				let geometry = new THREE.PlaneGeometry(50, 50, 63, 63);

				let material = new THREE.MeshPhongMaterial( {
					color: 0x343434,
					wireframe: false,
					side: THREE.DoubleSide
				});

				geometry.computeFaceNormals();
				geometry.computeVertexNormals();
				this.mesh = new THREE.Mesh( geometry, material );

				this.mesh.position.y = -4;

				this.mesh.rotation.x = - Math.PI / 2;
				//this.mesh.rotation.z = NumberUtils.toRadians( 180 );

				//set height of vertices
				for ( let i = 0; i<this.mesh.geometry.vertices.length; i++ ) {
					this.mesh.geometry.vertices[i].z = data[i] * 8;
				}

				this.mesh.name = 'field';
				resolve('success');
			};

			// load img source
			img.src = 'assets2d/heightMap07.png';
		});

	}

	dataFromImage(image) {

		let scale = 100;

		let canvas = document.createElement( 'canvas' );
		canvas.width = image.width;
		canvas.height = image.height;
		let context = canvas.getContext( '2d' );

		let size = image.width * image.height;
		let data = new Float32Array( size );

		context.drawImage(image,0,0);

		for ( let i = 0; i < size; i ++ ) {
			data[i] = 0;
		}

		let imgd = context.getImageData(0, 0, image.width, image.height);
		let pix = imgd.data;

		let j = 0;
		for (let i = 0; i<pix.length; i +=4) {
			let all = pix[i]+pix[i+1]+pix[i+2];
			data[j++] = all/(12*scale);
		}
		return data;
	}


	/**
	 * @method
	 * @name update
	 * @description Triggered on every TweenMax tick
	 */
	update() {


	}

}

export default Field;