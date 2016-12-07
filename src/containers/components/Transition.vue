<template>
	<div id="transition">
	</div>
</template>

<script>

import Emitter from '../../core/Emitter';

export default {

	data() {
		return {
			rtl_on: false,
			ltr_on: false
		};
	},

	mounted() {
		Emitter.on('TRANSITION_RTL', this.rtl_start);
		Emitter.on('TRANSITION_LTR', this.ltr_start);
	},

	watch: {
		'$parent.page': function(val) {
			if(this.rtl_on) {
				this.rtl_end();
			}
			else if(this.ltr_on) {
				this.ltr_end();
			}
		}
	},

	methods: {
		rtl_start(path) {
			this.rtl_on = true;
			TweenLite.fromTo(this.$el, .8, {
				left: '100%',
				width: '60%'
			}, {
				left: '0',
				width: '100%',
				ease: Power4.EaseInOut,
				onComplete: () => {
					this.$parent.page = path;
				}
			});
		},

		rtl_end() {
			TweenLite.to(this.$el, .8, {
				left: '-100%',
				width: '60%',
				ease: Power4.EaseInOut,
				onComplete: () => { this.rtl_on = false;}
			});
		},

		ltr_start(path) {
			this.ltr_on = true;
			TweenLite.fromTo(this.$el, .8, {
				left: '-100%',
				width: '60%',
			}, {
				left: '0',
				width: '100%',
				ease: Power4.EaseInOut,
				onComplete: () => {
					this.$parent.page = path;
				}
			});
		},

		ltr_end() {
			TweenLite.to(this.$el, .8, {
				left: '100%',
				width: '60%',
				ease: Power4.EaseInOut,
				onComplete: () => { this.ltr_on = false;}
			});
		}
	},

	components: {
	}
}

</script>

<style lang="sass">
	@import '../../stylesheets/variables.scss';
	#transition {
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		left: 100%;
		background: black;
		z-index: 4;
	}

</style>