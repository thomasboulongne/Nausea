import Emitter from '../../core/Emitter';

const LoadingManager = new THREE.LoadingManager();

LoadingManager.onProgress = function ( item, loaded, total ) {

	Emitter.emit( 'OBJ_LOADED', item, loaded, total );

};

export default LoadingManager;
