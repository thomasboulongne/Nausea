<template>
	<header>
		<img src="/images/logo_sm.png" alt="Nausea" id="logo">
		<div id="discover" :class="clicked ? 'hover' : ''" @mouseenter="hoverSound">
			<a :href="'/'" @click="discoverClick($event)" v-html="link.text"></a>
			<div class="icon" @click="discoverClick($event)"></div>
			<div class="lines" @click="discoverClick($event)">
				<div class="line-holder"></div>
				<div class="line" ref="line"></div>
			</div>
		</div>
	</header>
</template>

<script>

import Emitter from '../../core/Emitter';
import SoundManager from '../../sound/SoundManager';

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
		this.tl.to(this.$refs.line, .3, {
			right: '0'
		})
		.to(this.$refs.line, .3, {
			left: '100%',
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
			this.tl.restart();
			SoundManager.play('tick');
		},

		hoverSound() {
			SoundManager.play('hover_button');
		}
	},

	components: {
	}
}

</script>

<style lang="sass">
	@import '../../stylesheets/variables.scss';

	#logo {
		position: absolute;
		top: 5vh;
		left: 5vh;
		z-index: 2;
		width: 8vw;
	}

	#discover {
		position: absolute;
		top: 5vh;
		right: 0;
		display: flex;
		align-items: center;
		z-index: 2;
		a {
			margin-right: 1em;
			color: $main-color;
			cursor: pointer;
			transition: all .5s;
			text-align: right;
			span {
				display: block;
				font-style: italic;
			}
		}
		.icon {
			cursor: pointer;
			position: relative;
			z-index: 3;
			$icon-size: 10px;
			height: $icon-size;
			width: $icon-size;
			border: solid $main-color 1px;
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
				background: $main-color;
				transition: all .5s;
			}
		}

		.lines {
			cursor: pointer;
			position: relative;
			width: 5vw;
			height: 2px;
			transition: all .5s;
		}

		.line-holder {
			width: 100%;
			height: 100%;
			background: $second-color;
		}
		
		.line {
			position: absolute;
			transform: translateY(-50%);
			content: '';
			left: 0;
			right: 100%;
			top: 1px;
			bottom: -1px;
			background: black;
			box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.75);
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
			}
		}
	}
</style>