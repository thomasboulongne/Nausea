<template>
	<div id="app">
		<home-comp v-if="home"></home-comp>
		<experience-comp v-if="experience"></experience-comp>
	</div>
</template>

<script>

import Emitter from '../core/Emitter';
import Home from './Home';
import Experience from './Experience';

export default {
	data() {
		return {
			home: true,
			experience: false
		};
	},

	created() {
	},

	mounted() {

	},

	methods: {
	},

	components: {
		'home-comp': Home,
		'experience-comp': Experience
	}
}

</script>

<style lang="sass">
	@import '../stylesheets/variables.scss';

</style>