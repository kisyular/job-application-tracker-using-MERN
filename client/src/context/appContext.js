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

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

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
		}, 3000)
	}

	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				clearAlert,
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

export { AppProvider }
