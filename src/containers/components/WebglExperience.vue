<template>
	<div :class="['webgl', 'experience']" @click="enterExperience">
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

		this.addEventListeners();
	},

	methods: {
		enterExperience: function() {
			this.scene.toggleCamera();

			this.canvas.requestPointerLock = this.canvas.requestPointerLock || this.canvas.mozRequestPointerLock;

			this.canvas.requestPointerLock();
		},
		exitExperience: function() {
			this.scene.toggleCamera();
		},
		pointerLockChange: function() {
			if(document.pointerLockElement === this.canvas ||	document.mozPointerLockElement === this.canvas) {
			}
			else {
				this.exitExperience();
			}
		},
		addEventListeners: function() {
			document.addEventListener('pointerlockchange', this.pointerLockChange, false);
		}
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