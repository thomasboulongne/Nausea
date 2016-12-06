<template>
	<div id="discover" :class="clicked ? 'hover' : ''">
		<a :href="'/' + link.path" @click="discoverClick($event)" v-html="link.text"></a>
		<div class="icon"></div>
		<div class="lines">
			<div class="line" ref="line"></div>
			<div class="line-holder"></div>
		</div>
	</div>
</template>

<script>

import Emitter from '../../core/Emitter';

export default {

	data() {
		return {
			tl: new TimelineLite(),
			clicked: false
		};
	},

	props: [
		'link'
	],

	mounted() {
		this.tl.to(this.$refs.line, 2.5, {
			x: '150%',
			onComplete: () => {
				Emitter.emit('TRANSITION_' + this.link.trans, this.link.path);
			}
		});
		this.tl.pause();
	},

	methods: {
		discoverClick(event) {
			event.preventDefault();
			this.clicked = true;
			this.tl.play();
		}
	},

	components: {
	}
}

</script>

<style lang="sass">
	@import '../../stylesheets/variables.scss';

	#discover {
		position: absolute;
		top: 5vh;
		right: 0;
		display: flex;
		align-items: center;
		z-index: 2;
		a {
			margin-right: 1em;
			color: $second-color;
			cursor: pointer;
			transition: all .5s;
			span {
				display: block;
				font-style: italic;
			}
		}
		.icon {
			$icon-size: 10px;
			height: $icon-size;
			width: $icon-size;
			border: solid $second-color 1px;
			transform-origin: center;
			transform: rotate(45deg);
			transition: all .5s;
			&:after {
				content: '';
				height: calc(#{$icon-size} / 2.5);
				width: calc(#{$icon-size} / 2.5);
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				background: $second-color;
				transition: all .5s;
			}
		}

		.lines {
			position: relative;
			width: 5vw;
			height: 2px;
			transition: all .5s;
			overflow: hidden;
		}

		.line-holder {
			width: 100%;
			height: 100%;
			background: $second-color;
		}
		
		.line {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-150%, -50%);
			content: '';
			width: 100%;
			height: 100%;
			background: red;
		}

		&:hover, &.hover {
			a {
				color: $main-color;
			}

			.icon {
				border-color: $main-color;
				transform: rotate(45deg) scale(1.1);
				&:after {
					background: $main-color;
				}
			}

			.lines {				
				transform: translateX(2px);
				width: 7vw;
			}

			.line-holder {
				background: $main-color;
			}
		}
	}
</style>