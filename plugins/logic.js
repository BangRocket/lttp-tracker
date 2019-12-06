import { store } from '../store/store.js'

export var Logic = {
	canLiftRocks () {
		return store.state.trackerData.items.glove >= 1
	},
	canLiftDarkRocks () {
		return store.state.trackerData.items.glove === 2
	},
	canLightTorches () {
		return store.state.trackerData.items.firerod || store.state.trackerData.items.lantern
	},
	canMeltThings () {
		return store.state.trackerData.items.firerod || (store.state.trackerData.items.bombos && store.state.trackerData.items.sword >= 1)
	},
	canFly (logic = 'glitchless') {
		return (
			store.state.trackerData.items.flute &&
			(logic !== 'inverted' || (this.canEnterLightWorld(logic, false, false) && store.state.trackerData.items.moonpearl))
		)
	},
	canSpinSpeed () {
		return store.state.trackerData.items.boots && (store.state.trackerData.items.sword >= 1 || store.state.trackerData.items.hookshot)
	},
	canShootArrows () {
		return store.state.trackerData.items.bow
	},
	canBlockLasers () {
		return store.state.trackerData.items.shield === 3
	},
	canExtendMagic () {
		return store.state.trackerData.items.mpupgrade >= 1 || store.state.trackerData.items.bottle >= 1
	},
	glitchedLinkInDarkWorld () {
		return store.state.trackerData.items.moonpearl || store.state.trackerData.items.bottle >= 1
	},
	canGoBeatAgahnim1 (allowOutOfLogicGlitches, logic = 'glitchless') {
		if (logic === 'inverted') {
			return (
				!store.state.trackerData.items.agahnim &&
				(store.state.trackerData.items.lantern || allowOutOfLogicGlitches) &&
				store.state.trackerData.items.sword >= 1 &&
				this.canEnterDarkWorldDeathMountain('inverted', allowOutOfLogicGlitches)
			)
		} else {
			return (
				!store.state.trackerData.items.agahnim &&
				(store.state.trackerData.items.lantern || allowOutOfLogicGlitches) &&
				(store.state.trackerData.items.cape || store.state.trackerData.items.sword >= 2) &&
				store.state.trackerData.items.sword >= 1
			)
		}
	},
	canEnterLightWorld (logic, agahnimCheck, allowOutOfLogicGlitches) {
		return (
			logic !== 'inverted' ||
			(store.state.trackerData.items.agahnim ||
				(agahnimCheck && this.canGoBeatAgahnim1(allowOutOfLogicGlitches, 'inverted')) ||
				((this.canLiftDarkRocks() || (store.state.trackerData.items.hammer && this.canLiftRocks())) &&
					store.state.trackerData.items.moonpearl))
		)
	},
	canEnterNorthEastDarkWorld (logic, agahnimCheck, allowOutOfLogicGlitches) {
		if (logic === 'majorGlitches') {
			return (
				store.state.trackerData.items.agahnim ||
				(agahnimCheck && this.canGoBeatAgahnim1(allowOutOfLogicGlitches)) ||
				(store.state.trackerData.items.moonpearl &&
					((this.canLiftDarkRocks() && (store.state.trackerData.items.boots || store.state.trackerData.items.flippers)) ||
						(store.state.trackerData.items.hammer && this.canLiftRocks()))) ||
				(this.canEnterWestDeathMountain(logic, allowOutOfLogicGlitches) &&
					(store.state.trackerData.items.bottle >= 1 ||
						(store.state.trackerData.items.mirror && this.canSpinSpeed()) ||
						(store.state.trackerData.items.moonpearl &&
							(store.state.trackerData.items.mirror || store.state.trackerData.items.boots))))
			)
		} else if (logic === 'owGlitches') {
			return (
				store.state.trackerData.items.agahnim ||
				(agahnimCheck && this.canGoBeatAgahnim1(allowOutOfLogicGlitches)) ||
				(store.state.trackerData.items.moonpearl &&
					((this.canLiftDarkRocks() && (store.state.trackerData.items.boots || store.state.trackerData.items.flippers)) ||
						(store.state.trackerData.items.hammer && this.canLiftRocks()))) ||
				(this.canEnterWestDeathMountain(logic, allowOutOfLogicGlitches) &&
					((store.state.trackerData.items.mirror && this.canSpinSpeed()) ||
						(store.state.trackerData.items.moonpearl &&
							(store.state.trackerData.items.mirror || store.state.trackerData.items.boots))))
			)
		} else if (logic === 'glitchless') {
			return (
				store.state.trackerData.items.agahnim ||
				(agahnimCheck && this.canGoBeatAgahnim1(allowOutOfLogicGlitches)) ||
				(store.state.trackerData.items.hammer && this.canLiftRocks() && store.state.trackerData.items.moonpearl) ||
				(this.canLiftDarkRocks() && store.state.trackerData.items.flippers && store.state.trackerData.items.moonpearl)
			)
		} else if (logic === 'inverted') {
			return (
				store.state.trackerData.items.flippers ||
				store.state.trackerData.items.hammer ||
				this.canFly('inverted') ||
				(this.canEnterLightWorld(logic, agahnimCheck, allowOutOfLogicGlitches) &&
					store.state.trackerData.items.mirror) ||
				(allowOutOfLogicGlitches && store.state.trackerData.items.boots)
			)
		}
	},
	canEnterNorthWestDarkWorld (logic, agahnimCheck, allowOutOfLogicGlitches) {
		if (logic === 'majorGlitches') {
			return (
				this.canEnterWestDeathMountain('majorGlitches', allowOutOfLogicGlitches) ||
				(store.state.trackerData.items.moonpearl &&
					(this.canLiftDarkRocks() ||
						(store.state.trackerData.items.hammer && this.canLiftRocks()) ||
						((store.state.trackerData.items.agahnim ||
							(agahnimCheck && this.canGoBeatAgahnim1(allowOutOfLogicGlitches))) &&
							store.state.trackerData.items.hookshot &&
							(store.state.trackerData.items.hammer || this.canLiftRocks() || store.state.trackerData.items.flippers))))
			)
		} else if (logic === 'owGlitches') {
			return (
				(this.canEnterWestDeathMountain('owGlitches', allowOutOfLogicGlitches) &&
					(store.state.trackerData.items.mirror ||
						(store.state.trackerData.items.boots && store.state.trackerData.items.moonpearl))) ||
				(store.state.trackerData.items.moonpearl &&
					(this.canLiftDarkRocks() ||
						(store.state.trackerData.items.hammer && this.canLiftRocks()) ||
						((store.state.trackerData.items.agahnim ||
							(agahnimCheck && this.canGoBeatAgahnim1(allowOutOfLogicGlitches))) &&
							store.state.trackerData.items.hookshot &&
							(store.state.trackerData.items.hammer || this.canLiftRocks() || store.state.trackerData.items.flippers))))
			)
		} else if (logic === 'glitchless') {
			return (
				store.state.trackerData.items.moonpearl &&
				((this.canEnterNorthEastDarkWorld('glitchless', agahnimCheck, allowOutOfLogicGlitches) &&
					(store.state.trackerData.items.hookshot &&
						(store.state.trackerData.items.flippers || this.canLiftRocks() || store.state.trackerData.items.hammer))) ||
					(store.state.trackerData.items.hammer && this.canLiftRocks()) ||
					this.canLiftDarkRocks())
			)
		} else if (logic === 'inverted') {
			return true
		}
	},
	canEnterSouthDarkWorld (logic, agahnimCheck, allowOutOfLogicGlitches) {
		if (logic === 'majorGlitches') {
			return (
				this.canEnterWestDeathMountain(logic, allowOutOfLogicGlitches) ||
				(store.state.trackerData.items.moonpearl &&
					(this.canLiftDarkRocks() ||
						(store.state.trackerData.items.hammer && this.canLiftRocks()) ||
						((store.state.trackerData.items.agahnim ||
							(agahnimCheck && this.canGoBeatAgahnim1(allowOutOfLogicGlitches))) &&
							(store.state.trackerData.items.hammer ||
								(store.state.trackerData.items.hookshot &&
									(store.state.trackerData.items.flippers || this.canLiftRocks()))))))
			)
		} else if (logic === 'owGlitches') {
			return (
				(this.canEnterWestDeathMountain(logic, allowOutOfLogicGlitches) &&
					(store.state.trackerData.items.mirror ||
						(store.state.trackerData.items.boots && store.state.trackerData.items.moonpearl))) ||
				(store.state.trackerData.items.moonpearl &&
					(this.canLiftDarkRocks() ||
						(store.state.trackerData.items.hammer && this.canLiftRocks()) ||
						((store.state.trackerData.items.agahnim ||
							(agahnimCheck && this.canGoBeatAgahnim1(allowOutOfLogicGlitches))) &&
							(store.state.trackerData.items.hammer ||
								(store.state.trackerData.items.hookshot &&
									(store.state.trackerData.items.flippers || this.canLiftRocks()))))))
			)
		} else if (logic === 'glitchless') {
			return (
				store.state.trackerData.items.moonpearl &&
				(this.canLiftDarkRocks() ||
					(store.state.trackerData.items.hammer && this.canLiftRocks()) ||
					(this.canEnterNorthEastDarkWorld('glitchless', agahnimCheck, allowOutOfLogicGlitches) &&
						(store.state.trackerData.items.hammer ||
							(store.state.trackerData.items.hookshot &&
								(store.state.trackerData.items.flippers || this.canLiftRocks())))))
			)
		} else if (logic === 'inverted') {
			return true
		}
	},
	canEnterMireArea (logic, agahnimCheck, allowOutOfLogicGlitches) {
		if (logic === 'majorGlitches') {
			return (
				(store.state.trackerData.items.bottle &&
					this.canEnterWestDeathMountain('majorGlitches', allowOutOfLogicGlitches)) ||
				(this.canLiftDarkRocks() &&
					(this.canFly() || store.state.trackerData.items.bottle || store.state.trackerData.items.boots)) ||
				(this.glitchedLinkInDarkWorld() &&
					store.state.trackerData.items.boots &&
					this.canEnterSouthDarkWorld('majorGlitches', agahnimCheck, allowOutOfLogicGlitches))
			)
		} else if (logic === 'owGlitches') {
			return (
				(this.canLiftDarkRocks() && (this.canFly() || store.state.trackerData.items.boots)) ||
				(store.state.trackerData.items.moonpearl &&
					store.state.trackerData.items.boots &&
					this.canEnterSouthDarkWorld('owGlitches', agahnimCheck, allowOutOfLogicGlitches))
			)
		} else if (logic === 'glitchless') {
			return this.canFly() && this.canLiftDarkRocks()
		} else if (logic === 'inverted') {
			return (
				this.canFly('inverted') ||
				(this.canEnterLightWorld(logic, agahnimCheck, allowOutOfLogicGlitches) && store.state.trackerData.items.mirror)
			)
		}
	},
	canEnterWestDeathMountain (logic, allowOutOfLogicGlitches) {
		if (logic === 'majorGlitches') {
			return (
				store.state.trackerData.items.boots ||
				store.state.trackerData.items.bottle >= 1 ||
				this.canFly() ||
				(this.canLiftRocks() && (store.state.trackerData.items.lantern || allowOutOfLogicGlitches))
			)
		} else if (logic === 'owGlitches') {
			return (
				store.state.trackerData.items.boots ||
				this.canFly() ||
				(this.canLiftRocks() && (store.state.trackerData.items.lantern || allowOutOfLogicGlitches))
			)
		} else if (logic === 'glitchless') {
			return this.canFly() || (this.canLiftRocks() && (store.state.trackerData.items.lantern || allowOutOfLogicGlitches))
		} else if (logic === 'inverted') {
			return this.canEnterDarkWorldDeathMountain('inverted', allowOutOfLogicGlitches)
		}
	},
	canEnterEastDeathMountain (logic, allowOutOfLogicGlitches) {
		if (logic === 'majorGlitches') {
			return (
				store.state.trackerData.items.boots ||
				(this.canEnterWestDeathMountain('majorGlitches', allowOutOfLogicGlitches) &&
					(store.state.trackerData.items.hookshot || store.state.trackerData.items.mirror))
			)
		} else if (logic === 'owGlitches') {
			return (
				store.state.trackerData.items.boots ||
				(this.canEnterWestDeathMountain('owGlitches', allowOutOfLogicGlitches) &&
					(store.state.trackerData.items.hookshot ||
						(store.state.trackerData.items.mirror && store.state.trackerData.items.hammer)))
			)
		} else if (logic === 'glitchless') {
			return (
				this.canEnterWestDeathMountain('glitchless', allowOutOfLogicGlitches) &&
				(store.state.trackerData.items.hookshot || (store.state.trackerData.items.mirror && store.state.trackerData.items.hammer))
			)
		} else if (logic === 'inverted') {
			return (
				(this.canEnterWestDeathMountain('inverted', allowOutOfLogicGlitches) &&
					store.state.trackerData.items.hookshot &&
					store.state.trackerData.items.moonpearl) ||
				(this.canEnterDarkWorldDeathMountain('inverted', allowOutOfLogicGlitches) && this.canLiftDarkRocks())
			)
		}
	},
	canEnterDarkWorldDeathMountain (logic, allowOutOfLogicGlitches) {
		if (logic === 'majorGlitches') {
			return (
				store.state.trackerData.items.moonpearl ||
				(store.state.trackerData.items.bottle >= 1 && store.state.trackerData.items.boots) ||
				((this.canLiftDarkRocks() || (store.state.trackerData.items.hammer && store.state.trackerData.items.boots)) &&
					this.canEnterEastDeathMountain('majorGlitches', allowOutOfLogicGlitches)) ||
				(store.state.trackerData.items.mirror &&
					this.canEnterWestDeathMountain('majorGlitches', allowOutOfLogicGlitches))
			)
		} else if (logic === 'owGlitches') {
			return (
				(store.state.trackerData.items.moonpearl && store.state.trackerData.items.boots) ||
				((this.canLiftDarkRocks() || (store.state.trackerData.items.hammer && store.state.trackerData.items.boots)) &&
					this.canEnterEastDeathMountain('owGlitches', allowOutOfLogicGlitches))
			)
		} else if (logic === 'glitchless') {
			return this.canLiftDarkRocks() && this.canEnterEastDeathMountain('glitchless', allowOutOfLogicGlitches)
		} else if (logic === 'inverted') {
			return (
				this.canFly('inverted') ||
				(this.canLiftRocks() && (store.state.trackerData.items.lantern || allowOutOfLogicGlitches))
			)
		}
	}
}

export function Availability (
	glitchless = 'unavailable',
	owGlitches = 'unavailable',
	majorGlitches = 'unavailable',
	inverted = 'unavailable'
) {
	this._glitchless = glitchless
	this._owGlitches = owGlitches
	this._majorGlitches = majorGlitches
	this._inverted = inverted

	this.getClassName = function () {
		return this[store.state.trackerOptions.mapLogic]
	}
}

Object.defineProperty(Availability.prototype, 'glitchless', {
	get: function () {
		return this._glitchless
	},
	set: function (value) {
		this._glitchless = value
		this._owGlitches = value
		this._majorGlitches = value
	}
})

Object.defineProperty(Availability.prototype, 'owGlitches', {
	get: function () {
		return this._owGlitches
	},
	set: function (value) {
		this._owGlitches = value
		this._majorGlitches = value
	}
})

Object.defineProperty(Availability.prototype, 'majorGlitches', {
	get: function () {
		return this._majorGlitches
	},
	set: function (value) {
		this._majorGlitches = value
	}
})

Object.defineProperty(Availability.prototype, 'inverted', {
	get: function () {
		return this._inverted
	},
	set: function (value) {
		this._inverted = value
	}
})
