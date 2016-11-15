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
			hashbang: false,
			pushState: true,
			history: true,
			abstract: false,
			saveScrollPosition: false,
			transitionOnLoad: false,
			routes: routes
		});


		this.path = '/';
		this.firstRoute = true;
		this.routeTimeout = null;

	}
}

export default new Router;