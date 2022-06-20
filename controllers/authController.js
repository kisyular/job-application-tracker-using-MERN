import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'

const register = async (req, res) => {
	const { name, email, password } = req.body
	if (!name || !email || !password) {
		throw new BadRequestError('please provide all values')
		// console.log('please provide all values')
	}
	const userAlreadyExists = await User.findOne({ email })
	if (userAlreadyExists) {
		throw new BadRequestError('Email already in use')
		// console.log('Email already in use')
	}
	const user = await User.create({ name, email, password })
	const token = user.createJWT()

	res.status(StatusCodes.CREATED).json({
		user: {
			email: user.email,
			lastName: user.lastName,
			location: user.location,
			name: user.name,
		},
		token,
		location: user.location,
	})
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
