import throttle from 'lodash/throttle';

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.PointerLockControls = function ( camera, position, lookat, fluidity ) {

	this.fluidity = fluidity;

	camera.rotation.set( 0, 0, 0 );

	this.pitchObject = new THREE.Object3D();
	this.pitchObject.add( camera );

	this.yawObject = new THREE.Object3D();
	this.yawObject.position.z = position.z;
	this.yawObject.position.y = position.y;
	this.yawObject.position.x = position.x;
	this.yawObject.add( this.pitchObject );

	this.mouse = new THREE.Vector2();

	this.yawObject.rotation.y = -3.2;
	this.pitchObject.rotation.x = -1;

	let onMouseMove = function ( event ) {
		if ( this.enabled === false ) return;

		this.mouse.x = event.clientX ;
		this.mouse.y = event.clientY ;

		let xRange = 3.6;
		let yRange = 2;

		let fW = window.innerWidth;
		let fH = window.innerHeight;

		let percX = this.mouse.x / fW;
		let percY = this.mouse.y / fH;

		let newX = -xRange * percX - 1.1;
		let newY = -yRange * percY + 1;

		TweenLite.to(this.yawObject.rotation, .6, { y: newX});
		TweenLite.to(this.pitchObject.rotation, .6, { x: newY});
	};

	document.addEventListener( 'mousemove', throttle(onMouseMove,1).bind(this), false );

	this.enabled = false;

	if(lookat) {
		camera.lookAt(lookat);
	}

	this.getObject = function () {

		return this.yawObject;

	};

	this.getPitch = function () {

		return this.pitchObject;

	};

	this.getDirection = function() {

		// assumes the camera itself is not rotated

		let direction = new THREE.Vector3( 0, 0, - 1 );
		let rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

		return function( v ) {

			rotation.set( this.pitchObject.rotation.x, this.yawObject.rotation.y, 0 );

			v.copy( direction ).applyEuler( rotation );

			return v;

		};

	}();

};