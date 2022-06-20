import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from 'validator'

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide name'],
		minlength: 3,
		maxlength: 20,
		trim: true,
	},
	email: {
		type: String,
		required: [true, 'Please provide email'],
		validate: {
			validator: validator.isEmail,
			message: 'Please provide a valid email',
		},
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Please provide password'],
		minlength: 6,
		select: false,
	},
	lastName: {
		type: String,
		trim: true,
		maxlength: 20,
		default: 'Kisyula',
	},
	location: {
		type: String,
		trim: true,
		maxlength: 20,
		default: 'Nairobi, Kenya',
	},
})

export default mongoose.model('User', UserSchema)
