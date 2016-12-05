<template>
	<div id="app">
		<webgl-experience></webgl-experience>
		<footer-comp></footer-comp>
	</div>
</template>

<script>
	
import WebglExperienceComponent from './components/WebglExperience';
import FooterComponent from './components/Footer';

export default {

	data() {
		return {
			obj: true
		};
	},

	mounted() {
	},

	components: {
		'webgl-experience': WebglExperienceComponent,
		'footer-comp': FooterComponent
	}
}

</script>

<style lang="sass">
</style>