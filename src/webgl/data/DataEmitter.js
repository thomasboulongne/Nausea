class DataEmitter {

	/**
	 * @constructor
	 */
	constructor() {
		this.group = new THREE.Group();

		this.boxSide = 1;
		this.maxParticles = 100;
		this.particlesData = [];

		this.addHelper();
		this.addParticles();

	}

	addHelper() {
		this.helper = new THREE.BoxHelper( new THREE.Mesh( new THREE.BoxGeometry( this.boxSide, this.boxSide, this.boxSide ) ) );
		this.helper.material.color.setHex( 0xFF0000 );
		this.helper.material.blending = THREE.AdditiveBlending;
		this.helper.material.transparent = true;
		this.helper.position.z = 3;
		this.helper.position.y = 0.5;
		this.group.add( this.helper );
	}

	addParticles() {

		this.segments = this.maxParticles * this.maxParticles;
		this.positions = new Float32Array( this.segments * 3 );
		this.colors = new Float32Array( this.segments * 3 );

		this.pMaterial = new THREE.PointsMaterial( {
			color: 0xFFFFFF,
			size: 3,
			blending: THREE.AdditiveBlending,
			transparent: true,
			sizeAttenuation: false
		} );

		this.particles = new THREE.BufferGeometry();
		this.particlePositions = new Float32Array( this.maxParticles * 3 );

		for ( let i = 0; i < this.maxParticles; i++ ) {
			let x = Math.random() * this.boxSide - this.boxSide / 2;
			let y = Math.random() * this.boxSide - this.boxSide / 2;
			let z = Math.random() * this.boxSide - this.boxSide / 2;
			this.particlePositions[ i * 3     ] = x;
			this.particlePositions[ i * 3 + 1 ] = y;
			this.particlePositions[ i * 3 + 2 ] = z;
			// add it to the geometry
			this.particlesData.push( {
				velocity: new THREE.Vector3( -1 + Math.random() * 2, -1 + Math.random() * 2,  -1 + Math.random() * 2 ),
				numConnections: 0
			} );
		}

		this.particles.setDrawRange( 0, this.maxParticles );
		this.particles.addAttribute( 'position', new THREE.BufferAttribute( this.particlePositions, 3 ).setDynamic( true ) );
		// create the particle system
		this.pointCloud = new THREE.Points( this.particles, this.pMaterial );
		this.pointCloud.position.z = 3;
		this.pointCloud.position.y = 0.5;
		this.group.add( this.pointCloud );
	}
}

export default DataEmitter;