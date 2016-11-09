import Howler from 'howler';

class SoundManager {

	/**
	 * @constructor
	 */
	constructor() {

	}

	/**
	 * @method
	 * @name add
	 * @description Add a child to the scene
	 * @param {object} child - A THREE object
	 */
	load(name) {
		let sound = new Howler.Howl({
			src: ['sound/' + name]
		});

		return sound;
	}

	play(sound) {
		sound.play();
	}

}

export default SoundManager;