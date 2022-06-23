import Job from '../models/Job.js'
import { StatusCodes } from 'http-status-codes'
import {
	BadRequestError,
	//   NotFoundError,
	//   UnAuthenticatedError,
} from '../errors/index.js'
// import checkPermissions from '../utils/checkPermissions.js'
// import moment from 'moment'

const createJob = async (req, res) => {
	const { position, company } = req.body

	if (!position || !company) {
		throw new BadRequestError('Please Provide All Values')
	}

	req.body.createdBy = req.user.userId

	const job = await Job.create(req.body)
	res.status(StatusCodes.CREATED).json({ job })
}

const getAllJobs = async (req, res) => {
	const { status, jobType, sort, search } = req.query
	res.send('Get All Jobs')
}
const updateJob = async (req, res) => {
	const { id: jobId } = req.params
	const { company, position } = req.body
	if (!position || !company) {
		// throw new BadRequestError('Please provide all values')
		console.log('Please provide all values')
	}
	res.send('Update Job')
}

const deleteJob = async (req, res) => {
	const { id: jobId } = req.params
	res.send('Delete Job')
}

const showStats = async (req, res) => {
	res.send('Show Stats')
}

export { createJob, deleteJob, getAllJobs, updateJob, showStats }
