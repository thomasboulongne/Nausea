class Lights {

	/**
	 * @constructor
	 */
	constructor() {

		this.list = [];

		this.list.push( this.createSpotLight(0xffffff, 0, 28, 0) );

		this.list.push( this.createHemisphere() );
	}

	createHemisphere() {
		this.hemisphere = new THREE.HemisphereLight( 0xededed, 0xededed, 1 );
		return this.hemisphere;
	}

	createSpotLight(color, x, y, z)
	{
		const angle = 1;
		const intensity = 3;
		const penumbra = 0.7;
		const distance = 30;
		const decay = 2;

		let spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
		spotLight.position.set( x, y, z );

		return spotLight;
	}
}

export default Lights;