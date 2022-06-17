import Landing from './pages/Landing'
import Register from './pages/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Error from './pages/Error'
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/register' element={<Register />} />
				<Route path='/' element={<Landing />} />
				<Route path='*' element={<Error />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
