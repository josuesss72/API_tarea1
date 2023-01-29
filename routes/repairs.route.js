const {Router} = require("express");
const {newRepairs, findAllRepairs, updateRepairs, findRepairsByid, deleteRepairs} = require("../controller/repairs.controller");

const router = Router()

router.get('/', findAllRepairs)
router.get('/:id', findRepairsByid)
router.post('/', newRepairs)
router.patch('/:id', updateRepairs)
router.delete('/:id', deleteRepairs)

module.exports = {
	repairsRoutes: router
}
