import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'

// const getUser = async (req, res) => {} this register function is used to register a new user.
const register = async (req, res) => {
	// const { email, password, name, lastName, location } = req.body // this is used to get the values from the request body.
	const { name, email, password } = req.body
	// this is used to check if the email, name and password are provided.
	if (!name || !email || !password) {
		throw new BadRequestError('please provide all values')
	}

	// const user = new User({ name, email, password }) // this is used to find the user in the database. If the user is not found, then it will create a new user.
	const userAlreadyExists = await User.findOne({ email })
	if (userAlreadyExists) {
		throw new BadRequestError('Email already in use')
	}
	const user = await User.create({ name, email, password })
	const token = user.createJWT() // this is used to create a JSON Web Token. It is used to create a token which is used to authenticate the user.

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

// const login = async (req, res) => {} this login function is used to login a user. It is used to login a user and create a token which is used to authenticate the user.
const login = async (req, res) => {
	const { email, password } = req.body
	// this is used to check if the email and password are provided.
	if (!email || !password) {
		throw new BadRequestError('Please provide all values')
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
