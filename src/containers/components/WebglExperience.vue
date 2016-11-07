<template>
	<div class="webgl">
		<div class="crosshair">+</div>
	</div>
</template>

<script>
	
import Scene from '../../webgl/Scene';

export default {

	data() {
		return {
			obj: true
		};
	},

	mounted() {
		const root = this.$el;
		this.scene = new Scene(root);
		root.appendChild(this.scene.renderer.domElement);
	}
}

</script>

<style lang="sass">
	canvas {
		position: absolute;
		top: 0;
		left: 0;
	}

	.crosshair {
		position: fixed;
		color: black;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
	}
</style>