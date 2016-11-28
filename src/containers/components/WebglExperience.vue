<template>
	<div :class="['webgl']" @click="enterExperience">
		<div class="crosshair">+</div>
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
	canvas {
		position: absolute;
		top: 0;
		left: 0;
	}

	.experienceOn {
		cursor: none;
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