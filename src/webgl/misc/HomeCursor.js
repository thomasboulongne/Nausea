import './HomeCursor.scss';

class HomeCursor {
	
	constructor(domElt) {
		this.domElt = domElt;

		this.smCircle = document.createElement('div');

		this.smCircle.classList.add('HomeCursor-circle');

		this.lgCircle = document.createElement('div');

		this.lgCircle.classList.add('HomeCursor-circle');

		this.domElt.appendChild(this.smCircle);
		this.domElt.appendChild(this.lgCircle);
		
		this.startSpread = false;

		this.setupStyle();

		this.addEventListeners();
	}

	setupStyle() {
		this.sm = 25;
		this.lg = 350;

		TweenLite.set(this.smCircle, {width: this.sm, height: this.sm});
		TweenLite.set(this.lgCircle, {width: this.sm, height: this.sm, display: 'none'});
	}

	addEventListeners() {
		this.bindMouseMove = this.onMouseMove.bind(this);
		window.addEventListener('mousemove', this.bindMouseMove);
	}

	onMouseMove(event) {
		TweenLite.to(this.smCircle, 1.2, {left: event.clientX - this.sm/2, top: event.clientY - this.sm/2, ease: Elastic.easeOut.config(1.5, 1)});
		TweenLite.to(this.lgCircle, 1.2, {left: event.clientX - this.sm/2, top: event.clientY - this.sm/2, ease: Elastic.easeOut.config(1.3, 1)});
	}

	onMouseEnter() {
		if( !this.startSpread && this.lgCircle.style.display == 'none' ) {
			this.startSpread = true;
			TweenLite.fromTo(this.lgCircle, 1, {width: this.sm, height: this.sm, x: 0, y: 0}, {display: 'block', width: this.lg, height: this.lg, x: -this.lg/2 + 'px', y: -this.lg/2 + 'px', ease: Power4.easeIn, onComplete: ()=>{this.startSpread = false; this.spreaded = true;}});			
		}
	}

	onMouseLeave() {
		this.startSpread = false;
		this.spreaded = false;
		let tl = new TimelineLite();
		tl.to(this.lgCircle, .5, {width: this.sm, height: this.sm, x: 0, y: 0, ease: Power4.easeOut})
		.set(this.lgCircle, {display: 'none'});
	}

}

export default HomeCursor;