import { Landing, Error, Register, ProtectedRoutes } from './pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
	AllJobs,
	AddJob,
	Profile,
	SharedLayout,
	Stats,
} from './pages/dashboard'
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						<ProtectedRoutes>
							<SharedLayout />
						</ProtectedRoutes>
					}
				>
					<Route index element={<Stats />} />
					<Route path='all-jobs' element={<AllJobs />}></Route>
					<Route path='add-job' element={<AddJob />}></Route>
					<Route path='profile' element={<Profile />}></Route>
				</Route>
				<Route path='/register' element={<Register />} />
				<Route path='/landing' element={<Landing />} />
				<Route path='*' element={<Error />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
