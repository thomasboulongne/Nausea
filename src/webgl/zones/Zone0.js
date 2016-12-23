import Zone from './Zone';
import Store from '../WebGLStore';

class Zone0 extends Zone {

	init() {
		return new Promise( resolve => {

			Promise.all([
				Store.get('root2',{ 
					'name': 'root0', 
					'color': 0xcacaca,
					'x': 0,
					'y': -2,
					'z': 5,
					'scale': 1,
					'rotx': -.05,
					'roty': Math.PI / 2,
					'rotz': 0,
					'opacity': 1
				}),

				Store.get('root',{ 
					'name': 'root3', 
					'color': 0xcacaca,
					'x': -.9,
					'y': -2.8,
					'z': 7,
					'scale': 1,
					'rotx': -.05,
					'roty': Math.PI / 1.8,
					'rotz': 0,
					'opacity': 1
				}),

				Store.get('root02',{ 
					'name': 'root2', 
					'color': 0xcacaca,
					'x': .6,
					'y': -2.8,
					'z': 7,
					'scale': 1,
					'rotx': -.15,
					'roty': Math.PI / 2.4,
					'rotz': 0,
					'opacity': 1
				}),

				Store.get('root02',{ 
					'name': 'root5', 
					'color': 0xcacaca,
					'x': -1.6,
					'y': -2.8,
					'z': 8,
					'scale': 1,
					'rotx': -.05,
					'roty': Math.PI / 1.2,
					'rotz': 0,
					'opacity': 1
				}),

				Store.get('root02',{ 
					'name': 'root1', 
					'color': 0xcacaca,
					'x': -.6,
					'y': -2.8,
					'z': 10,
					'scale': 1,
					'rotx': -.12,
					'roty': Math.PI / 1.8,
					'rotz': 0,
					'opacity': 1
				}),

				Store.get('root',{ 
					'name': 'root4', 
					'color': 0xcacaca,
					'x': .6,
					'y': -2.8,
					'z': 11,
					'scale': 1,
					'rotx': -.05,
					'roty': Math.PI / 2.2,
					'rotz': 0,
					'opacity': 1
				}),
				Store.get('sartre_bench_xp',{
					'name' : 'sartre-bench',
					'x' : 0,
					'y' : 0,
					'z' : 0.2,
					'scale' : 1,
					'rotx' : 0,
					'roty' : 270,
					'rotz' : 0,
					'color': 0xcacaca,
					'opacity': 1
				})
			])
			.then( objs => {
				this.roots = objs.slice(0, -1);
				super.init(objs);
				this.initRootsTl();
				resolve();
			});
		});
	}

	initRootsTl() {

		this.rootsTl = new TimelineLite({paused:true});

		this.rootsTl
		.to(this.roots[0].mesh.position, 4, {
			delay: 5,
			y: -.3
		},0)
		.to(this.roots[0].mesh.scale, 4, {
			x: 3,
			y: 3,
			z: 3
		}, 0);

		this.rootsTl
		.to(this.roots[1].mesh.position, 4, {
			delay: 8,
			y: -.24
		}, 1)
		.to(this.roots[1].mesh.scale, 4, {
			delay: 8,
			x: 3,
			y: 3,
			z: 3
		}, 1);

		this.rootsTl
		.to(this.roots[2].mesh.position, 4, {
			delay: 7,
			y: 0
		}, 2)
		.to(this.roots[2].mesh.scale, 4, {
			delay: 7,
			x: 3,
			y: 3,
			z: 3
		}, 2);

		this.rootsTl
		.to(this.roots[3].mesh.position, 4, {
			delay: 5,
			y: .02
		}, 3)
		.to(this.roots[3].mesh.scale, 4, {
			delay: 5,
			x: 2,
			y: 2,
			z: 2
		}, 3);

		this.rootsTl
		.to(this.roots[4].mesh.position, 4, {
			delay: 6,
			y: .15
		}, 4)
		.to(this.roots[4].mesh.scale, 4, {
			delay: 6,
			x: 3,
			y: 3,
			z: 3
		}, 4);

		this.rootsTl
		.to(this.roots[5].mesh.position, 4, {
			delay: 6,
			y: .15
		}, 5)
		.to(this.roots[5].mesh.scale, 4, {
			delay: 6,
			x: 3,
			y: 3,
			z: 3
		}, 5);
	}

	initTimeline() {
		//Prevent calling super.initTimeline();
		return true;
	}

}

export default Zone0;