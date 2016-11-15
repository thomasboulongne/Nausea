<template>
	<div :class="['webgl']">
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
	}
</style>