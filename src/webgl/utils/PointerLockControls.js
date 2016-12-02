import throttle from 'lodash/throttle';

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.PointerLockControls = function ( camera, position, lookat, fluidity ) {

	let scope = this;

	this.fluidity = fluidity;

	camera.rotation.set( 0, 0, 0 );

	let pitchObject = new THREE.Object3D();
	pitchObject.add( camera );

	let yawObject = new THREE.Object3D();
	yawObject.position.z = position.z;
	yawObject.position.y = position.y;
	yawObject.position.x = position.x;
	yawObject.add( pitchObject );

	yawObject.rotation.y = -3.6;
	pitchObject.rotation.x = -0.12;

	let onMouseMove = function ( event ) {
		if ( scope.enabled === false ) return;

		let mouseX = event.clientX ;
		let mouseY = event.clientY ;

		let xRange = 3.6;
		let yRange = 2;

		if ( scope.enabled === false ) return;

		let fW = window.innerWidth;
		let fH = window.innerHeight;

		let percX = mouseX / fW;
		let percY = mouseY / fH;

		let newX = -xRange * percX - 1.1;
		let newY = -yRange * percY + 1;

		TweenLite.to(yawObject.rotation, .6, { y: newX});
		TweenLite.to(pitchObject.rotation, .6, { x: newY});
	};

	document.addEventListener( 'mousemove', throttle(onMouseMove,1), false );

	this.enabled = false;

	if(lookat) {
		camera.lookAt(lookat);
	}

	this.getObject = function () {

		return yawObject;

	};

	this.getPitch = function () {

		return pitchObject;

	};

	this.getDirection = function() {

		// assumes the camera itself is not rotated

		let direction = new THREE.Vector3( 0, 0, - 1 );
		let rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

		return function( v ) {

			rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );

			v.copy( direction ).applyEuler( rotation );

			return v;

		};

	}();

};