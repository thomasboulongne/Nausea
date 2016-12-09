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
			<div class="container" ref="container">
				<div class="sentence"><span>Jamais,</span></div>
				<div class="sentence"><span> avant </span><span>ces </span><span>derniers </span><span>jours</span><span>, </span></div>
				<div class="sentence"><span>je </span><span>n'avais </span><span>pressenti </span><span>ce </span><span>que </span><span>voulait </span><span>dire </span></div>
				<div class="sentence"><span>exister</span></div>
			</div>
	</div>
	</div>
</template>

<script>
	
import Emitter from '../../core/Emitter';
import SoundManager from '../../sound/SoundManager';

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

		this.setupQuoteAnimation();
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
				let tl = new TimelineLite()
				tl.to(this.$refs.loading, 1, {
					delay: 2,
					opacity: 0,
					onComplete: () => {
						Emitter.off('OBJ_LOADED', this.updateLoading);
						TweenLite.set(this.$refs.loading, {display: 'none'});
						this.playQuoteAnimation();
					}
				}, 0)
				.to(this.circles, 2, {
					delay: 1,
					attr: {
						r: "+=" + window.innerHeight
					},
					ease: Power3.easeIn
				}, 0);
			}
		},

		setupQuoteAnimation() {

			let sentences = Array.from(this.$refs.container.childNodes);
			this.quoteTl = new TimelineMax();
			this.quoteTl.pause();

			let delay = 0;
			for (let i = 0; i < sentences.length; i++) {
				if( sentences[i].nodeType == Node.ELEMENT_NODE ) {
					let duration = 1;
					switch(i) {
						case 0:
							delay = 0;
							duration = .1
							break;
						case 1:
							delay = 0;
							break;
						case 2:
							delay = "+=0.8";
							break;
						case 3:
							delay = "-=0.5";
							duration = 3;
							break;
					}

					let words = Array.from(sentences[i].childNodes);

					if(words.length > 1){
						this.quoteTl.staggerTo(words, duration, {
							opacity: 1,
							y: 0,
							ease: Power3.easeOut
						}, .2, delay);
					}
					else {
						this.quoteTl.to(words[0], duration, {
							opacity: 1,
							y: 0,
							ease: Power3.easeOut
						}, delay);
					}
				}
			}

			this.quoteTl.eventCallback("onComplete", () => {
				let tlOut = new TimelineLite();
				tlOut.to(this.$refs.quote, 2, {
					opacity: 0,
					onComplete: () => {
						TweenLite.set(this.$el, {
							display: 'none'
						});
					}
				})
				.add(() => {
					Emitter.emit('LOADING_COMPLETE');
				}, 0);
			});
		},

		playQuoteAnimation() {
			this.quoteTl.play();
			SoundManager.play('01');
		}
	}
}

</script>

<style lang="sass">
	@import '../../stylesheets/variables.scss';
	#loading {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 3;
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
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 1;

		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		background-image: url('/images/noise.png');
		z-index: 2;
		.container {
			position: absolute;
			display: flex;
			flex-wrap: wrap;
			width: 50%;
			justify-content: center;
			.sentence {
				span {
					opacity: 0;
					transform: translateY(0.3em);
					white-space: pre;
					display: inline-block;
					color: $white;
					font-size: 44px;
					line-height: 1.5em;
				}

				&:last-child {
					flex-basis: 100%;
					transform: translateY(1em);
					text-align: center;
					span {
						font-size: 54px;
					}
				}
			}
		}
	}
</style>