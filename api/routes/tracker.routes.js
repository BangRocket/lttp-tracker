module.exports = (app) => {
	const room = require('../controllers/tracker.controller.js')

	// Create a new room
	app.post('/room', room.create)

	// Retrieve a single room with roomid
	app.get('/room/:roomid', room.get)

	// Update a room with roomid
	app.put('/room/:roomid', room.update)

	// Delete a room with roomid
	app.delete('/room/:roomid', room.delete)
}
