<template>
	<div id="loading">
		<div class="bar-wrapper">
			<span ref="bar"></span>
		</div>
	</div>
</template>

<script>
	
import Emitter from '../../core/Emitter';

export default {

	data() {
		return {
			state: 0
		};
	},

	mounted() {
		Emitter.on('OBJ_LOADED', this.updateLoading);
	},

	methods: {
		updateLoading(item, loaded, total) {
			this.state = loaded / total;
			TweenLite.to(this.$refs.bar, 1, { width: this.state * 100 + '%'});
			if (this.state == 1) {
				TweenLite.to(this.$el, 1, {opacity: 1 - this.state, delay: 2});
			}
		}
	}
}

</script>

<style lang="sass">
	#loading {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 2;
		background-color: #000000;
		opacity: 1;
		
		.bar-wrapper {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			display: inline-block;
			border: 1px white solid;
			width: 10vw;
			height: 0.3vh;
			background-color: transparent;
			span {
				position: absolute;
				left: 0;
				top: 0;
				height: 100%;
				width: 0;
				background-color: white;
			}
		}
	}
</style>