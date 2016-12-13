<template>
	<div id="end-screen">
		<img src="/images/logo_sm_white.png" alt="">
		<div class="restart" @mouseenter="animateRectangle" @mouseleave="stopRectangle">
			<div class="rectangle" ref="rectangle">
				<span class="side left" ref="rectangleLeft"></span>
				<span class="side bottom" ref="rectangleBottom"></span>
				<span class="side right" ref="rectangleRight"></span>
				<span class="side top" ref="rectangleTop"></span>
			</div>
			<span class="restartButton">Rejouer l'expérience</span>
		</div>
		<div class="more">
			<div class="col">
				<div class="flex-wrapper">
					<h4>Découvrir<br>le roman</h4>
					<ul>
						<li><a href="/">Document PDF</a></li>
						<li><a href="/">Document ePub</a></li>
					</ul>
				</div>
			</div>
			<div class="col">
				<div class="flex-wrapper">
					<h4>Écouter<br>Daniel Mesguich</h4>
					<ul>
						<li><a href="http://youtube.com">Lien Youtube</a></li>
					</ul>
				</div>
			</div>
			<div class="col">
				<div class="flex-wrapper">
					<h4>Partager<br>l'expérience</h4>
					<ul>
						<li><a href="/"><img src="/images/twitter.svg" alt="" class="icon">Twitter</a></li>
						<li><a href="/"><img src="/images/facebook.svg" alt="" class="icon">Facebook</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import Emitter from '../../core/Emitter';

export default {

	data() {
		return {
		};
	},

	mounted() {
		this.tl = new TimelineMax({paused: true});

		this.tl.to(this.$refs.rectangleLeft, .5/3, {
			y:0
		}).to(this.$refs.rectangleBottom, .5, {
			x:0
		}).to(this.$refs.rectangleRight, .5/3, {
			y:0
		}).to(this.$refs.rectangleTop, .5, {
			x:0
		});

		this.tween = this.tl.tweenTo(this.tl.duration(), {
			ease: Power3.easeInOut,
			paused: true
		});

	},

	methods: {
		animateRectangle() {
			console.log('animateRectangle');
			this.tween.play();
		},

		stopRectangle() {
			console.log('stopRectangle');
			this.tween.reverse();
		}
	},

	components: {
	}
}

</script>

<style lang="sass">
	@import '../../stylesheets/variables.scss';
	
	#end-screen {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(0,0,0,0.4);
		text-align: center;
		padding: 10vh 17vw;
		color: $second-color;
		display: block;

		a {
			color: $second-color;
		}

		img {
			display: block;
			margin: auto;
		}

		.restart {
			margin: 12vh auto;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			border: solid 1px $second-color;
			width: 280px;
			height: 70px;
			position: relative;
			.rectangle {
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				overflow: hidden;
				.side {
					display: inline-block;
					position: absolute;
					background-color: $second-color;
					$border-size: 2px;
					&.left {
						left: 0;
						top: 0;
						bottom: 0;
						width: $border-size;
						transform: translateY(-100%);
					}
					&.bottom {
						left: 0;
						right: 0;
						bottom: 0;
						height: $border-size;
						transform: translateX(-100%);
					}
					&.right {
						top: 0;
						right: 0;
						bottom: 0;
						width: $border-size;
						transform: translateY(100%);
					}
					&.top {
						left: 0;
						top: 0;
						right: 0;
						height: $border-size;
						transform: translateX(100%);
					}
				}
			}
			.restartButton {
				position: relative;
				&:before, &:after {
					content: '';
					display: inline-block;
					width: 1em;
					border-bottom: solid 1px $second-color;
					transform: translateY(-0.2em);
					margin: 0 1em;
				}
			}
			font-size: 18px;
		}

		.more {
			display: flex;
			width: 100%;
			justify-content: center;

			.col {
				position: relative;
				display: block;
				padding: 0 10%;
				text-align: center;
				width: 20%;
				&:nth-last-child(-n+2) {
					&:before {
						content: '';
						position: absolute;
						left: 0;
						top: 0;
						height: 75%;
						border-left: 1px solid $second-color;
					}
				}
				.flex-wrapper {
					text-align: left;
					display: flex;
					flex-direction: column;
					h4 {
						display: inline-block;
						margin-top: 0;
						margin-bottom: 2rem;
						font-size: 20px;
						font-family: BauerBodoni;
						font-weight: normal;
					}
					ul {
						width: 100%;
						border-top: solid 1px $second-color;
						display: inline-flex;
						flex-direction: column;
						list-style-type: none;
						padding: 0;
						margin: 0;
						font-size: 16px;
						font-family: 'BaskervilleMT';
						li {
							display: inline-block;
							margin-top: 2rem;
							a {
								.icon {
									display: inline-block;
									height: 0.8em;
									margin-right: 1em;
								}
								color: $third-color;
							}
						}
					}
				}
			}
		}
	}
</style>