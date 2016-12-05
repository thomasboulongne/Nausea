import AWDObject from './AWDObject';

class WebGLStore {
	
	constructor() {
		this.objects = {};
	}

	get(model, options) {

		if(!this.objects[model]) {
			this.objects[model] = new AWDObject(model, options);
			return new Promise( resolve => {
				this.objects[model].load()
				.then(() => {
					resolve(this.objects[model]);
				});
			});
		}
		else {
			return new Promise( resolve => {
				options.geometry = JSON.parse(JSON.stringify(this.objects[model].geometry));
				options.material = JSON.parse(JSON.stringify(this.objects[model].material));
				let obj = new AWDObject(model, options);
				resolve(obj);
			});
		}
	}
}

const Store = new WebGLStore();

export default Store;