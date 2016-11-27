<template>
	<div id="app">
		<h1>
			Nausea
		</h1>
		<home-loading></home-loading>
		<webgl-home></webgl-home>
	</div>
</template>

<script>
	
import WebglHomeComponent from './components/WebglHome';
import HomeLoading from './components/HomeLoading';
import Emitter from '../core/Emitter';

export default {

	data() {
		return {
			obj: true
		};
	},

	mounted() {
		Emitter.on('GOTO_EXPERIENCE', this.redirectToExperience.bind(this));
	},

	methods: {
		'redirectToExperience': function(){
			this.$router.push('experience');
		} 
	},

	components: {
		'webgl-home': WebglHomeComponent,
		'home-loading': HomeLoading
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