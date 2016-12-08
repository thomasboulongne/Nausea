import './WebglCursor.scss';
import Emitter from '../../core/Emitter';

class WebglCursor {
	
	constructor(domElt, eventKey, options) {
		this.domElt = domElt;

		this.domElt.style.cursor = 'none';

		this.eventKey = eventKey;

		this.options = options ? options : {};

		this.color = this.options.color ? this.options.color : '#FFFFFF';

		this.circlesNb = 4;

		this.circleSize = 25;
		this.circleMargin = 10;

		this.spreadFactor = 10;

		this.circles = [];

		let offset = (this.circleSize + this.circleMargin) / -2;

		for (let i = 0; i < this.circlesNb; i++) {
			let elt = document.createElementNS("http://www.w3.org/2000/svg", "svg");

			TweenLite.set(elt, {
				x: offset,
				y: offset,
				height: this.circleSize + this.circleSize,
				width: this.circleSize + this.circleSize,
				display: 'none',
				opacity: 0
			});

			elt.classList.add('WebglCursor-circle');

			let cx = -offset;

			elt.innerHTML = '<circle cx="' + cx + '" cy="' + cx + '" r="' + this.circleSize / 2 + '" style="fill: none;stroke:' + this.color + ';"/></circle>';

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
			display: 'block',
			opacity: 1,
			filter: 'drop-shadow(0px 0px 3px ' + this.color + ')'
		});

		let progress = this.circles[3];

		progress.pathLength_spread = this.circleSize * this.spreadFactor * Math.PI;

		TweenLite.set(progress, {
			filter: 'drop-shadow(0px 0px 7px ' + this.color + ')'
		});

		TweenLite.set(progress.circle, {
			attr: {
				'stroke-dasharray': progress.pathLength_spread,
				'stroke-dashoffset': -progress.pathLength_spread,
				'stroke-width': 3
			}
		});

	}

	setupTweens() {


		let middle = this.circles[1];
		let large = this.circles[2];
		let progress = this.circles[3];

		let lgSVGSize = this.circleSize * this.spreadFactor + this.circleMargin;
		let lgSize = this.circleSize * this.spreadFactor;
		let lgOffset = (lgSize + this.circleMargin) / -2;

		let mdSVGSize = lgSVGSize / 2;
		let mdSize = lgSize / 2;
		let mdOffset = lgOffset / 2;

		let totalDuration = {
			value: 0
		};

		let steps = [
			700,
			1100
		];

		this.tween = TweenLite.to(totalDuration, 3.1, {
			value: 3100,
			onUpdate: () => {
				let current = totalDuration.value;
				if(current <= steps[0]) {
					this.updateSVG( large, steps[0], lgSVGSize, lgSize, lgOffset, current );
					this.updateSVG( progress, steps[0], lgSVGSize, lgSize, lgOffset, current );
				}

				if(current <= steps[1]) {
					this.updateSVG( middle, steps[1], mdSVGSize, mdSize, mdOffset, current);
				}

				let current2 = current - 1100;
				if(current2 > 0) {
					progress.circle.setAttribute('stroke-dashoffset', progress.pathLength_spread - ( current2 * progress.pathLength_spread ) / 2000);
				}
			},
			onComplete: () => {
				Emitter.emit(this.eventKey);
			}
		}).pause();
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
		this.tween.timeScale(1).play();
	}

	onMouseLeave() {
		this.tween.timeScale(3).reverse();
	}

	updateSVG(elt, step, SVGSize, size, offset, current) {
		TweenLite.set(elt, {
			x: (current * offset)/step,
			y: (current * offset)/step
		});
		elt.style.width = (current * SVGSize)/step;
		elt.style.height = (current * SVGSize)/step;
		elt.style.display = 'block';
		elt.style.opacity = (current * .7)/step;

		elt.circle.setAttribute('cx', -(current * offset)/step);
		elt.circle.setAttribute('cy', -(current * offset)/step);
		elt.circle.setAttribute('r', (current * size/2)/step);
	}

}

export default WebglCursor;