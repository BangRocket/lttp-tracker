const Room = require('../models/tracker.model.js')
const Items = require('../models/items.js')

// Create and Save a new Note
exports.create = (req, res) => {
	// Validate request
	if (!req.body) {
		return res.status(400).send({
			message: 'body can not be empty'
		}) 
	}

	// new room must send at least a user/password/id combination. it can also send data about an existing room
	// if it were created offline and not registered yet.

	// Create a room
	const room = new Room({
	name: req.body.name || "",
	data: {
			bigkeys: req.body.bigkeys || Items.bigkeyInit,
			chestsopened: req.body.chestsopened || Items.chestsopenedInit,
			dungeonsbeaten: req.body.dungeonsbeaten || Items.dungeonbeatenInit,
			dungeonchests: req.body.dungeoncheats || Items.dungeonchestsInit,
			editor: req.body.editor || "",
			items: req.body.items || Items.itemsInit,
			medallions: req.body.medallions || Items.medallionsInit,
			owner: req.body.owner || "",
			passcode: req.body.passcode || "",
			prizes: req.body.prizes || Items.prizesInit,
			smallkeys: req.body.smallkeys || Items.smallkeyInit

		}
	})

	// Save room in the database
	room
		.save()
		.then((data) => {
			res.send(data)
		})
		.catch((err) => {
			console.log(err)
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Note.'
			})
		})
}

// Retrieve and return all notes from the database.
// exports.findAll = (req, res) => {
// 	Room.find()
// 		.then((notes) => {
// 			res.send(notes)
// 		})
// 		.catch((err) => {
// 			res.status(500).send({
// 				message: err.message || 'Some error occurred while retrieving notes.'
// 			})
// 		})
// }

// Find a single note with a roomid
exports.get = (req, res) => {
	Room.find({name: req.params.roomid})
		.then((room) => {
			if (!room) {
				return res.status(404).send({
					message: 'room not found with id ' + req.params.roomid
				})
			}
			res.send(room)
		})
		.catch((err) => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: 'room not found with id ' + req.params.roomid
				})
			}
			return res.status(500).send({
				message: 'Error retrieving room with id ' + req.params.roomid
			})
		})
}

// Update a note identified by the noteId in the request
exports.update = async (req, res) => {
	// Validate Request
	if (!req.body || !req.params) {
		return res.status(400).send({
			message: 'room id/data can not be empty'
		})
	}

	// get whatever we currently have in the room data
	var current = await Room.find({name: req.params.roomid}).then((room) => {
		return room[0]
	})

	// build a object of params to be updated based on items passed in
	for (const prop in req.body) {
		switch (prop){
			case 'bigkeys':
			case 'chestsopened':
			case 'dungeonsbeaten':
				
				let newVal = JSON.parse(req.body[prop])
			
				for (item in newVal){
					let index = Number(Object.keys(newVal[item]))
					let value = Boolean(Object.values(newVal[item]))
					current.data[prop][index] = value
				}
				break;
			case 'owner':
			case 'passcode':
			case 'editor':
				current.data[prop] = req.body[prop]
				break;
			case 'medallions':
			case 'prizes':
			case 'smallkeys':			
					let newVal1 = JSON.parse(req.body[prop])
			
					for (item in newVal1){
						let index = Number(Object.keys(newVal1[item]))
						let value = Number(Object.values(newVal1[item]))
						current.data[prop][index] = value
					}
					break;
			case 'items':
			case 'dungeonchests':						
					let newVal2 = JSON.parse(req.body[prop])
			
					for (item in newVal2){
						let index = String(Object.keys(newVal2[item]))
						let value = Object.values(newVal2[item])[0]			

						current.data[prop][index] = typeof(value) == 'string' ? Number(value) : Boolean(value)
					}
					break;
				break;
			default:
				break;
		}
	}

	// Find room and update it with the current data
	Room.updateOne(
		{name: req.params.roomid},
		{
			data: current.data
		}
	)
		.then((room) => {
			if (!room) {
				return res.status(404).send({
					message: 'room not found with id ' + req.params.noteId
				})
			}
			res.send(room)
		})
		.catch((err) => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: 'room not found with id ' + req.params.noteId
				})
			}
			return res.status(500).send({
				message: 'Error updating room with id ' + req.params.noteId
			})
		})
}

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
	Room.deleteOne({name: req.params.roomid})
		.then((room) => {
			if (!room) {
				return res.status(404).send({
					message: 'room not found with id ' + req.params.noteId
				})
			}
			res.send({ message: 'room deleted successfully!' })
		})
		.catch((err) => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.status(404).send({
					message: 'room not found with id ' + req.params.noteId
				})
			}
			return res.status(500).send({
				message: 'Could not delete room with id ' + req.params.noteId
			})
		})
}
