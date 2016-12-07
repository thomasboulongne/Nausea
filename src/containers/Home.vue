<template>
	<div id="home">
		<home-loading></home-loading>
		<webgl-home></webgl-home>
		<div class="enter-button" ref="enter">
			Entrer
		</div>
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
			this.$router.push('experience');
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
					opacity: .85,
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
	
	#home {
		.enter-button {
			position: absolute;
			top: 55%;
			left: 50%;
			transform: translate(-50%, -50%);
			text-transform: uppercase;
			color: $white;
			font-size: 13px;
			letter-spacing: 2.3px;
			font-family: 'BaskervilleMT';
			opacity: 0;
			text-shadow: 0px 0px 15px black;
			&:before {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%) rotate(45deg);
				content: '';
				height: 12vh;
				width: 12vh;
				box-shadow: inset 0px 0px 10px 1px rgba(0,0,0,0.3);
			}
			&:after {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%) rotate(45deg);
				border: solid 1px $white;
				content: '';
				height: 12vh;
				width: 12vh;
				box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.3);
			}
		}

		footer {
			opacity: 0;
		}
	}
</style>