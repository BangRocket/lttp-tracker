const Room = require('../models/tracker.model.js')
const Items = require('../models/items.js')

// Create and Save a new Note
exports.create = (req, res) => {
	// Validate request
	if (!req.body.content) {
		return res.status(400).send({
			message: 'Content can not be empty'
		}) 
	}

	// new room must send at least a user/password/id combination. it can also send data about an existing room
	// if it were created offline and not registered yet.

	// Create a room
	const room = new Room({
		chestsopened: req.body.chestsopened || Items.chestsopenedInit,
		dungeonsbeaten: req.body.dungeonsbeaten || Items.dungeonbeatenInit,
		dungeonchests: req.body.dungeoncheats || Items.dungeonchestsInit,
		editor: req.body.editor,
		items: req.body.items || Items.itemsInit,
		medallions: req.body.medallions || Items.medallionsInit,
		owner: req.body.owner,
		passcode: req.body.passcode,
		prizes: req.body.prizes || Items.prizesInit,
		smallkeys: req.body.smallkeys || Items.smallkeyInit
	})

	// Save room in the database
	room
		.save()
		.then((data) => {
			res.send(data)
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Note.'
			})
		})
}

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
	Note.find()
		.then((notes) => {
			res.send(notes)
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving notes.'
			})
		})
}

// Find a single note with a noteId
exports.findOne = (req, res) => {
	Note.findById(req.params.noteId)
		.then((note) => {
			if (!note) {
				return res.status(404).send({
					message: 'Note not found with id ' + req.params.noteId
				})
			}
			res.send(note)
		})
		.catch((err) => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: 'Note not found with id ' + req.params.noteId
				})
			}
			return res.status(500).send({
				message: 'Error retrieving note with id ' + req.params.noteId
			})
		})
}

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
	// Validate Request
	if (!req.body.content) {
		return res.status(400).send({
			message: 'Note content can not be empty'
		})
	}

	// Find note and update it with the request body
	Note.findByIdAndUpdate(
		req.params.noteId,
		{
			title: req.body.title || 'Untitled Note',
			content: req.body.content
		},
		{ new: true }
	)
		.then((note) => {
			if (!note) {
				return res.status(404).send({
					message: 'Note not found with id ' + req.params.noteId
				})
			}
			res.send(note)
		})
		.catch((err) => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: 'Note not found with id ' + req.params.noteId
				})
			}
			return res.status(500).send({
				message: 'Error updating note with id ' + req.params.noteId
			})
		})
}

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
	Note.findByIdAndRemove(req.params.noteId)
		.then((note) => {
			if (!note) {
				return res.status(404).send({
					message: 'Note not found with id ' + req.params.noteId
				})
			}
			res.send({ message: 'Note deleted successfully!' })
		})
		.catch((err) => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.status(404).send({
					message: 'Note not found with id ' + req.params.noteId
				})
			}
			return res.status(500).send({
				message: 'Could not delete note with id ' + req.params.noteId
			})
		})
}
