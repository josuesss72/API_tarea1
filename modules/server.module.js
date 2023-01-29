const express = require('express')
const cors = require('cors')
const {db} = require('../database/db')
const { usersRoutes } = require('../routes/users.route')
const { repairsRoutes } = require('../routes/repairs.route')

class Server {
	constructor() {
		this.app = express()
		this.port = process.env.PORT
	
		this.path = {
			users: '/api/v1/users',
			repairs: '/api/v1/repairs'
		}

		this.database()
		this.middlewares()
		this.routes()
	}

	middlewares() {
		this.app.use(cors())
		this.app.use(express.json()) // definimos el formato json
	}

	routes() {
		this.app.use(this.path.users, usersRoutes)	
		this.app.use(this.path.repairs, repairsRoutes)
	}

	database() {
		db.authenticate() // promise()	
			.then(() => console.log('database authenticate'))
			.catch(err => console.log(err))
		db.sync()
			.then(() => console.log('database sync'))
			.catch(err => console.log(err))
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log('Server runnig on port', this.port)
		})
	}
}

module.exports = Server
