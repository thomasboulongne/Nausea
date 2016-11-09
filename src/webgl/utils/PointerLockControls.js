/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.PointerLockControls = function ( camera, position, lookat ) {

	let scope = this;

	camera.rotation.set( 0, 0, 0 );

	let pitchObject = new THREE.Object3D();
	pitchObject.add( camera );

	let yawObject = new THREE.Object3D();
	yawObject.position.z = position.z;
	yawObject.position.y = position.y;
	yawObject.position.x = position.x;
	yawObject.add( pitchObject );

	yawObject.rotation.y = -1.574;
	pitchObject.rotation.x = -0.12;

	let PI_2 = Math.PI / 2;

	let onMouseMove = function ( event ) {
		if ( scope.enabled === false ) return;

		let movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		let movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		yawObject.rotation.y -= movementX * 0.002;
		pitchObject.rotation.x -= movementY * 0.002;

		pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );

	};

	this.dispose = function() {

		document.removeEventListener( 'mousemove', onMouseMove, false );

	};

	document.addEventListener( 'mousemove', onMouseMove, false );

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