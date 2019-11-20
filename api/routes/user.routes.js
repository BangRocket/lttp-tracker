module.exports = (app) => {
	const user = require('../controllers/user.controller.js')

	// Create a new room
	app.post('/user', user.create)
}
