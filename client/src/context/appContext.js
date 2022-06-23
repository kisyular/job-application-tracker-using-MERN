import React, { useReducer, useContext } from 'react'

import reducer from './reducer'
import axios from 'axios'
import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	SETUP_USER_BEGIN,
	SETUP_USER_SUCCESS,
	SETUP_USER_ERROR,
	LOGIN_USER_BEGIN,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_ERROR,
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
const BASE_URL = 'http://localhost:8000/api/v1'

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
	statusOptions: ['interview', 'declined', 'pending'],
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
			const response = await axios.post(
				`${BASE_URL}/auth/${endPoint}`,
				currentUser
			)
			const { user, token, location } = response.data
			// console.log(response)
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

	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				clearAlert,
				setupUser,
				toggleSidebar,
				logoutUser,
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
