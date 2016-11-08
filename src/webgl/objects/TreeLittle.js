import AWDObject from '../AWDObject';

class TreeLittle extends AWDObject {

	/**
	 * @constructor
	 */
	constructor() {
		super();
		this.options = {
			'name': 'treeLittle',
			'x': 9,
			'y': 0,
			'z': -6,
			'color': 0xcacaca
		};
	}

	load() {
		return super.load("tree-little", this.options);
	}

	/**
	 * @method
	 * @name update
	 * @description Triggered on every TweenMax tick
	 */
	update() {

	}

}

export default TreeLittle;