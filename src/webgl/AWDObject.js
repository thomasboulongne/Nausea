import 'three/examples/js/loaders/AWDLoader';
import 'three/examples/js/modifiers/TessellateModifier';
import 'three/examples/js/modifiers/ExplodeModifier';
import VertexShader from './shaders/objects/shader.vert';
import LoadingManager from './utils/LoadingManager';

class AWDObject {

	/**
	 * @constructor
	 */
	constructor(name, options) {
		this.name = name;
		this.options = options;
	}

	load() {

		let loader = new THREE.AWDLoader( LoadingManager );

		const options = {
			color : this.options.color ? this.options.color : "0xcacaca"
		};

		return new Promise(resolve => {
			loader.load( './assets3d/' + this.name + '.awd', function ( mesh ) {
				this.mesh = mesh;
				
				for (let i = 0; i < this.mesh.children.length; i++) {
					this.mesh.children[i].name = this.name;
				}

				this.geometry = this.mesh.children[0].geometry;
				
				if( this.options.materialize ) {
					
					this.geometryObj = new THREE.Geometry().fromBufferGeometry( this.geometry );

					this.modifyGeometry();

					this.createRandomAttributes();

					this.createMaterial();
				}
				else {
					// this.mesh.children[0].material.color = new THREE.Color( options.color );
					// this.mesh.children[0].material.transparent = true;

					this.material = new THREE.MeshPhongMaterial({
						color: this.options.color,
						lights: true,
						fog: true,
						transparent: true
					});
				}
				
				this.mesh = new THREE.Mesh(this.geometry, this.material);

				this.mesh.name = this.name;

				this.mesh.color = new THREE.Color( options.color );

				resolve('success');
			}.bind(this) );
		});
	}

	createMaterial()
	{
		let phongShader = THREE.ShaderLib.phong;
		let uniforms = THREE.UniformsUtils.clone(phongShader.uniforms);

		uniforms.time = { type: 'f', value: 0 };

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

	initTimeline () {
		this.animate = true;
		this.tweenTime = { time : 0};
		this.timeline = new TimelineMax();
		this.timeline.to(this.tweenTime, 20, {time: 2, ease: Expo.easeOut, onComplete: () => {
			this.animate = false;
		}});
		this.timeline.pause();
	}

	playTimeline () {
		this.timeline.play();
	}

	/**
	 * @method
	 * @name update
	 * @description Triggered on every TweenMax tick
	 */
	update() {
		if(this.material && this.options.materialize && this.animate) {

			//this.mesh.rotation.y += .001;
			this.material.uniforms.time.value = this.tweenTime.time;
		}
	}

}

export default AWDObject;