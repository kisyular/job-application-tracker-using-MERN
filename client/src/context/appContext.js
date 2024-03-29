import React, { useReducer, useContext } from 'react'

import reducer from './reducer'
import axios from 'axios'
import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	SETUP_USER_BEGIN,
	SETUP_USER_SUCCESS,
	SETUP_USER_ERROR,
	TOGGLE_SIDEBAR,
	LOGOUT_USER,
	UPDATE_USER_BEGIN,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_ERROR,
	HANDLE_CHANGE,
	CLEAR_VALUES,
	CREATE_JOB_BEGIN,
	CREATE_JOB_SUCCESS,
	CREATE_JOB_ERROR,
	GET_JOBS_BEGIN,
	GET_JOBS_SUCCESS,
	SET_EDIT_JOB,
	DELETE_JOB_BEGIN,
	EDIT_JOB_BEGIN,
	EDIT_JOB_SUCCESS,
	EDIT_JOB_ERROR,
	SHOW_STATS_BEGIN,
	SHOW_STATS_SUCCESS,
	CLEAR_FILTERS,
	CHANGE_PAGE,
} from './actions'

// set as default
const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')
// const BASE_URL = 'http://localhost:8000/api/v1' // for local development

const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: '',
	alertType: '',
	user: user ? JSON.parse(user) : null,
	token: token,
	userLocation: userLocation || '',
	showSidebar: false,
	isEditing: false,
	editJobId: '',
	position: '',
	company: '',
	jobLocation: userLocation || '',
	jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
	jobType: 'full-time',
	// statusOptions: ['••• pending', '➜ interview', '✘ declined', '✔︎ accepted'],
	statusOptions: ['pending', 'interview', 'declined', 'accepted'],
	status: 'pending',
	jobs: [],
	totalJobs: 0,
	numOfPages: 1,
	page: 1,
	stats: {},
	monthlyApplications: [],
	search: '',
	searchStatus: 'all',
	searchType: 'all',
	sort: 'latest',
	sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const AppContext = React.createContext()
