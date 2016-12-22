class SceneManagerClass {
	
	constructor() {
		this.scenes = {};
	}

	addScene(name, scene) {
		this.scenes[name] = scene;
	}

	add(sceneName, obj) {
		if(this.scenes[sceneName]) {
			this.scenes[sceneName].add(obj);
		}
		else {
			console.warn(sceneName, ' cannot be found in the SceneManager');
		}
	}

	remove(sceneName, obj) {
		if(this.scenes[sceneName]) {
			this.scenes[sceneName].remove(obj);
		}
		else {
			console.warn(sceneName, ' cannot be found in the SceneManager');
		}
	}

}

const SceneManager = new SceneManagerClass();

export default SceneManager;