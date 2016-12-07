<template>
	<div id="text">
		<div id="content">
			<h1>Extrait de <i>La Nausée</i></h1>
			<h3>Jean-Paul Sartres, 1963</h3>
			<p>	Donc j'étais tout à l'heure au Jardin public. La racine du marronnier s'enfonçait dans la terre, juste au-dessous de mon banc. Je ne me rappelais plus que c'était une racine. Les mots s'étaient évanouis et, avec eux, la signification des choses, leurs modes d'emploi, les faibles repères que les hommes ont tracés à leur surface. J'étais assis, un peu voûté, la tête basse, seul en face de cette masse noire et noueuse, entièrement brute et qui me faisait peur.</p>
			<p>Et puis j'ai eu cette illumination.</p>
			<p>Ça m'a coupé le souffle. Jamais, avant ces derniers jours, je n'avais pressenti ce que voulait dire « exister ». J'étais comme les autres, comme ceux qui se promènent au bord de la mer dans leurs habits de printemps. Je disais comme eux « la mer est verte ; ce point blanc, là-haut, c'est une mouette », mais je ne sentais pas que ça existait, que la mouette était une mouette existante » ; à l'ordinaire l'existence se cache. Elle est là, autour de nous, en nous, elle est nous, on ne peut pas dire deux mots sans parler d'elle et, finalement, on ne la touche pas. Quand je croyais y penser, il faut croire que je ne pensais à rien, j'avais la tête vide, ou tout juste un mot dans la tête, le mot « être ». Ou alors, je pensais... comment dire ? Je pensais l'appartenance, je me disais que la mer appartenait à la classe des objets verts ou que le vert faisait partie des qualités de la mer. Même quand je regardais les choses, j'étais à cent lieues de songer qu'elles existaient : elles m'apparaissaient comme un décor. Je les prenais dans mes mains, elles me servaient d'outils, je prévoyais leurs résistances.</p>
		</div>
	</div>
</template>

<script>
	
import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';
import Emitter from '../core/Emitter';

export default {

	data() {
		return {
		};
	},

	mounted() {
		Emitter.on('GOTO_EXPERIENCE', this.redirectToExperience.bind(this));
	},

	methods: {
		'redirectToExperience': function(){
		} 
	},

	components: {
		'header-comp': HeaderComponent,
		'footer-comp': FooterComponent
	}
}

</script>

<style lang="sass">
	@import '../stylesheets/variables.scss';

	#text {
		background-image: url(/images/Sartre.png);
		background-repeat: no-repeat;
		background-size: 80vh auto;
		background-position: top left; 
		footer {
		    box-shadow: 0px -20px 130px 40px rgba(255,255,255,1);
		}
	}

	#content {
		width: 45vw;
		padding: 15vh 0 15vh 28vw;
		h1 {
			font-size: 50px;
			margin: 0 0 0.3em 0;
		}
		h3 {
			font-size: 29px;
			color: $second-color;
			margin-top: 0;
			margin-bottom: 2em;
		}
		p {
			font-size: 22px;
			margin-left: 3.5em;
			text-indent: 1em;
			line-height: 40px;
			color: $text-color;
			font-family: 'Baskerville';
		}
	}
</style>