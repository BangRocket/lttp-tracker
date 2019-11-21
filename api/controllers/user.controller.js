const User = require('../models/user.model.js')

// exports.get = (req, res, next) => {
//     return res.sendFile(path.join(__dirname + '/templateLogReg/index.html'));
// };

exports.create = async (req, res, next) => {
	// confirm that user typed same password twice
	var err

	if (req.body.password !== req.body.passwordConf) {
		err = new Error('Passwords do not match.')
		err.status = 400
		res.send('passwords dont match')
		return next(err)
	}

	if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
		var userData = {
			email: req.body.email,
			username: req.body.username,
			password: req.body.password
		}

		User.create(userData, function (error, user) {
			if (error) {
				return next(error)
			} else {
				req.session.userId = user._id
				res.send(user)
				// return res.redirect('/profile')
			}
		})
	} else if (req.body.logemail && req.body.logpassword) {
		User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
			if (error || !user) {
				err = new Error('Wrong email or password.')
				err.status = 401
				return next(err)
			} else {
				req.session.userId = user._id
				res.send('auth success')
				// return res.redirect('/profile');
			}
		})
	} else {
		err = new Error('All fields required.')
		err.status = 400
		return next(err)
	}
}

exports.get = (req, res, next) => {
	User.findById(req.session.userId).exec(function (error, user) {
		if (error) {
			return next(error)
		} else {
			if (user === null) {
				var err = new Error('Not authorized! Go back!')
				err.status = 400
				return next(err)
			} else {
				return res.send(
					'<h1>Name: </h1>' +
						user.username +
						'<h2>Mail: </h2>' +
						user.email +
						'<br><a type="button" href="/logout">Logout</a>'
				)
			}
		}
	})
}

exports.logout = (req, res, next) => {
	if (req.session) {
		// delete session object
		req.session.destroy(function (err) {
			if (err) {
				return next(err)
			} else {
				return res.redirect('/')
			}
		})
	}
}

exports.login = (req, res, next) => {
	User.findById(req.session.userId).exec(function (error, user) {
		if (error) {
			return next(error)
		} else {
			if (user === null) {
				return false
			} else {
				return true
			}
		}
	})
}
