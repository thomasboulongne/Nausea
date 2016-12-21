import AWDObject from './AWDObject';
// import { merge } from 'lodash';

class WebGLStore {
	
	constructor() {
		this.objects = {};

		this.models = [
			'bench',
			'chestnut',
			'fern',
			'fountain',
			'kiosque',
			'mineral',
			'sartre_bench_intro',
			'sartre_bench_xp',
			'sartres',
			'shrub',
			'stand',
			'statue',
			'streetLamp',
			'root',
			'root2',
			'root02'
		];

		this.loaded = false;
		this.initialized = false;

		this.init();
	}

	init() {
		let promises = [];
		for (let i = 0; i < this.models.length; i++) {
			promises.push(this.get(this.models[i], {name:this.models[i]}));
		}

		this.initialized = true;

		return Promise.all(promises)
		.then( () => {
			this.loaded = true;
		});
	}

	get(model, options) {
		return new Promise( resolve => {

			this.checkLoadedState(this.initialized)
			.then( () => {
				if(!this.objects[model]) {
					this.objects[model] = new AWDObject(model, options);
					this.objects[model].load()
					.then(() => {
						resolve(this.objects[model]);
					});
					
				}
				else {
					options.geometry = this.objects[model].geometry;
					let obj = new AWDObject(model, options);
					obj.load()
					.then(() => {
						resolve(obj);
					});
				}			
			});

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