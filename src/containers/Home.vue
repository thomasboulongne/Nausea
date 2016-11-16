<template>
	<div id="app">
		<h1>
			Nausea
		</h1>
		<webgl-home></webgl-home>
	</div>
</template>

<script>
	
import WebglHomeComponent from './components/WebglHome';

export default {

	data() {
		return {
			obj: true
		};
	},

	mounted() {
	},

	methods: {
		'redirectToExperience': function(){
			this.$router.push('experience');
		} 
	},

	components: {
		'webgl-home': WebglHomeComponent
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