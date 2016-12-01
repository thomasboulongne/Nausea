import './HomeCursor.scss';

class HomeCursor {
	
	constructor(domElt) {
		this.domElt = domElt;

		this.circlesNb = 2;

		this.circles = [];

		for (let i = 0; i < this.circlesNb; i++) {
			let elt = document.createElement('div');
			elt.classList.add('HomeCursor-circle');
			this.domElt.appendChild(elt);
			elt.cur_size = 5 + ((i+2) * 10);
			elt.cur_offsetInit = elt.cur_size / -2;
			elt.cur_offset = elt.cur_offsetInit;
			elt.cur_elasticity = 1.4 - .2 * i;
			elt.cur_spreadFactor = i * 6;
			this.circles.push(elt);
		}

		
		this.startSpread = false;

		this.setupStyle();

		this.addEventListeners();
	}

	setupStyle() {

		for (let i = 0; i < this.circles.length; i++) {
			TweenLite.set(this.circles[i], {
				width: this.circles[i].cur_size,
				height: this.circles[i].cur_size,
				x: this.circles[i].cur_offset,
				y: this.circles[i].cur_offset 
			});
		}

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
				ease: Elastic.easeOut.config(this.circles[i].cur_elasticity, 1)
			});
		}
	}

	onMouseEnter() {
		if( !this.startSpread) {
			this.startSpread = true;
			let circle = this.circles[1];
			let offset = circle.cur_offsetInit * circle.cur_spreadFactor;
			TweenLite.to(circle, 1, {
				width: circle.cur_size * circle.cur_spreadFactor,
				height: circle.cur_size * circle.cur_spreadFactor,
				cur_offset: circle.cur_offsetInit * circle.cur_spreadFactor,
				x: offset,
				y: offset,
				ease: Power4.easeIn,
				onComplete: ()=>{this.startSpread = false; this.spreaded = true;}
			});
		}
	}

	onMouseLeave() {
		this.startSpread = false;
		this.spreaded = false;
		let tl = new TimelineLite();
		let circle = this.circles[1];
		tl.to(circle, .5, {width: circle.cur_size,
			height: circle.cur_size,
			cur_offset: circle.cur_offsetInit,
			x: circle.cur_offsetInit,
			y: circle.cur_offsetInit,
			ease: Power4.easeOut
		});
	}

}

export default HomeCursor;