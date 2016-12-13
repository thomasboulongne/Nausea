import Router from './core/Router';

import './stylesheets/main.scss';

import 'normalize.css';

import domready from 'domready';

import App from './containers/App';

class Main {

	constructor() {

		this.app = new Vue({
			el: '#application',
			router: Router,
			render: h => h('app'),
			components: {
				'app': App
			} 
		});
	}

	bind() {}

	addEventListeners() {}
}

domready(() => {

	new Main();

});