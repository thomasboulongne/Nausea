<template>
	<div class="tooltip">
		<img :src="img" alt="" ref="img">
		<span ref="text">{{text}}</span>
	</div>
</template>

<script>
import SoundManager from '../../sound/SoundManager';

export default {

	data() {
		return {
		};
	},

	props: [
		'img',
		'text'
	],

	mounted() {
		this.tlShow = new TimelineLite();
		this.tlShow.pause();
		this.tlShow.to(this.$el, .5, {
			display: 'flex',
			width: '310px'
		})
		.to([this.$refs.img, this.$refs.text], 0.4, {
			display: 'block',
			opacity: 1,
			y: 0
		})
		.to(this.$el, 1, {
			top: '10%',
			ease: Power3.easeInOut
		}, 4);

		this.tlHide = new TimelineLite();
		this.tlHide.pause();
		this.tlHide.to([this.$refs.img, this.$refs.text], 0.2, {
			opacity: 0,
			y: '10%'
		})
		.to(this.$el, .3, {
			width: 0,
			ease: Power3.easeInOut,
		}, .2)
		.set([this.$refs.img, this.$refs.text], {
			display: 'none',
		})
		.set(this.$el, {
			display: 'none',
			top: '50%'
		});
	},

	beforeDestroy() {
	},

	methods: {
		show() {
			SoundManager.play('tip');
			this.tlShow.play();
		},

		hide() {
			this.tlHide.play();
		}
	}
}

</script>

<style lang="sass">
	@import '../../stylesheets/variables.scss';
	
	.tooltip {
		display: none;
		align-items: center;
		z-index: 2;
		width: 0;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: $white-bright;
		padding: 1.5em;
		font-family: 'BaskervilleMT';
		box-shadow: 0 0 10px 4px rgba(170, 170, 170, 0.5);
		img {
			height: 3em;
			margin-right: 1.5em;
			display: none;
		}
		span {
			display: none;
			flex-grow: 1;
		}
	}
</style>