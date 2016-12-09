import Emitter from '../core/Emitter';

class TimelineManager {

	/**
	 * @constructor
	 * param scene : experience scene
	 */
	constructor() {
		
	}

	addListeners() {
		Emitter.on('LEAVE_ZONE', (idZone) => {
			this.checkIdZone(idZone);
		});
	}

	init() {

	}

	// Zones

	checkIdZone(idZone) {
		switch (idZone) {
			case 1:
				// PLay sound, play with fog
				this.playEndZoneSound(0);
				break;
			case 4:
				// PLay sound, play with fog
				this.playEndZoneSound(1);
				break;
			default:
				break;
		}
	}

}

export default TimelineManager;