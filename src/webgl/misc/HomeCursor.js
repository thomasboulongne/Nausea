import './HomeCursor.scss';

class HomeCursor {
	
	constructor(domElt, options) {
		this.domElt = domElt;

		this.options = options ? options : {};

		this.color = this.options.color ? this.options.color : '#FFFFFF';

		this.circlesNb = 4;

		this.circles = [];

		for (let i = 0; i < this.circlesNb; i++) {
			let elt = document.createElementNS("http://www.w3.org/2000/svg", "svg");

			elt.cursor_size = 25;
			elt.cursor_margin = 10;
			elt.cursor_offset = (elt.cursor_size + elt.cursor_margin) / -2;

			TweenLite.set(elt, {
				x: elt.cursor_offset,
				y: elt.cursor_offset,
				height: elt.cursor_size + elt.cursor_margin,
				width: elt.cursor_size + elt.cursor_margin,
				display: 'none'
			});

			elt.classList.add('HomeCursor-circle');

			let cx = (elt.cursor_size + elt.cursor_margin) / 2;

			elt.innerHTML = '<circle cx="' + cx + '" cy="' + cx + '" r="' + elt.cursor_size / 2 + '" style="fill: none;stroke:' + this.color + ';"/></circle>';

			this.domElt.appendChild(elt);

			elt.circle = elt.childNodes[0];
			TweenLite.set(elt.circle, {
				attr: {
					'stroke-width': 1
				}
			});

			this.circles.push(elt);
		}

		this.setupStyle();

		this.setupTweens();

		this.addEventListeners();

	}

	setupStyle() {

		TweenLite.set(this.circles[0], {
			display: 'block'
		});

		let progress = this.circles[2];

		progress.pathLength_spread = progress.cursor_size * progress.cursor_spreadFactor * Math.PI;

		TweenLite.set(progress.circle, {
			attr: {
				'stroke-dasharray': progress.pathLength_spread,
				'stroke-dashoffset': progress.pathLength_spread,
				'stroke-width': 3
			}
		});

	}

	setupTweens() {
	}

	addEventListeners() {
		this.bindMouseMove = this.onMouseMove.bind(this);
		window.addEventListener('mousemove', this.bindMouseMove);
	}

	onMouseMove(event) {
		for (let i = 0; i < this.circles.length; i++) {
			TweenLite.to(this.circles[i], 1.2, {
				left: event.clientX,
				top: event.clientY,
				ease: Elastic.easeOut.config(1.5, 1)
			});
		}
	}

	onMouseEnter() {
	}

	onMouseLeave() {
		// this.mouseEnterTL.resume();
	}

}

export default HomeCursor;