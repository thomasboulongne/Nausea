import AWDObject from '../AWDObject';

class Rock extends AWDObject {

	/**
	 * @constructor
	 */
	constructor() {
		super();
		this.options = {
			'name': 'rock',
			'x': 6,
			'y': 0,
			'z': -2.6,
			'color': 0xcacaca
		};
	}

	load() {
		return super.load("rock", this.options);
	}

	/**
	 * @method
	 * @name update
	 * @description Triggered on every TweenMax tick
	 */
	update() {

	}

}

export default Rock;