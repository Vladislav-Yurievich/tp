import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Auth from './pages/Auth'
import ProfilePage from './pages/ProfilePage' //профиль
import CalendarPage from './pages/CalendarPage' //календарь
import AttendancePage from './pages/AttendancePage' // посещаемость
import RatingPage from './pages/RatingPage' //рейтинговая система
import JournalPage from './pages/JournalPage' //журнал пропусков йопта
import { useCookies } from 'react-cookie'

// Placeholder components for other routes

const SettingsPage = () => <div>Настройки</div>
const SecurityPage = () => <div>Безопасность</div>
const AppearancePage = () => <div>Внешний вид сайта</div>

function App() {
	const [cookies] = useCookies(null)
	const authToken = cookies.AuthToken
	const authLogin = cookies.Login

	return (
		<BrowserRouter>
			<Routes>
				{!authToken ? (
					<Route path='*' element={<Auth />} />
				) : (
					<Route path='/' element={<MainLayout />}>
						<Route index element={<Navigate to='/profile' replace />} />
						<Route path='profile' element={<ProfilePage />} />
						<Route path='attendance' element={<AttendancePage />} />
						<Route path='rating' element={<RatingPage />} />
						<Route path='journal' element={<JournalPage />} />
						<Route path='calendar' element={<CalendarPage />} />
						<Route path='settings' element={<SettingsPage />} />
						<Route path='security' element={<SecurityPage />} />
						<Route path='appearance' element={<AppearancePage />} />
						<Route path='*' element={<Navigate to='/profile' replace />} />
					</Route>
				)}
			</Routes>
		</BrowserRouter>
	)
}

export default App
