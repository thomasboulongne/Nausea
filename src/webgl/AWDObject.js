import 'three/examples/js/loaders/AWDLoader';
import 'three/examples/js/modifiers/TessellateModifier';
import 'three/examples/js/modifiers/ExplodeModifier';
import VertexShader from './shaders/objects/shader.vert';

import LoadingManager from './utils/LoadingManager';
//import AWDLoader from './utils/AWDLoader';

class AWDObject {

	/**
	 * @constructor
	 */
	constructor(model, options) {
		if( !options ) options = {};
		this.model = model;
		this.name = options.name;
		this.options = options;
	}

	load() {

		if( !this.options.geometry ) {

			this.options = {
				color : this.options.color ? this.options.color : "0xcacaca",
				materialize : this.options.materialize ? this.options.materialize : false
			};

			let loader = new THREE.AWDLoader( LoadingManager );

			return new Promise(resolve => {
				loader.load( './assets3d/' + this.model + '.awd', function ( mesh ) {
					this.mesh = mesh;
					
					for (let i = 0; i < this.mesh.children.length; i++) {
						this.mesh.children[i].name = this.name;
					}

					this.geometry = this.mesh.children[0].geometry;

					this.createMesh();
					
					resolve('success');
				}.bind(this) );
			});
		}
		else {
			return new Promise( resolve => {

				this.options.materialize = this.options.options.materialize;
				this.options.color = this.options.options.color;
				this.geometry = this.options.geometry;
				this.createMesh();

				resolve('success');
			});
		}
	}

	createMesh() {

		if( this.options.materialize ) {
					
			this.geometryObj = new THREE.Geometry().fromBufferGeometry( this.geometry );

			this.modifyGeometry();

			this.createRandomAttributes();

			this.createMaterial();
		}
		else {

			this.material = new THREE.MeshPhongMaterial({
				color: this.options.color,
				lights: true,
				fog: true,
				transparent: true
			});
		}
		
		this.mesh = new THREE.Mesh(this.geometry, this.material);

		this.mesh.name = this.name;

	}

	createMaterial() {

		let phongShader = THREE.ShaderLib.phong;
		let uniforms = THREE.UniformsUtils.clone(phongShader.uniforms);

		uniforms.type = 'MeshPhongMaterial';
		uniforms.time = { type: 'f', value: 0 };
		uniforms.diffuse.value = new THREE.Color( this.options.color );

		// Create our vertex/fragment shaders
		this.material = new THREE.ShaderMaterial({
			vertexShader: VertexShader,
			fragmentShader: phongShader.fragmentShader,
			uniforms: uniforms,
			lights:true,
			fog: true,
			transparent: true
		});
		
	}

	createRandomAttributes() {

		let values = [];
		let delais = [];

		let random = Math.random();
		let randomDelai = Math.random();
		
		for(let v = 0, j = 0; v < this.geometry.attributes.position.count; v++) {
			values.push(random * 5);
			delais.push(randomDelai);
			j++;
			if(j > 2)
			{
				j = 0;
				random = Math.random();
				randomDelai = Math.random();
			}
		}

		let typedArray = Float32Array.from(values);
		let typedArray2 = Float32Array.from(delais);

		this.geometry.addAttribute( 'random', new THREE.BufferAttribute( typedArray, 1 ) );
		this.geometry.addAttribute( 'delai', new THREE.BufferAttribute( typedArray2, 1 ) );
	}

	modifyGeometry() {
		let tessellateModifier = new THREE.TessellateModifier( 8 );
		for ( let i = 0; i < 6; i ++ ) {
			tessellateModifier.modify( this.geometryObj );
		}
		let explodeModifier = new THREE.ExplodeModifier();
		explodeModifier.modify( this.geometryObj );
		let numFaces = this.geometryObj.faces.length;

		this.geometry = new THREE.BufferGeometry().fromGeometry( this.geometryObj );

		let displacement = new Float32Array( numFaces * 3 * 3 );

		for ( let f = 0; f < numFaces; f ++ ) {
			let index = 9 * f;
			let d = 10 * ( 0.5 - Math.random() );
			for ( let i = 0; i < 3; i ++ ) {
				displacement[ index + ( 3 * i )     ] = d;
				displacement[ index + ( 3 * i ) + 1 ] = d;
				displacement[ index + ( 3 * i ) + 2 ] = d;
			}
		}

		this.geometry.addAttribute( 'displacement', new THREE.BufferAttribute( displacement, 3 ) );
	}

}

export default AWDObject;