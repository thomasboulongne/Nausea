<template>
	<div id="loading">
		<img id="home-logo" src="/images/logo_sm_white.png" alt="">
		<span id="home-percentage">{{percentage.value}}%</span>
		<div id="hp-warning">
			<img src="/images/headphones.svg" alt="">
			<span>Better with headphones</span>
		</div>
	</div>
</template>

<script>
	
import Emitter from '../../core/Emitter';

export default {

	data() {
		return {
			state: 0,
			percentage: {tween: 0, value: 0}
		};
	},

	mounted() {
		Emitter.on('OBJ_LOADED', this.updateLoading);
		let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		
		TweenLite.set(svg, {
			attr: {	
				height: window.innerHeight,
				width: window.innerWidth
			}
		});

		let cx = window.innerWidth / 2;
		let cy = window.innerHeight / 2;

		let lastR = 1;
		for (let i = lastR; i > 0; i -= 0.35) {
			svg.innerHTML += '<circle cx="' + cx + '" cy="' + cy + '" r="' + window.innerHeight * i + '" stroke-width="1" stroke="#262626"/></circle>';
			lastR = i;
		}

		this.$el.appendChild(svg);


		let svgProgress = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		
		TweenLite.set(svgProgress, {
			filter: 'drop-shadow(0px 0px 7px #FFFFFF)',
			position: 'absolute',
			top: 0,
			left:0,
			attr: {
				height: window.innerHeight,
				width: window.innerWidth
			}
		});

		let radius = window.innerHeight * lastR;
		svgProgress.innerHTML += '<circle cx="' + cx + '" cy="' + cy + '" r="' + radius + '" stroke-width="4" stroke="#FFFFFF" transform="rotate(-90, ' + cx + ', ' + cy + ')"/></circle>';

		this.progressCircle = svgProgress.childNodes[svgProgress.childNodes.length - 1];

		this.progressCircle.pathLength = radius * Math.PI * 2;

		TweenLite.set(this.progressCircle, {
			attr: {
				'stroke-dasharray': this.progressCircle.pathLength,
				'stroke-dashoffset': -this.progressCircle.pathLength,
				'stroke-width': 3
			}
		});

		this.$el.appendChild(svgProgress);
	},

	methods: {
		updateLoading(item, loaded, total) {
			this.state = loaded / total;


			TweenLite.to(this.percentage, 1, {
				'tween': this.state * 100,
				onUpdate: () => { this.percentage.value = parseInt(this.percentage.tween);}
			});

			TweenLite.to(this.progressCircle, 1, {
				'stroke-dashoffset': -this.progressCircle.pathLength * (1 - this.state)
			});

			if (this.state == 1) {
				setTimeout(()=>{Emitter.emit('LOADING_COMPLETE');}, 1000);
				TweenLite.to(this.$el, 1, {opacity: 0, delay: 2, onComplete: ()=>{
					TweenLite.set(this.$el, {display: 'none'});
					Emitter.off('OBJ_LOADED', this.updateLoading);
				}});
			}
		}
	}
}

</script>

<style lang="sass">
	#loading {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 2;
		background-color: #000000;
		opacity: 1;

		#home-logo {
			position: absolute;
			z-index: 2;
			top: 50%;
			left: 50%;
			width: 20vw;
			transform: translate(-50%, -50%);
		}

		#home-percentage {
			position: absolute;
			z-index: 2;
			top: 65%;
			left: 50%;
			font-size: 30px;
			color: #cdcdcd;
			transform: translate(-50%, -50%);
		}

		#hp-warning {
			text-align: center;
			position: absolute;
			z-index: 2;
			left: 50%;
			bottom: 5%;
			transform: translateX(-50%);
			text-transform: uppercase;
			span {
				margin-top: 1em;
				display: block;
				font-size: 14px;
				font-family: 'Gotham-Book'
			}

			img {
				margin: auto;
			}
		}
	}
</style>