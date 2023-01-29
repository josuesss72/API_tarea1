const {User} = require("../modules/user.model")

const getUsers = async(req, res) => {

	const cs = { code: 0, messege: '', status: '' }

	const allUsers = await User.findAll({
		where: {
			status: 'available'
		}
	})

	if(!allUsers){
		cs.code = 404
		cs.messege = 'Users not found'
		cs.status = 'fail'
	}else {
		cs.code = 200
		cs.messege = 'Users found successfilly'
		cs.status = 'success'
	}

	const { code, messege, status } = cs
	res.status(code).json({
		code,
		status,
		messege,
		allUsers
	})	
}

async function oneUser (req, res) {
	const { id } = req.params

	const user = await User.findOne({
		where: {
			id,
			status: 'available'
		}
	})

	const cs = { code: 0, messege: '', status: '' }

	if(!user) {
		cs.code = 404,
		cs.messege = 'Not Found'
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
		user
	})
}
const postUsers = async(req, res) => {

	const cs = { code: 0, messege: '', status: '' }
	const { name, email, password, role } = req.body

	const user = await User.findOne({
		where: {
			name,
			email
		}
	})

	const resStatus = () => {
		res.status(cs.code).json({
			code: cs.code,
			messege: cs.messege,
			status: cs.status
		})
	}

	if(user){
		cs.code = 409
		cs.messege = 'User already exists'
		cs.status = 'fail'
		return resStatus()
	}

	const userCreated = await User.create({
		name: name.toLowerCase(),
		email: email.toLowerCase(),
		password,
		role: role.toLowerCase()
	})


	if(!userCreated){
		cs.code = 406
		cs.messege = 'Not Created'
		cs.status = 'fail'
	}else {
		cs.code = 201
		cs.messege = 'Created successfilly'
		cs.status = 'success'
	}

	const { code, messege, status } = cs
	res.status(code).json({
		code,
		status,
		messege,
		userCreated
	})	
}

const putUsers = (req, res) => {
	res.json({
		status: 'success',
		messege: 'ROUTE - PUT'
	})	
}
const patchUsers = async (req, res) => {
	const { id } = req.params
	const { name, email } = req.body

	const user = await User.findOne({
		where: {
			id,
			status: 'available'
		}
	})

	const userUpdated = await user?.update({name, email})

	const cs = { code: 0, messege: '', status: '' }

	if(!userUpdated) {
		cs.code = 406
		cs.messege = 'Not update'
		cs.status = 'fail'
	}else {
		cs.code = 200
		cs.messege = 'User update successfilly'
		cs.status = 'success'
	}

	const { code, status, messege } = cs
	res.status(code).json({
		code,
		status,
		messege,
		userUpdated
	})	
}
const deleteUsers = async(req, res) => {

	const cs = { code: 0, messege: '', status: '' }

	const { id } = req.params
	const user = await User.findOne({
		where: {
			id,
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

	if(!user){
		cs.code = 404
		cs.messege = 'Not found'
		cs.status = 'fail'
		return resStatus() 
	}
	
	const userDesabled = await user.update({status: 'disabled'})

	if(!userDesabled){
		cs.code = 406
		cs.messege = 'User not deleted'
		cs.status = 'fail'
	}else {
		cs.code = 200
		cs.messege = 'User deleted successfilly'
		cs.status = 'success'
	}

	const { code, messege, status } = cs
	res.status(code).json({
		code,
		status,
		messege,
		userDesabled
	})
}

module.exports = {
	getUsers,
	oneUser,
	postUsers,
	putUsers,
	patchUsers,
	deleteUsers
}
