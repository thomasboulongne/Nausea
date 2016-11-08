import AWDObject from '../AWDObject';

class Bench extends AWDObject {

	/**
	 * @constructor
	 */
	constructor() {
		super();
		this.options = {
			'name': 'bench',
			'x': 0,
			'y': 0,
			'z': 0,
			'color': 0xcacaca
		};
	}

	load() {
		return super.load("bench", this.options);
	}

	/**
	 * @method
	 * @name update
	 * @description Triggered on every TweenMax tick
	 */
	update() {

	}

}

export default Bench;