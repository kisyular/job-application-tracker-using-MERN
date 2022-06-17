// import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
// import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'

const register = async (req, res) => {
	const { name, email, password } = req.body

	if (!name || !email || !password) {
		// throw new BadRequestError('please provide all values')
		console.log('please provide all values')
	}
	res.send('Register')
}

const login = async (req, res) => {
	const { email, password } = req.body
	if (!email || !password) {
		// throw new BadRequestError('Please provide all values')
		console.log('Please provide all values')
	}
	res.send('Login')
}

const updateUser = async (req, res) => {
	const { email, name, lastName, location } = req.body
	if (!email || !name || !lastName || !location) {
		// throw new BadRequestError('Please provide all values')
		console.log('Please provide all values')
	}
	res.send('Update User')
}

export { register, login, updateUser }
