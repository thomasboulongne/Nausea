<template>
	<div id="experience">
		<header-comp :link="link" ref="header"></header-comp>
		<webgl-experience v-show="page == 'experience'" ref="gl"></webgl-experience>
		<text-comp v-show="page == 'text'"></text-comp>
		<footer-comp ref="footer"></footer-comp>
		<transition></transition>
	</div>
</template>

<script>

import HeaderComponent from './components/Header';
import WebglExperienceComponent from './components/WebglExperience';
import FooterComponent from './components/Footer';
import TextComponent from './Text';
import Transition from './components/Transition';

import Emitter from '../core/Emitter';

export default {

	data() {
		return {
			page: 'experience'
		};
	},

	computed: {
		link: function() {
			switch(this.page) {
				case 'experience':
					if(this.$refs.gl)
						this.$refs.gl.scene.enabledRaycast = true;
					return {
						path: 'text',
						text: 'Découvrir<br>l\'extrait',
						trans: 'RTL'
					};
					break;
				case 'text':
					if(this.$refs.gl)
						this.$refs.gl.scene.enabledRaycast = false;
					return {
						text: 'Retour <br />à l\'expérience',
						path: 'experience',
						trans: 'LTR'
					};
					break;
			}
		}
	},

	mounted() {
		this.addEventListeners();
	},

	methods: {
		addEventListeners() {
			Emitter.on('INTRO_END', this.showComponents.bind(this));
		},

		showComponents() {
			let tl = new TimelineLite();

			tl.to(this.$refs.header.$el, 1.5, {
				opacity: 1
			})
			.to(this.$refs.footer.$el, 1.5, {
				opacity: 1,
				y: 0
			}, 0);
		}
	},

	components: {
		'transition': Transition,
		'webgl-experience': WebglExperienceComponent,
		'footer-comp': FooterComponent,
		'header-comp': HeaderComponent,
		'text-comp': TextComponent
	}
}

</script>

<style lang="sass">
	@import '../stylesheets/variables.scss';

	#experience {
		header, footer {
			z-index: 2;
			opacity: 0;
		}

		footer {
			transform: translateY(60%);
		}
	}

</style>