<template>
	<div :class="['webgl', 'experience']">
		<tooltip-comp :img="ttImg" :text="ttText" ref="tooltip"></tooltip-comp>
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
					img: '/images/tip1.gif',
					text: 'Placez votre curseur sur un élément pour le matérialiser.'
				}
			],
			ttImg: '',
			ttText: ''
		};
	},

	created() {
		Emitter.on('SHOW_TT', this.showTooltip.bind(this));
	},

	mounted() {
		this.scene = new Scene(this.$el);
		this.canvas = this.scene.renderer.domElement;
		this.$el.appendChild(this.canvas);

		this.scene.addCanvasElement(this.canvas);
	},

	methods: {
		showTooltip(tooltip) {
			tooltip--;
			this.ttImg = this.tooltips[tooltip].img;
			this.ttText = this.tooltips[tooltip].text;
			this.$refs.tooltip.show();
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
	}

	.experienceOn {
		cursor: none;
	}
</style>