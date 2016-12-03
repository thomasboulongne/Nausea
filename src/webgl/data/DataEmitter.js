class DataEmitter {

	/**
	 * @constructor
	 */
	constructor() {
		this.group = new THREE.Group();

		this.posZ = 3;
		this.posY = 0.5;

		this.boxSide = 1;
		this.maxParticles = 50;
		this.particlesData = [];

		this.addHelper();
		this.addParticles();

	}

	addHelper() {
		this.helper = new THREE.BoxHelper( new THREE.Mesh( new THREE.BoxGeometry( this.boxSide, this.boxSide, this.boxSide ) ) );
		this.helper.material.color.setHex( 0xFF0000 );
		this.helper.material.blending = THREE.AdditiveBlending;
		this.helper.material.transparent = true;
		this.helper.position.z = this.posZ;
		this.helper.position.y = this.posY;
		this.group.add( this.helper );
	}

	addParticles() {

		this.segments = this.maxParticles * this.maxParticles;
		this.positions = new Float32Array( this.segments * 3 );
		this.colors = new Float32Array( this.segments * 3 );

		this.pMaterial = new THREE.PointsMaterial( {
			color: 0x0000FF,
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
				velocity: new THREE.Vector3( (-1 + Math.random() * 2)/100, (-1 + Math.random() * 2)/100,  (-1 + Math.random() * 2)/100 ),
				numConnections: 0
			} );
		}
		console.log(this.particlesData)

		this.particles.setDrawRange( 0, this.maxParticles );
		this.particles.addAttribute( 'position', new THREE.BufferAttribute( this.particlePositions, 3 ).setDynamic( true ) );
		// create the particle system
		this.pointCloud = new THREE.Points( this.particles, this.pMaterial );
		this.pointCloud.position.z = this.posZ;
		this.pointCloud.position.y = this.posY;
		this.group.add( this.pointCloud );
	}

	update() {
		console.log('dataupdate');
		//let vertexpos = 0;

		for ( let i = 0; i < this.maxParticles; i++ ) {
			// get the particle
			let particleData = this.particlesData[i];

			this.particlePositions[ i * 3     ] += particleData.velocity.x;
			this.particlePositions[ i * 3 + 1 ] += particleData.velocity.y;
			this.particlePositions[ i * 3 + 2 ] += particleData.velocity.z;

			if ( this.particlePositions[ i * 3 + 1 ] < -this.boxSide/2 || this.particlePositions[ i * 3 + 1 ] > this.boxSide/2 )
				particleData.velocity.y = -particleData.velocity.y;
			if ( this.particlePositions[ i * 3 ] < -this.boxSide/2 || this.particlePositions[ i * 3 ] > this.boxSide/2 )
				particleData.velocity.x = -particleData.velocity.x;
			if ( this.particlePositions[ i * 3 + 2 ] < -this.boxSide/2 || this.particlePositions[ i * 3 + 2 ] > this.boxSide/2 )
				particleData.velocity.z = -particleData.velocity.z;
		}

		this.pointCloud.geometry.attributes.position.needsUpdate = true;
	}
}

export default DataEmitter;