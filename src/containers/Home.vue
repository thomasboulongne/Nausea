<template>
	<div id="app">
		<home-loading></home-loading>
		<webgl-home></webgl-home>
		<footer-comp></footer-comp>
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
		'home-loading': HomeLoadingComponent,
		'footer-comp': FooterComponent
	}
}

</script>

<style lang="sass">
</style>