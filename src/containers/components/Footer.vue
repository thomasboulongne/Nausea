<template>
	<footer>
		<div class="left">
			<a href="http://gobelins.fr">
				<img src="/images/gobelins.svg" alt="Gobelins, l'école de l'image" target="_blank">
			</a>
			<router-link :to="{ path: 'home' }"><span>À propos</span></router-link>
			<router-link :to="{ path: 'home' }"><span>Credits</span></router-link>
			<p class="cop">Copyright © 2016 Nausea - Tous droits réservés</p>
		</div>
		<div class="right">
			<span @click="emit('TOGGLE_3D')"><img src="/images/vr.svg" alt="3D"></span>
			<span @click="emit('TOGGLE_FULLSCREEN')"><img src="/images/fullscreen.svg" alt=""></span>
			<span @click="emit('TOGGLE_SOUND')"><img src="/images/Sound.gif" alt=""></span>
		</div>
	</footer>
</template>

<script>
	
import Emitter from '../../core/Emitter';

export default {

	data() {
		return {
		};
	},

	mounted() {
		Emitter.on('TOGGLE_SOUND', () => {
			console.log('sound');
		});
	},

	methods: {
		emit(param) {
			Emitter.emit(param);
		}
	}
}

</script>

<style lang="sass">
	@import '../../stylesheets/variables.scss';

	footer {
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		height: 60px;
		background: white;
		z-index: 1;
		display: flex !important;
		justify-content: space-between;
		align-items: center;
		.left, .right {
			display: inline-flex;
			align-items: center;
		}
		.right {
			span {
				margin-right: 2em;
			}
		}
		a {
			span:after {
				content: '◆';
				margin: 0 2em; 
				display: inline-block;
				font-size: 12px;
			}
			img {
				margin: 0 3em;
			}
		}
		span {
			img {
				max-height: 18px;
			}
		}
		p.cop {
			display: inline;
			color: $second-color;
			font-size: 12px;
		}
	}
</style>