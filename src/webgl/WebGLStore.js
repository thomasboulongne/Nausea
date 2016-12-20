import AWDObject from './AWDObject';
// import { merge } from 'lodash';

class WebGLStore {
	
	constructor() {
		this.objects = {};

		this.models = [
			{
				'name': 'bench',
				'materialize': true
			},
			{
				'name': 'chestnut',
				'materialize': true
			},
			{
				'name': 'fern',
				'materialize': true
			},
			{
				'name': 'fountain',
				'materialize': true
			},
			{
				'name': 'kiosque',
				'materialize': true
			},
			{
				'name': 'mineral',
				'materialize': true
			},
			{
				'name': 'sartre_bench_intro',
				'materialize': false
			},
			{
				'name': 'sartre_bench_xp',
				'materialize': false
			},
			{
				'name': 'sartres',
				'materialize': true
			},
			{
				'name': 'shrub',
				'materialize': false
			},
			{
				'name': 'stand',
				'materialize': true
			},
			{
				'name': 'statue',
				'materialize': true
			},
			{
				'name': 'streetLamp',
				'materialize': false
			},
			{
				'name': 'root',
				'materialize': false
			},
			{
				'name': 'root2',
				'materialize': false
			},
			{
				'name': 'root02',
				'materialize': false
			}
		];

		this.loaded = false;
		this.initialized = false;

		this.init();
	}

	init() {
		let promises = [];
		for (let i = 0; i < this.models.length; i++) {
			promises.push(this.get(this.models[i].name, this.models[i]));
		}

		this.initialized = true;

		return Promise.all(promises)
		.then( () => {
			this.loaded = true;
		});
	}

	get(model, options) {
		return this.checkLoadedState(this.initialized)
		.then( () => {
			if(!this.objects[model]) {
				this.objects[model] = new AWDObject(model, options);
				return ( new Promise( resolve => {
					this.objects[model].load()
					.then(() => {
						resolve(this.objects[model]);
					});
				}));
			}
			else {
				return ( new Promise( resolve => {
					options.geometry = this.objects[model].geometry;
					options.material = this.objects[model].material;
					options.materialize = this.objects[model].options.materialize;
					let obj = new AWDObject(model, options);
					obj.load()
					.then(() => {
						resolve(this.objects[model]);
					});
					resolve(obj);
				}));
			}			
		});
	}

	checkLoadedState(initialized) {
		return new Promise( resolve => {
			let interval = setInterval( () => {
				if(this.loaded == true || initialized == false) {
					clearInterval(interval);
					resolve('LOADED');
				}
			});
		});
	}
}

const Store = new WebGLStore();

export default Store;