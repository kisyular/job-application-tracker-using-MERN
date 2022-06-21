import React, { useEffect } from 'react'

const Dashboard = () => {
	const fetchData = async () => {
		try {
			const response = await fetch('http://localhost:8000/')
			const d = await response.json()
			console.log(d)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])
	return <h1>Dashboard</h1>
}

export default Dashboard
