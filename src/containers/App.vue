<template>
	<div id="app">
		<router-view></router-view>
		<transition></transition>
	</div>
</template>

<script>

import Router from '../core/Router';
import Transition from './components/Transition';

export default {
	data() {
		return {
		};
	},

	created() {
	},

	mounted() {
	},

	methods: {
	},

	components: {
		'transition': Transition
	}
}

</script>

<style lang="sass">
	@import '../stylesheets/variables.scss';

</style>