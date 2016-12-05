import Howler from 'howler';

class Manager {

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
	load(name, options) {

		let opt = options ? options : {};

		let sound = new Howler.Howl({
			src: ['sound/' + name],
			loop: opt.loop ? opt.loop : false,
			volume: opt.volume ? opt.volume : 1
		});

		return sound;
	}

	play(sound) {
		sound.play();
	}

}

const SoundManager = new Manager();

export default SoundManager;