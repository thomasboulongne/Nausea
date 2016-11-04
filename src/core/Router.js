import Home from '../containers/Home';
import VueRouter from 'vue-router';

Vue.use( VueRouter );

class Router extends VueRouter {

	constructor() {

		let routes = [
			{ path: '/', component: Home }
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