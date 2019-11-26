const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
		timestamps: true,
		collection: 'rooms'
	}
)

// hashing a password before saving it to the database
TrackerSchema.pre('save', function (next) {
	var room = this
	bcrypt.hash(room.data.passcode, 10, function (err, hash) {
		if (err) {
			return next(err)
		}
		room.data.passcode = hash
		next()
	})
})

module.exports = mongoose.model('Room', TrackerSchema)
