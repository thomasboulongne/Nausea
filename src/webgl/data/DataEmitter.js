class DataEmitter {

	/**
	 * @constructor
	 */
	constructor(options) {
		this.group = new THREE.Group();

		this.posZ = options.z;
		this.posY = options.y;
		this.posX = options.x;

		this.boxSide = options.side;
		this.maxParticles = options.particles;
		this.particlesData = [];

		this.effectController = {
			showDots: true,
			showLines: true,
			minDistance: options.minDistance,
			limitConnections: false,
			maxConnections: 200,
			particleCount: 25
		};

		//this.addHelper();
		this.addParticles();
		this.addLines();

	}

	addHelper() {
		this.helper = new THREE.BoxHelper( new THREE.Mesh( new THREE.BoxGeometry( this.boxSide, this.boxSide, this.boxSide ) ) );
		this.helper.material.color.setHex( 0x474747 );
		//this.helper.material.blending = THREE.AdditiveBlending;
		this.helper.material.transparent = true;
		this.helper.position.z = this.posZ;
		this.helper.position.x = this.posX;
		this.helper.position.y = this.posY;
		this.group.add( this.helper );
	}

	addParticles() {

		this.segments = this.maxParticles * this.maxParticles;
		this.positions = new Float32Array( this.segments * 3 );
		this.colors = new Float32Array( this.segments * 3 );

		this.pMaterial = new THREE.PointsMaterial( {
			color: 0x939393,
			size: 3,
			//blending: THREE.AdditiveBlending,
			fog: true,
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
				velocity: new THREE.Vector3( (-1 + Math.random() * 2)/150, (-1 + Math.random() * 2)/150,  (-1 + Math.random() * 2)/150 ),
				numConnections: 0
			} );
		}

		this.particles.setDrawRange( 0, this.maxParticles );
		this.particles.addAttribute( 'position', new THREE.BufferAttribute( this.particlePositions, 3 ).setDynamic( true ) );
		// create the particle system
		this.pointCloud = new THREE.Points( this.particles, this.pMaterial );
		this.pointCloud.position.z = this.posZ;
		this.pointCloud.position.x = this.posX;
		this.pointCloud.position.y = this.posY;
		this.group.add( this.pointCloud );
	}

	addLines() {
		let geometry = new THREE.BufferGeometry();
		geometry.addAttribute( 'position', new THREE.BufferAttribute( this.positions, 3 ).setDynamic( true ) );
		geometry.addAttribute( 'color', new THREE.BufferAttribute( this.colors, 3 ).setDynamic( true ) );
		geometry.computeBoundingSphere();
		geometry.setDrawRange( 0, 0 );
		let material = new THREE.LineBasicMaterial( {
			//vertexColors: THREE.VertexColors,
			depthTest: false,
			linewidth: 1,
			color: 0xc6c6c6,
			//blending: THREE.AdditiveBlending,
			transparent: true,
			fog: true
		} );
		this.linesMesh = new THREE.LineSegments( geometry, material );
		this.linesMesh.position.z = this.posZ;
		this.linesMesh.position.x = this.posX;
		this.linesMesh.position.y = this.posY;
		this.group.add( this.linesMesh );
	}

	update() {
		let vertexpos = 0;
		let colorpos = 0;
		let numConnected = 0;

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

			if ( this.effectController.limitConnections && particleData.numConnections >= this.effectController.maxConnections )
				continue;

			// Check collision
			for ( let j = i + 1; j < this.maxParticles; j++ ) {

				let particleDataB = this.particlesData[ j ];

				if ( this.effectController.limitConnections && particleDataB.numConnections >= this.effectController.maxConnections )
					continue;

				let dx = this.particlePositions[ i * 3     ] - this.particlePositions[ j * 3     ];
				let dy = this.particlePositions[ i * 3 + 1 ] - this.particlePositions[ j * 3 + 1 ];
				let dz = this.particlePositions[ i * 3 + 2 ] - this.particlePositions[ j * 3 + 2 ];

				let dist = Math.sqrt( dx * dx + dy * dy + dz * dz );

				if ( dist < this.effectController.minDistance ) {
					particleData.numConnections++;
					particleDataB.numConnections++;
					let alpha = 1.0 - dist / this.effectController.minDistance;
					this.positions[ vertexpos++ ] = this.particlePositions[ i * 3     ];
					this.positions[ vertexpos++ ] = this.particlePositions[ i * 3 + 1 ];
					this.positions[ vertexpos++ ] = this.particlePositions[ i * 3 + 2 ];
					this.positions[ vertexpos++ ] = this.particlePositions[ j * 3     ];
					this.positions[ vertexpos++ ] = this.particlePositions[ j * 3 + 1 ];
					this.positions[ vertexpos++ ] = this.particlePositions[ j * 3 + 2 ];
					this.colors[ colorpos++ ] = alpha;
					this.colors[ colorpos++ ] = alpha;
					this.colors[ colorpos++ ] = alpha;
					this.colors[ colorpos++ ] = alpha;
					this.colors[ colorpos++ ] = alpha;
					this.colors[ colorpos++ ] = alpha;
					numConnected++;
				}
			}
		}

		this.linesMesh.frustumCulled = false;
		this.linesMesh.geometry.setDrawRange( 0, numConnected * 2 );
		this.linesMesh.geometry.attributes.position.needsUpdate = true;
		this.linesMesh.geometry.attributes.color.needsUpdate = true;

		this.pointCloud.geometry.attributes.position.needsUpdate = true;
	}
}

export default DataEmitter;