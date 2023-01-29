const {Router} = require("express");
const {
	getUsers,
	postUsers,
	patchUsers,
	deleteUsers,
	oneUser
} = require('../controller/users.controller')

const router = Router()

router.get('/', getUsers)
router.get('/:id', oneUser)
router.post('/', postUsers)
router.patch('/:id', patchUsers)
router.delete('/:id', deleteUsers)

module.exports = {
	usersRoutes: router
}
