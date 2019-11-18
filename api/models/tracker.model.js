const mongoose = require('mongoose')

const itemsSchema = mongoose.Schema({
	agahnim: Number,
	blank: Boolean,
	bomb: Number,
	bombos: Boolean,
	book: Boolean,
	boomerang: Number,
	boots: Boolean,
	boss0: Number,
	boss1: Number,
	boss10: Number,
	boss2: Number,
	boss3: Number,
	boss4: Number,
	boss5: Number,
	boss6: Number,
	boss7: Number,
	boss8: Number,
	boss9: Number,
	bottle: Number,
	bow: Boolean,
	byrna: Boolean,
	cape: Boolean,
	ether: Boolean,
	firerod: Boolean,
	flippers: Boolean,
	flute: Boolean,
	glove: Number,
	hammer: Boolean,
	heartcontainer: Number,
	heartpiece: Number,
	hookshot: Boolean,
	icerod: Boolean,
	lantern: Boolean,
	mirror: Boolean,
	moonpearl: Boolean,
	mpupgrade: Number,
	mushroom: Boolean,
	net: Boolean,
	powder: Boolean,
	quake: Boolean,
	shield: Number,
	shovel: Boolean,
	silvers: Boolean,
	somaria: Boolean,
	sword: Number,
	tunic: Number
})

const TrackerSchema = mongoose.Schema(
	{
		bigkeys: [Boolean],
		chestsopened: [Number],
		dungeonsbeaten: [Boolean],
		dungeonchests: [Number],
		editor: String,
		items: [itemsSchema],
		medallions: [Number],
		owner: String,
		passcode: String,
		prizes: [Number],
		smallkeys: [Number]
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Room', TrackerSchema)
