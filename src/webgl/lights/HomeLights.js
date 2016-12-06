class HomeLights {

	/**
	 * @constructor
	 */
	constructor() {
		this.time = 0;


		this.lights = [
			this.createSpotLight('0xFFFFFF', 0, 1, 0)
		];
	}

	createSpotLight(color, x, y, z)
	{
		const angle = 1;
		const intensity = 3;
		const penumbra = 1;
		const distance = 30;
		const decay = 2;

		let spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
		spotLight.position.set( x, y, z );

		return spotLight;
	}


	update() {
		
		if(this.lights.length) {
			this.lights[0].position.x = Math.sin( this.time * 0.7 ) * 10;
			this.lights[0].position.z = Math.sin( this.time * 0.3 ) * 10;
		}

		this.time += 0.01;
	}
}

export default HomeLights;