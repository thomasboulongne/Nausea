<template>
	<div :class="['webgl']">
		<router-link to="/experience" id="goToExperience"></router-link>	
	</div>
</template>

<script>
	
import Scene from '../../webgl/HomeScene';

export default {

	data() {
		return {
			obj: true
		};
	},

	mounted() {
		this.scene = new Scene(this.$el);
		this.canvas = this.scene.renderer.domElement;
		this.$el.appendChild(this.canvas);
	},

	methods: {
	}
}

</script>

<style lang="sass">
	canvas {
		position: absolute;
		top: 0;
		left: 0;
		cursor: url('/assets2d/cursor.png'), auto;
	}

	a#goToExperience {
		position: absolute;
		top: 47%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: inline-block;
		width: 19vw;
		height: 12vh;
		z-index: 1;
	}
</style>