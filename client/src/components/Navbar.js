import { useState, useEffect } from 'react'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'
import Logo from './Logo'
import Wrapper from '../assets/wrappers/Navbar'
import moment from 'moment'

const Navbar = () => {
	const { toggleSidebar, logoutUser, user } = useAppContext()
	const [showLogout, setShowLogout] = useState(false)
	const [greating, setGreating] = useState('')

	useEffect(() => {
		const currentHour = moment().format('HH')
		if (currentHour === 0 || currentHour < 12)
			return setGreating('Good Morning')
		else if (currentHour <= 19) return setGreating('Good Afternon')
		else return setGreating('Good Evening')
	}, [])

	return (
		<Wrapper>
			<div className='nav-center'>
				<button className='toggle-btn' onClick={toggleSidebar}>
					<FaAlignLeft />
				</button>
				<h3
					onClick={toggleSidebar}
					className='toggle-greating logo-text'
				>
					{greating}
				</h3>
				<div>
					<Logo />
					<h3 className='logo-text'>dashboard</h3>
				</div>

				<div className='btn-container'>
					<button
						className='btn'
						onClick={() => setShowLogout(!showLogout)}
					>
						<FaUserCircle />
						{user?.name}
						<FaCaretDown />
					</button>
					<div
						className={
							showLogout ? 'dropdown show-dropdown' : 'dropdown'
						}
					>
						<button onClick={logoutUser} className='dropdown-btn'>
							logout
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	)
}

export default Navbar
