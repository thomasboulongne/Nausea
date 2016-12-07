<template>
	<div id="home">
		<home-loading></home-loading>
		<webgl-home></webgl-home>
		<div class="enter-button" ref="enter">
		</div>
		<span class="home-tooltip" ref="tooltip">Maintenez votre curseur sur l'homme<br>pour entrer dans l'expérience</span>
		<footer-comp ref="footer"></footer-comp>
	</div>
</template>

<script>
	
import WebglHomeComponent from './components/WebglHome';
import HomeLoadingComponent from './components/HomeLoading';
import FooterComponent from './components/Footer';
import Emitter from '../core/Emitter';

export default {

	data() {
		return {
			obj: true
		};
	},

	created() {
		Emitter.on('LOADING_COMPLETE', this.showElements.bind(this));
		Emitter.on('HOME_MOUSEENTER', this.hideEnter.bind(this));
		Emitter.on('HOME_MOUSELEAVE', this.showEnter.bind(this));
	},

	mounted() {
		Emitter.on('GOTO_EXPERIENCE', this.redirectToExperience.bind(this));
	},

	methods: {
		'redirectToExperience': function(){
			// this.$router.push('experience');
			this.$parent.home = false;
			this.$parent.experience = true;
		},

		showElements() {
			TweenLite.to(this.$refs.footer.$el, 2, {
				opacity: 1,
				ease: Power2.easeIn
			});

			this.showEnter(3);
		},

		showEnter(delay) {
			if(delay === undefined)
				delay = 1;

			if(this.$refs.enter) {
				TweenLite.to(this.$refs.enter, .8, {
					delay: delay,
					opacity: 1,
					ease: Power2.easeIn
				});
			}
		},

		hideEnter() {
			if(this.$refs.enter) {
				TweenLite.to(this.$refs.enter, .3, {
					opacity: .0,
					ease: Power2.easeIn
				});
			}
		}
	},

	components: {
		'webgl-home': WebglHomeComponent,
		'home-loading': HomeLoadingComponent,
		'footer-comp': FooterComponent
	}
}

</script>

<style lang="sass">
	@import '../stylesheets/variables.scss';

	@keyframes pulse {
		50% {
			opacity: 0;
			height: 22vh;
			width: 22vh;
		}
		100% {
			opacity: 0;
			height: 22vh;
			width: 22vh;
		}
	}
	
	#home {
		.enter-button {
			position: absolute;
			top: 59%;
			left: 50%;
			transform: translate(-50%, -50%);
			text-transform: uppercase;
			color: $white;
			font-size: 13px;
			letter-spacing: 2.3px;
			font-family: 'BaskervilleMT';
			opacity: 0;
			&:after {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%) rotate(45deg);
				border: solid 1px #fff;
				content: '';
				height: 6vh;
				width: 6vh;
				animation: pulse 3s infinite;
				border-radius: 100%;
				animation-timing-function: ease-out;
			}

		}

		span.home-tooltip {
			text-align: center;
			position: absolute;
			bottom: 13%;
			left: 50%;
			transform: translateX(-50%);
			text-transform: uppercase;
			color: #bbb;
			font-size: 11px;
			font-family: 'Gotham-Book';
			line-height: 2em;
			letter-spacing: 1px;
		}

		footer {
			opacity: 0;
		}
	}
</style>