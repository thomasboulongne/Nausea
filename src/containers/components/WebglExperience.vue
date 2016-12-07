<template>
	<div :class="['webgl', 'experience']">
	</div>
</template>

<script>
	
import Scene from '../../webgl/ExperienceScene';

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

		this.scene.addCanvasElement(this.canvas);
	},

	methods: {
	}
}

</script>

<style lang="sass">
	.experience 
	{
		canvas {
			position: absolute;
			top: 0;
			left: 0;
			opacity: 0;
		}
	}

	.experienceOn {
		cursor: none;
	}
</style>