<template>
	<div id="app">
		<header-comp :link="link"></header-comp>
		<webgl-experience></webgl-experience>
		<footer-comp></footer-comp>
	</div>
</template>

<script>

import HeaderComponent from './components/Header';
import WebglExperienceComponent from './components/WebglExperience';
import FooterComponent from './components/Footer';

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
	},

	methods: {
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

</style>