const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const authFetch = axios.create({
		baseURL: '/api/v1',
	})

	// request interceptor
	authFetch.interceptors.request.use(
		(config) => {
			config.headers.common['Authorization'] = `Bearer ${state.token}`
			return config
		},
		(error) => {
			return Promise.reject(error)
		}
	)
	// response interceptor
	authFetch.interceptors.response.use(
		(response) => {
			return response
		},
		(error) => {
			if (error.response.status === 401) {
				logoutUser()
			}
			return Promise.reject(error)
		}
	)

	const displayAlert = () => {
		dispatch({
			type: DISPLAY_ALERT,
		})
		clearAlert()
	}

	const clearAlert = () => {
		setTimeout(() => {
			dispatch({
				type: CLEAR_ALERT,
			})
		}, 4000)
	}

	//const addUserToLocalStorage = ({ user, token, location }) => {}. This function adds the user to local storage.
	const addUserToLocalStorage = ({ user, token, location }) => {
		localStorage.setItem('user', JSON.stringify(user))
		localStorage.setItem('token', token)
		localStorage.setItem('location', location)
	}

	//const removeUserFromLocalStorage = () => {}. This function removes the user from local storage.
	const removeUserFromLocalStorage = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('user')
		localStorage.removeItem('location')
	}

	//const registerUser = (user) => {}. This function registers a new user. It sends a POST request to the server. It uses axios to send the request. A dispatch is used to update the state.
	const setupUser = async ({ currentUser, endPoint, alertText }) => {
		dispatch({ type: SETUP_USER_BEGIN })
		try {
			const { data } = await axios.post(
				`/api/v1/auth/${endPoint}`,
				currentUser
			)
			const { user, token, location } = data
			dispatch({
				type: SETUP_USER_SUCCESS,
				payload: { user, token, location, alertText },
			})
			addUserToLocalStorage({ user, token, location })
		} catch (error) {
			const whichError =
				error.response.statusText === 'Internal Server Error'
			dispatch({
				type: SETUP_USER_ERROR,
				payload: {
					msg: whichError ? 'Server Error' : error.response.data.msg,
				},
			})
		}
		clearAlert()
	}

	//const toggleSidebar = () => {}. This function toggles the sidebar.
	const toggleSidebar = () => {
		dispatch({
			type: TOGGLE_SIDEBAR,
		})
	}

	//const logoutUser = () => {}. This function logs the user out. It removes the user from local storage.
	const logoutUser = () => {
		dispatch({
			type: LOGOUT_USER,
		})
		removeUserFromLocalStorage()
	}

	//const updateUser = (currentUser) => {}. This function updates the user. It sends a PUT request to the server. It uses axios to send the request. A dispatch is used to update the state.
	const updateUser = async (currentUser) => {
		dispatch({ type: UPDATE_USER_BEGIN })
		try {
			const { data } = await authFetch.patch(
				'/auth/updateUser',
				currentUser
			)
			const { user, token, location } = data
			dispatch({
				type: UPDATE_USER_SUCCESS,
				payload: { user, token, location },
			})
			addUserToLocalStorage({ user, token, location })
		} catch (error) {
			if (error.response.status !== 401) {
				dispatch({
					type: UPDATE_USER_ERROR,
					payload: { msg: error.response.data.msg },
				})
			}
		}
		clearAlert()
	}

	const handleChange = ({ name, value }) => {
		dispatch({
			type: HANDLE_CHANGE,
			payload: { name, value },
		})
	}

	const clearValues = () => {
		dispatch({
			type: CLEAR_VALUES,
		})
	}

	const createJob = async (job) => {
		dispatch({ type: CREATE_JOB_BEGIN })
		try {
			const { position, company, jobLocation, jobType, status } = state
			await authFetch.post('/jobs', {
				company,
				position,
				jobLocation,
				jobType,
				status,
			})
			dispatch({
				type: CREATE_JOB_SUCCESS,
			})
			// call function instead clearValues()
			dispatch({ type: CLEAR_VALUES })
		} catch (error) {
			if (error.response.status !== 401) return
			dispatch({
				type: CREATE_JOB_ERROR,
				payload: { msg: error.response.data.msg },
			})
		}
		clearAlert()
	}

	const getJobs = async () => {
		const { page, search, searchStatus, searchType, sort } = state
		let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
		if (search) {
			url = url + `&search=${search}`
		}
		dispatch({ type: GET_JOBS_BEGIN })
		try {
			const { data } = await authFetch.get(url)
			const { jobs, totalJobs, numOfPages } = data
			dispatch({
				type: GET_JOBS_SUCCESS,
				payload: { jobs, totalJobs, numOfPages },
			})
		} catch (error) {
			if (error.response.status !== 401) return
			logoutUser()
		}
		clearAlert()
	}

	const setEditJob = (id) => {
		dispatch({ type: SET_EDIT_JOB, payload: { id } })
	}

	const deleteJob = async (jobId) => {
		dispatch({ type: DELETE_JOB_BEGIN, payload: { jobId } })
		try {
			await authFetch.delete(`/jobs/${jobId}`)
			getJobs()
		} catch (error) {
			if (error.response.status !== 401) return
			logoutUser()
		}
		clearAlert()
	}

	const editJob = async (job) => {
		dispatch({ type: EDIT_JOB_BEGIN })
		try {
			const { position, company, jobLocation, jobType, status } = state
			await authFetch.patch(`/jobs/${state.editJobId}`, {
				company,
				position,
				jobLocation,
				jobType,
				status,
			})
			dispatch({ type: EDIT_JOB_SUCCESS })
			dispatch({ type: CLEAR_VALUES })
		} catch (error) {
			if (error.response.status !== 401) return
			dispatch({
				type: EDIT_JOB_ERROR,
				payload: { msg: error.response.data.msg },
			})
		}
		clearAlert()
	}

	const showStats = async () => {
		dispatch({ type: SHOW_STATS_BEGIN })
		try {
			const { data } = await authFetch('/jobs/stats')
			// console.log(data)
			dispatch({
				type: SHOW_STATS_SUCCESS,
				payload: {
					stats: data.defaultStats,
					monthlyApplications: data.monthlyApplications,
				},
			})
		} catch (error) {
			logoutUser()
		}
		clearAlert()
	}

	const clearFilters = () => {
		dispatch({ type: CLEAR_FILTERS })
	}

	const changePage = (page) => {
		dispatch({ type: CHANGE_PAGE, payload: { page } })
	}

	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				clearAlert,
				setupUser,
				toggleSidebar,
				logoutUser,
				updateUser,
				handleChange,
				clearValues,
				createJob,
				getJobs,
				setEditJob,
				deleteJob,
				editJob,
				showStats,
				clearFilters,
				changePage,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}
// make sure use
export const useAppContext = () => {
	return useContext(AppContext)
}

export { AppProvider, initialState }
