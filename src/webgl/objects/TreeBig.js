import AWDObject from '../AWDObject';

class TreeBig extends AWDObject {

	/**
	 * @constructor
	 */
	constructor() {
		super();
		this.options = {
			'name': 'treeBig',
			'x': 5,
			'y': 0,
			'z': 5,
			'color': 0xcacaca
		};
	}

	load() {
		return super.load("tree-big", this.options);
	}

	/**
	 * @method
	 * @name update
	 * @description Triggered on every TweenMax tick
	 */
	update() {

	}

}

export default TreeBig;