export default {
	name: 'Logic',
	data () {
		return {
			trackerData: {
				items: {},
				dungeonchests: {},
				bigkeys: [],
				smallkeys: [],
				dungeonbeaten: [],
				prizes: [],
				medallions: [],
				chestsopened: []
			},
			canLiftRocks () {
				return this.trackerData.items.glove >= 1
			},
			canLiftDarkRocks () {
				return this.trackerData.items.glove === 2
			},
			canLightTorches () {
				return this.trackerData.items.firerod || this.trackerData.items.lantern
			},
			canMeltThings () {
				return (
					this.trackerData.items.firerod ||
					(this.trackerData.items.bombos && this.trackerData.items.sword >= 1)
				)
			},
			canFly (logic = 'glitchless') {
				return (
					this.trackerData.items.flute &&
					(logic !== 'inverted' ||
						(this.canEnterLightWorld(logic, false, false) && this.trackerData.items.moonpearl))
				)
			},
			canSpinSpeed () {
				return (
					this.trackerData.items.boots &&
					(this.trackerData.items.sword >= 1 || this.trackerData.items.hookshot)
				)
			},
			canShootArrows () {
				return this.trackerData.items.bow
			},
			canBlockLasers () {
				return this.trackerData.items.shield === 3
			},
			canExtendMagic () {
				return this.trackerData.items.mpupgrade >= 1 || this.trackerData.items.bottle >= 1
			},
			glitchedLinkInDarkWorld () {
				return this.trackerData.items.moonpearl || this.trackerData.items.bottle >= 1
			},
			canGoBeatAgahnim1 (allowOutOfLogicGlitches, logic = 'glitchless') {
				if (logic === 'inverted') {
					return (
						!this.trackerData.items.agahnim &&
						(this.trackerData.items.lantern || allowOutOfLogicGlitches) &&
						this.trackerData.items.sword >= 1 &&
						this.canEnterDarkWorldDeathMountain('inverted', allowOutOfLogicGlitches)
					)
				} else {
					return (
						!this.trackerData.items.agahnim &&
						(this.trackerData.items.lantern || allowOutOfLogicGlitches) &&
						(this.trackerData.items.cape || this.trackerData.items.sword >= 2) &&
						this.trackerData.items.sword >= 1
					)
				}
			},
			canEnterLightWorld (logic, agahnimCheck, allowOutOfLogicGlitches) {
				return (
					logic !== 'inverted' ||
					(this.trackerData.items.agahnim ||
						(agahnimCheck && this.canGoBeatAgahnim1(allowOutOfLogicGlitches, 'inverted')) ||
						((this.canLiftDarkRocks() || (this.trackerData.items.hammer && this.canLiftRocks())) &&
							this.trackerData.items.moonpearl))
				)
			},
			canEnterNorthEastDarkWorld (logic, agahnimCheck, allowOutOfLogicGlitches) {
				if (logic === 'majorGlitches') {
					return (
						this.trackerData.items.agahnim ||
						(agahnimCheck && this.canGoBeatAgahnim1(allowOutOfLogicGlitches)) ||
						(this.trackerData.items.moonpearl &&
							((this.canLiftDarkRocks() &&
								(this.trackerData.items.boots || this.trackerData.items.flippers)) ||
								(this.trackerData.items.hammer && this.canLiftRocks()))) ||
						(this.canEnterWestDeathMountain(logic, allowOutOfLogicGlitches) &&
							(this.trackerData.items.bottle >= 1 ||
								(this.trackerData.items.mirror && this.canSpinSpeed()) ||
								(this.trackerData.items.moonpearl &&
									(this.trackerData.items.mirror || this.trackerData.items.boots))))
					)
				} else if (logic === 'owGlitches') {
					return (
						this.trackerData.items.agahnim ||
						(agahnimCheck && this.canGoBeatAgahnim1(allowOutOfLogicGlitches)) ||
						(this.trackerData.items.moonpearl &&
							((this.canLiftDarkRocks() &&
								(this.trackerData.items.boots || this.trackerData.items.flippers)) ||
								(this.trackerData.items.hammer && this.canLiftRocks()))) ||
						(this.canEnterWestDeathMountain(logic, allowOutOfLogicGlitches) &&
							((this.trackerData.items.mirror && this.canSpinSpeed()) ||
								(this.trackerData.items.moonpearl &&
									(this.trackerData.items.mirror || this.trackerData.items.boots))))
					)
				} else if (logic === 'glitchless') {
					return (
						this.trackerData.items.agahnim ||
						(agahnimCheck && this.canGoBeatAgahnim1(allowOutOfLogicGlitches)) ||
						(this.trackerData.items.hammer && this.canLiftRocks() && this.trackerData.items.moonpearl) ||
						(this.canLiftDarkRocks() && this.trackerData.items.flippers && this.trackerData.items.moonpearl)
					)
				} else if (logic === 'inverted') {
					return (
						this.trackerData.items.flippers ||
						this.trackerData.items.hammer ||
						this.canFly('inverted') ||
						(this.canEnterLightWorld(logic, agahnimCheck, allowOutOfLogicGlitches) &&
							this.trackerData.items.mirror) ||
						(allowOutOfLogicGlitches && this.trackerData.items.boots)
					)
				}
			},
			canEnterNorthWestDarkWorld (logic, agahnimCheck, allowOutOfLogicGlitches) {
				if (logic === 'majorGlitches') {
					return (
						this.canEnterWestDeathMountain('majorGlitches', allowOutOfLogicGlitches) ||
						(this.trackerData.items.moonpearl &&
							(this.canLiftDarkRocks() ||
								(this.trackerData.items.hammer && this.canLiftRocks()) ||
								((this.trackerData.items.agahnim ||
									(agahnimCheck && this.canGoBeatAgahnim1(allowOutOfLogicGlitches))) &&
									this.trackerData.items.hookshot &&
									(this.trackerData.items.hammer ||
										this.canLiftRocks() ||
										this.trackerData.items.flippers))))
					)
				} else if (logic === 'owGlitches') {
					return (
						(this.canEnterWestDeathMountain('owGlitches', allowOutOfLogicGlitches) &&
							(this.trackerData.items.mirror ||
								(this.trackerData.items.boots && this.trackerData.items.moonpearl))) ||
						(this.trackerData.items.moonpearl &&
							(this.canLiftDarkRocks() ||
								(this.trackerData.items.hammer && this.canLiftRocks()) ||
								((this.trackerData.items.agahnim ||
									(agahnimCheck && this.canGoBeatAgahnim1(allowOutOfLogicGlitches))) &&
									this.trackerData.items.hookshot &&
									(this.trackerData.items.hammer ||
										this.canLiftRocks() ||
										this.trackerData.items.flippers))))
					)
				} else if (logic === 'glitchless') {
					return (
						this.trackerData.items.moonpearl &&
						((this.canEnterNorthEastDarkWorld('glitchless', agahnimCheck, allowOutOfLogicGlitches) &&
							(this.trackerData.items.hookshot &&
								(this.trackerData.items.flippers ||
									this.canLiftRocks() ||
									this.trackerData.items.hammer))) ||
							(this.trackerData.items.hammer && this.canLiftRocks()) ||
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
						(this.trackerData.items.moonpearl &&
							(this.canLiftDarkRocks() ||
								(this.trackerData.items.hammer && this.canLiftRocks()) ||
								((this.trackerData.items.agahnim ||
									(agahnimCheck && this.canGoBeatAgahnim1(allowOutOfLogicGlitches))) &&
									(this.trackerData.items.hammer ||
										(this.trackerData.items.hookshot &&
											(this.trackerData.items.flippers || this.canLiftRocks()))))))
					)
				} else if (logic === 'owGlitches') {
					return (
						(this.canEnterWestDeathMountain(logic, allowOutOfLogicGlitches) &&
							(this.trackerData.items.mirror ||
								(this.trackerData.items.boots && this.trackerData.items.moonpearl))) ||
						(this.trackerData.items.moonpearl &&
							(this.canLiftDarkRocks() ||
								(this.trackerData.items.hammer && this.canLiftRocks()) ||
								((this.trackerData.items.agahnim ||
									(agahnimCheck && this.canGoBeatAgahnim1(allowOutOfLogicGlitches))) &&
									(this.trackerData.items.hammer ||
										(this.trackerData.items.hookshot &&
											(this.trackerData.items.flippers || this.canLiftRocks()))))))
					)
				} else if (logic === 'glitchless') {
					return (
						this.trackerData.items.moonpearl &&
						(this.canLiftDarkRocks() ||
							(this.trackerData.items.hammer && this.canLiftRocks()) ||
							(this.canEnterNorthEastDarkWorld('glitchless', agahnimCheck, allowOutOfLogicGlitches) &&
								(this.trackerData.items.hammer ||
									(this.trackerData.items.hookshot &&
										(this.trackerData.items.flippers || this.canLiftRocks())))))
					)
				} else if (logic === 'inverted') {
					return true
				}
			},
			canEnterMireArea (logic, agahnimCheck, allowOutOfLogicGlitches) {
				if (logic === 'majorGlitches') {
					return (
						(this.trackerData.items.bottle &&
							this.canEnterWestDeathMountain('majorGlitches', allowOutOfLogicGlitches)) ||
						(this.canLiftDarkRocks() &&
							(this.canFly() || this.trackerData.items.bottle || this.trackerData.items.boots)) ||
						(this.glitchedLinkInDarkWorld() &&
							this.trackerData.items.boots &&
							this.canEnterSouthDarkWorld('majorGlitches', agahnimCheck, allowOutOfLogicGlitches))
					)
				} else if (logic === 'owGlitches') {
					return (
						(this.canLiftDarkRocks() && (this.canFly() || this.trackerData.items.boots)) ||
						(this.trackerData.items.moonpearl &&
							this.trackerData.items.boots &&
							this.canEnterSouthDarkWorld('owGlitches', agahnimCheck, allowOutOfLogicGlitches))
					)
				} else if (logic === 'glitchless') {
					return this.canFly() && this.canLiftDarkRocks()
				} else if (logic === 'inverted') {
					return (
						this.canFly('inverted') ||
						(this.canEnterLightWorld(logic, agahnimCheck, allowOutOfLogicGlitches) &&
							this.trackerData.items.mirror)
					)
				}
			},
			canEnterWestDeathMountain (logic, allowOutOfLogicGlitches) {
				if (logic === 'majorGlitches') {
					return (
						this.trackerData.items.boots ||
						this.trackerData.items.bottle >= 1 ||
						this.canFly() ||
						(this.canLiftRocks() && (this.trackerData.items.lantern || allowOutOfLogicGlitches))
					)
				} else if (logic === 'owGlitches') {
					return (
						this.trackerData.items.boots ||
						this.canFly() ||
						(this.canLiftRocks() && (this.trackerData.items.lantern || allowOutOfLogicGlitches))
					)
				} else if (logic === 'glitchless') {
					return (
						this.canFly() ||
						(this.canLiftRocks() && (this.trackerData.items.lantern || allowOutOfLogicGlitches))
					)
				} else if (logic === 'inverted') {
					return this.canEnterDarkWorldDeathMountain('inverted', allowOutOfLogicGlitches)
				}
			},
			canEnterEastDeathMountain (logic, allowOutOfLogicGlitches) {
				if (logic === 'majorGlitches') {
					return (
						this.trackerData.items.boots ||
						(this.canEnterWestDeathMountain('majorGlitches', allowOutOfLogicGlitches) &&
							(this.trackerData.items.hookshot || this.trackerData.items.mirror))
					)
				} else if (logic === 'owGlitches') {
					return (
						this.trackerData.items.boots ||
						(this.canEnterWestDeathMountain('owGlitches', allowOutOfLogicGlitches) &&
							(this.trackerData.items.hookshot ||
								(this.trackerData.items.mirror && this.trackerData.items.hammer)))
					)
				} else if (logic === 'glitchless') {
					return (
						this.canEnterWestDeathMountain('glitchless', allowOutOfLogicGlitches) &&
						(this.trackerData.items.hookshot ||
							(this.trackerData.items.mirror && this.trackerData.items.hammer))
					)
				} else if (logic === 'inverted') {
					return (
						(this.canEnterWestDeathMountain('inverted', allowOutOfLogicGlitches) &&
							this.trackerData.items.hookshot &&
							this.trackerData.items.moonpearl) ||
						(this.canEnterDarkWorldDeathMountain('inverted', allowOutOfLogicGlitches) &&
							this.canLiftDarkRocks())
					)
				}
			},
			canEnterDarkWorldDeathMountain (logic, allowOutOfLogicGlitches) {
				if (logic === 'majorGlitches') {
					return (
						this.trackerData.items.moonpearl ||
						(this.trackerData.items.bottle >= 1 && this.trackerData.items.boots) ||
						((this.canLiftDarkRocks() || (this.trackerData.items.hammer && this.trackerData.items.boots)) &&
							this.canEnterEastDeathMountain('majorGlitches', allowOutOfLogicGlitches)) ||
						(this.trackerData.items.mirror &&
							this.canEnterWestDeathMountain('majorGlitches', allowOutOfLogicGlitches))
					)
				} else if (logic === 'owGlitches') {
					return (
						(this.trackerData.items.moonpearl && this.trackerData.items.boots) ||
						((this.canLiftDarkRocks() || (this.trackerData.items.hammer && this.trackerData.items.boots)) &&
							this.canEnterEastDeathMountain('owGlitches', allowOutOfLogicGlitches))
					)
				} else if (logic === 'glitchless') {
					return (
						this.canLiftDarkRocks() && this.canEnterEastDeathMountain('glitchless', allowOutOfLogicGlitches)
					)
				} else if (logic === 'inverted') {
					return (
						this.canFly('inverted') ||
						(this.canLiftRocks() && (this.trackerData.items.lantern || allowOutOfLogicGlitches))
					)
				}
			}
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
		return this.trackerOptions.mapLogic
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
