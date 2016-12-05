import Router from './core/Router';

import './stylesheets/main.scss';

import 'normalize.css';

import domready from 'domready';

class Main {

	constructor() {

		this.router = Router;

		this.app = new Vue({
			el: '#application',
			router: this.router,
			render: h => h('router-view')
		});
	}

	bind() {}

	addEventListeners() {}
}

domready(() => {

	new Main();

});