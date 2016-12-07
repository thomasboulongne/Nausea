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

		this.enterTl = new TimelineMax();

		let middle = this.circles[1];
		let large = this.circles[2];
		let progress = this.circles[3];

		let lgSVGSize = this.circleSize * this.spreadFactor + this.circleMargin;
		let lgSize = this.circleSize * this.spreadFactor;
		let lgOffset = (lgSize + this.circleMargin) / -2;

		let mdSVGSize = lgSVGSize / 2;
		let mdSize = lgSize / 2;
		let mdOffset = lgOffset / 2

		this.enterTl.to(large, .7, {
			x: lgOffset,
			y: lgOffset,
			width: lgSVGSize,
			height: lgSVGSize,
			display: 'block',
			ease: Expo.easeOut,
			opacity: 1
		}, 0)
		.to(large.circle, .7, {
			attr: {
				cx: -lgOffset,
				cy: -lgOffset,
				r: lgSize/2
			},
			ease: Expo.easeOut
		}, 0)
		.to(middle, 1.1, {
			x: mdOffset,
			y: mdOffset,
			width: mdSVGSize,
			height: mdSVGSize,
			display: 'block',
			ease: Expo.easeInOut,
			opacity: .2
		}, 0)
		.to(middle.circle, 1.1, {
			attr: {
				cx: -mdOffset,
				cy: -mdOffset,
				r: mdSize/2
			},
			onUpdate: () => {
				console.log(middle.circle.getAttribute('r'));
			},
			ease: Expo.easeInOut
		}, 0)
		.to(progress, .7, {
			x: lgOffset,
			y: lgOffset,
			width: lgSVGSize,
			height: lgSVGSize,
			display: 'block',
			ease: Expo.easeOut,
			opacity: 1
		}, 0)
		.to(progress.circle, .7, {
			attr: {
				cx: -lgOffset,
				cy: -lgOffset,
				r: lgSize/2
			},
			ease: Expo.easeOut
		}, 0)
		.to(progress.circle,2, {
			attr: {
				'stroke-dashoffset': 0
			},
			ease: Expo.easeInOut,
			onComplete: () => {
				Emitter.emit(this.eventKey);
			}
		}, '-=0.5')
		.pause();
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
		this.enterTl.timeScale(1).play();
	}

	onMouseLeave() {
		this.enterTl.timeScale(3).reverse();
	}

}

export default WebglCursor;