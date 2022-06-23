import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	SETUP_USER_BEGIN,
	SETUP_USER_SUCCESS,
	SETUP_USER_ERROR,
	// REGISTER_USER_BEGIN,
	// REGISTER_USER_SUCCESS,
	// REGISTER_USER_ERROR,
	// LOGIN_USER_BEGIN,
	// LOGIN_USER_SUCCESS,
	// LOGIN_USER_ERROR,
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

import { initialState } from './appContext'

const reducer = (state, action) => {
	if (action.type === DISPLAY_ALERT) {
		return {
			...state,
			showAlert: true,
			alertType: 'danger',
			alertText: 'Please provide all values!',
		}
	}

	if (action.type === CLEAR_ALERT) {
		return {
			...state,
			showAlert: false,
			alertType: '',
			alertText: '',
		}
	}

	if (action.type === SETUP_USER_BEGIN) {
		return { ...state, isLoading: true }
	}
	if (action.type === SETUP_USER_SUCCESS) {
		return {
			...state,
			user: action.payload.user,
			token: action.payload.token,
			userLocation: action.payload.location,
			jobLocation: action.payload.location,
			isLoading: false,
			showAlert: true,
			alertType: 'success',
			alertText: action.payload.alertText,
		}
	}
	if (action.type === SETUP_USER_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: 'danger',
			alertText: action.payload.msg,
		}
	}

	if (action.type === TOGGLE_SIDEBAR) {
		return { ...state, showSidebar: !state.showSidebar }
	}

	if (action.type === LOGOUT_USER) {
		return {
			...initialState,
			user: null,
			token: null,
			jobLocation: '',
			userLocation: '',
		}
	}
}
export default reducer
