const mongoose = require('mongoose')

const TrackerSchema = mongoose.Schema(
	{
		id: String,
		name: String,
		data:
		{
			bigkeys: [Boolean],
			chestsopened: [Boolean],
			dungeonsbeaten: [Boolean],
			dungeonchests: Object,
			editor: String,
			items: Object,
			medallions: [Number],
			owner: String,
			passcode: String,
			prizes: [Number],
			smallkeys: [Number]
		}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Room', TrackerSchema)
