import './WebglCursor.scss';
import Emitter from '../../core/Emitter';
import SoundManager from '../../sound/SoundManager';

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
				height: this.circleSize * 2,
				width: this.circleSize * 2,
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

		let lgSVGSize = {
			from: this.circleSize * 2,
			to: this.circleSize * this.spreadFactor + this.circleMargin
		};

		let mdSVGSize = {
			from: this.circleSize * 2,
			to: lgSVGSize.to / 2
		};

		let lgSize = {
			from: this.circleSize,
			to: this.circleSize * this.spreadFactor
		};

		let mdSize = {
			from: this.circleSize,
			to: lgSize.to / 2
		};

		let lgOffset = {
			from: (this.circleSize + this.circleMargin) / -2,
			to: (lgSize.to + this.circleMargin) / -2
		};

		let mdOffset = {
			from: (this.circleSize + this.circleMargin) / -2,
			to: lgOffset.to / 2
		};

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
					progress.circle.setAttribute('stroke-dashoffset', this.easeInOutExpo(current2, -progress.pathLength_spread, progress.pathLength_spread, 2000));
				}
			},
			onComplete: () => {
				SoundManager.play('complete');
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
		SoundManager.play('tick');
		SoundManager.play('progressbar');
	}

	onMouseLeave() {
		this.tween.timeScale(3).reverse();
		SoundManager.get('progressbar').stop();
		SoundManager.play('out');
	}

	updateSVG(elt, duration, SVGSize, size, offset, current) {
		TweenLite.set(elt, {
			x: this.easeOutExpo(current, offset.from, offset.to - offset.from, duration),
			y: this.easeOutExpo(current, offset.from, offset.to - offset.from, duration)
		});
		elt.style.width = this.easeOutExpo(current, SVGSize.from, SVGSize.to - SVGSize.from, duration);
		elt.style.height = this.easeOutExpo(current, SVGSize.from, SVGSize.to - SVGSize.from, duration);
		elt.style.display = 'block';
		elt.style.opacity = this.easeOutExpo(current, 0, .7, duration);

		elt.circle.setAttribute('cx', this.easeOutExpo(current, offset.from, offset.to - offset.from, duration) * -1);
		elt.circle.setAttribute('cy', this.easeOutExpo(current, offset.from, offset.to - offset.from, duration) * -1);
		elt.circle.setAttribute('r', this.easeOutExpo(current, size.from, (size.to / 2) - size.from, duration));
	}

	// t: current time, b: begInnIng value, c: change In value, d: duration
	easeOutExpo (t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	}
	easeInOutExpo(t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	}

}

export default WebglCursor;