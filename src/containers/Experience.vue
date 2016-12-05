<template>
	<div id="app">
		<h1>
			Nausea
		</h1>
		<webgl-experience></webgl-experience>
	</div>
</template>

<script>
	
import WebglExperienceComponent from './components/WebglExperience';

export default {

	data() {
		return {
			obj: true
		};
	},

	mounted() {
	},

	components: {
		'webgl-experience': WebglExperienceComponent
	}
}

</script>

<style lang="sass">
	#app h1 {
		color: black;
		opacity: .1;
		position: absolute;
		top: 1vh;
		left: 50%;
		transform: translateX(-50%);
		margin: 0;
		z-index: 1;
	}
</style>