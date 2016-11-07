import AWDObject from '../AWDObject';

class Bench extends AWDObject {

	/**
	 * @constructor
	 */
	constructor() {
		super();
		this.options = {
			'name': 'bench'
		};
	}

	load() {
		return super.load("bench", {
			'name': 'bench'
		});
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