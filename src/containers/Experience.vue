<template>
	<div id="experience">
		<header-comp :link="link" ref="header"></header-comp>
		<webgl-experience></webgl-experience>
		<footer-comp ref="footer"></footer-comp>
	</div>
</template>

<script>

import HeaderComponent from './components/Header';
import WebglExperienceComponent from './components/WebglExperience';
import FooterComponent from './components/Footer';

import Emitter from '../core/Emitter';

export default {

	data() {
		return {
			link: {
				path: 'text',
				text: 'Découvrir<br>l\'extrait',
				trans: 'RTL'
			}
		};
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
				opacity: 1
			}, 0);
		}
	},

	components: {
		'webgl-experience': WebglExperienceComponent,
		'footer-comp': FooterComponent,
		'header-comp': HeaderComponent
	}
}

</script>

<style lang="sass">
	@import '../stylesheets/variables.scss';

	#experience {
		header, footer {
			opacity: 0;
		}
	}

</style>