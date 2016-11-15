import Home from '../containers/Home';
import Experience from '../containers/Experience';
import VueRouter from 'vue-router';

Vue.use( VueRouter );

class Router extends VueRouter {

	constructor() {

		let routes = [
			{ path: '/', component: Home },
			{ path: '/experience', component: Experience }
		];

		super({
			mode: 'history',
			base: '/',
			routes: routes
		});

	}
}

export default new Router;