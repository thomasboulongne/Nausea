<template>
	<div class="landing-screen">
		<div id="loading" ref="loading">
			<img id="home-logo" src="/images/logo_sm_white.png" alt="">
			<span id="home-percentage">{{percentage.value}}%</span>
			<div id="hp-warning">
				<img src="/images/headphones.svg" alt="">
				<span>Better with headphones</span>
			</div>
		</div>
		<div id="quote" ref="quote">
			
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
		this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		
		TweenLite.set(this.svg, {
			attr: {	
				height: window.innerHeight,
				width: window.innerWidth
			}
		});

		let cx = window.innerWidth / 2;
		let cy = window.innerHeight / 2;

		let lastR = 1;
		for (let i = lastR; i > 0; i -= 0.35) {
			this.svg.innerHTML += '<circle cx="' + cx + '" cy="' + cy + '" r="' + window.innerHeight * i + '" stroke-width="1" stroke="#262626"/></circle>';
			lastR = i;
		}

		this.$refs.loading.appendChild(this.svg);


		this.svgProgress = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		
		TweenLite.set(this.svgProgress, {
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
		this.svgProgress.innerHTML += '<circle cx="' + cx + '" cy="' + cy + '" r="' + radius + '" stroke-width="4" stroke="#FFFFFF" transform="rotate(-90, ' + cx + ', ' + cy + ')"/></circle>';

		this.progressCircle = this.svgProgress.childNodes[this.svgProgress.childNodes.length - 1];

		this.progressCircle.pathLength = radius * Math.PI * 2;

		TweenLite.set(this.progressCircle, {
			attr: {
				'stroke-dasharray': this.progressCircle.pathLength,
				'stroke-dashoffset': -this.progressCircle.pathLength,
				'stroke-width': 3
			}
		});

		this.circles = Array.from(this.svg.childNodes);
		// this.circles.push(this.progressCircle);

		this.$refs.loading.appendChild(this.svgProgress);
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
				// setTimeout(()=>{Emitter.emit('LOADING_COMPLETE');}, 1000);
				// TweenLite.set(this.$refs.loading, {display: 'none'});
				let tl = new TimelineLite()
				tl.to(this.$refs.loading, 1, {
					delay: 2,
					opacity: 0,
					onComplete: ()=>{
						Emitter.off('OBJ_LOADED', this.updateLoading);
					}
				}, '-=1')
				.to(this.$refs.quote, 1, {
					display: 'block',
					opacity: 1
				})
				.to(this.circles, 2, {
					delay: 1,
					attr: {
						r: "+=" + window.innerHeight
					},
					ease: Power3.easeIn
				}, 0);
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
	#quote {
		display: none;
		opacity: 0;

		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-image: url('/images/noise.png');
		z-index: 3;
	}
</style>