<template>
	<div :class="['webgl', 'experience']">
		<tooltip-comp :img="ttImg" :text="ttText" ref="tooltip"></tooltip-comp>
		<div class="chapter" ref="chapter">
			<div class="counter" ref="counter">Chap. {{chapter.number}}/IV</div>
			<div class="name" ref="name">{{chapter.name}}</div>
		</div>
	</div>
</template>

<script>
	
import Scene from '../../webgl/ExperienceScene';
import Tooltip from './Tooltip';
import Emitter from '../../core/Emitter';

export default {

	data() {
		return {
			obj: true,
			tooltips: [
				{
					img: '/images/tip2.gif',
					text: 'Placez votre curseur sur un élément pour le matérialiser.'
				},
				{
					img: '/images/tip2.gif',
					text: 'Placez votre curseur sur un élément pour le matérialiser.'
				}
			],
			ttImg: '',
			ttText: '',
			chapter: {
				number: '',
				name: ''
			}
		};
	},

	created() {
		Emitter.on('SHOW_TT', this.showTooltip.bind(this));
		Emitter.on('HIDE_TT', this.hideTooltip.bind(this));
		Emitter.on('ENTER_ZONE', this.showChapter.bind(this));
	},

	mounted() {
		this.scene = new Scene(this.$el);
		this.canvas = this.scene.renderer.domElement;
		this.$el.appendChild(this.canvas);

		this.scene.addCanvasElement(this.canvas);

		this.tl = new TimelineLite({paused: true});
		this.tl.set(this.$refs.chapter, {
			display: 'block'
		})
		.staggerTo([this.$refs.counter, this.$refs.name], 1, {
			opacity: 1,
			y:0,
			onComplete: () => setTimeout(() => this.tl.reverse(), 1500)
		}, .3);
	},

	methods: {
		showTooltip(tooltip) {
			tooltip--;
			this.ttImg = this.tooltips[tooltip].img;
			this.ttText = this.tooltips[tooltip].text;
			this.$refs.tooltip.show();
		},

		hideTooltip(tooltip) {
			tooltip--;
			this.$refs.tooltip.hide();
		},

		showChapter(name, number) {
			switch(number) {
				case 1:
					this.chapter.number = 'I';
					break;
				case 2:
					this.chapter.number = 'II';
					break;
				case 3:
					this.chapter.number = 'III';
					break;
				case 4:
					this.chapter.number = 'IV';
					break;
			}

			this.chapter.name = name;

			this.tl.play();
		}

	},

	components: {
		'tooltip-comp': Tooltip
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

		.chapter {
			position: absolute;
			display: none;
			top: 40%;
			left: 50%;
			transform: translate(-50%, -50%);
			text-align: center;
			z-index: 1;
			.counter {
				font-size: 36px;
				display: block;
				opacity: 0;
				transform: translateY(100%);
				color: #7e7e7e;
			}
			.name {
				margin-top: .3em;
				font-size: 72px;
				display: block;
				opacity: 0;
				transform: translateY(100%);
				color: #585858;
			}
		}
	}

	.experienceOn {
		cursor: none;
	}
</style>