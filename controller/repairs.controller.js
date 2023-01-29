const {Repairs} = require("../modules/repairs.module")
const {User} = require("../modules/user.model")

async function findAllRepairs (req, res) {
	const cs = { code: 0, messege: '', status: '' }

	const allRepairs = await Repairs.findAll({
		where: {
			status: 'pending'
		}
	})

	if(!allRepairs) {
		cs.code = 404
		cs.messege = 'Not found'
		cs.status = 'fail'
	}else {
		cs.code = 200
		cs.messege = 'User found successfilly'
		cs.status = 'success'
	}

	const { code, messege, status } = cs
	res.status(code).json({
		code,
		messege,
		status,
		allRepairs
	})
}

async function findRepairsByid (req, res) {
	const cs = { code: 0, messege: '', status: '' }	
	const { id } = req.params

	const repairs = await Repairs.findOne({
		where: {
			id,
			status: 'pending'
		}
	})

	if(!repairs){
		cs.code = 404
		cs.messege = 'Not found'
		cs.status = 'fail'
	}else {
		cs.code = 200
		cs.messege = 'User found successfilly'
		cs.status = 'success'
	}

	const { code, messege, status } = cs
	res.status(code).json({
		code,
		messege,
		status,
		repairs
	})
}

async function newRepairs (req, res) {
	const cs = { code: 0, messege: '', status: '' }
	const { date, userId } = req.body

	const userById = await User.findOne({
		where: {
			id: userId,
			status: 'available'
		}
	})

	const resStatus = () => {
		res.status(cs.code).json({
			code: cs.code,
			messege: cs.messege,
			status: cs.status
		})
	}

	if(!userById) {
		cs.code = 404
		cs.messege = 'User not found'
		cs.status = 'fail'
		return resStatus() 
	}

	const repairs = await Repairs.create({
		date: date.toLowerCase(),
		userId	
	}) 

	if(!repairs) {
		cs.code = 406
		cs.messege = 'Not created'
		cs.status = 'fail'
	}else {
		cs.code = 201
		cs.messege = 'repairs created'
		cs.status = 'success'
	}
	
	const { code, messege, status } = cs
	res.status(code).json({
		code,
		messege,
		status,
		repairs
	})
}

async function updateRepairs (req, res) {
	const cs = { code: 0, messege: '', status: '' }
	const { id } = req.params
	
	const repairs = await Repairs.findOne({
		where: {
			id,
			status: 'pending'
		}
	})
	
	if(!repairs) {
		cs.code = 404
		cs.messege = 'Not found'
		cs.status = 'fail'
	}

	const repairsUpdated = await repairs?.update({ status: 'completed' })
	
	if(!repairsUpdated){
		cs.code = 406
		cs.messege = 'Not updated'
		cs.status = 'fail'
	}else {
		cs.code = 200
		cs.messege = 'Repairs updated successfilly'
		cs.status = 'success'
	}

	const { code, messege, status } = cs
	res.status(code).json({
		code,
		messege,
		status,
		repairs
	})
}

async function deleteRepairs (req, res) {
	const cs = { code: 0, messege: '', status: '' }	
	const { id } = req.params

	const repairs = await Repairs.findOne({
		where: {
			id,
			status: 'pending' 
		}
	})

	const resStatus = () => {
		res.status(cs.code).json({
			code: cs.code,
			messege: cs.messege,
			status: cs.status
		})
	}

	if(!repairs){
		cs.code = 404
		cs.messege = 'Not found'
		cs.status = 'fail'
		return resStatus()
	}

	const repairsDeleted = await repairs?.update({ status: 'cancelled' })

	if(!repairsDeleted){
		cs.code = 406
		cs.messege = 'Not cancelled'
		cs.status = 'fail'
	}else {
		cs.code = 200
		cs.messege = 'Repairs cancelled successfilly'
		cs.status = 'success'
	}

	const { code, messege, status } = cs
	res.status(code).json({
		code,
		messege,
		status,
		repairsDeleted
	})
}

module.exports = {
	findAllRepairs,
	newRepairs,
	updateRepairs,
	findRepairsByid,
	deleteRepairs
}
