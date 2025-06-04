import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
	const [cookies, setCookie, removeCookie] = useCookies(['AuthToken', 'Email'])
	const navigate = useNavigate()
	const [error, setError] = useState(null)
	const [profile, setProfile] = useState(null)
	const [formData, setFormData] = useState(null)

	const handleLogout = () => {
		removeCookie('AuthToken')
		removeCookie('Email')
		navigate('/auth')
	}

	useEffect(() => {
		// Проверяем авторизацию
		if (!cookies.AuthToken) {
			navigate('/auth')
			return
		}

		// Загружаем данные профиля
		const fetchProfile = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_REACT_APP_SERVERURL}/profile`,
					{
						headers: {
							Authorization: `Bearer ${cookies.AuthToken}`,
						},
					}
				)

				const data = await response.json()

				if (data.error) {
					setError(data.error)
					if (response.status === 401) {
						navigate('/auth')
					}
				} else {
					setProfile(data)
					setFormData(data)
				}
			} catch (err) {
				setError('Ошибка при загрузке профиля')
				console.error('Ошибка:', err)
			}
		}

		fetchProfile()
	}, [cookies.AuthToken, navigate])

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const response = await fetch(
				`${import.meta.env.VITE_REACT_APP_SERVERURL}/profile`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${cookies.AuthToken}`,
					},
					body: JSON.stringify(formData),
				}
			)

			const data = await response.json()

			if (data.error) {
				setError(data.error)
			} else {
				setProfile(data)
				setError(null)
			}
		} catch (err) {
			setError('Ошибка при обновлении профиля')
			console.error('Ошибка:', err)
		}
	}

	if (!profile) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='text-xl'>Загрузка...</div>
			</div>
		)
	}

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<div className='flex justify-end mb-4'>
				<button
					onClick={handleLogout}
					className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700'
				>
					Выйти
				</button>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div className='bg-white p-6 rounded-lg shadow-md'>
					<h1 className='text-xl font-semibold mb-6'>Информация профиля</h1>
					<div className='space-y-4'>
						<div className='profile-field'>
							<span className='text-gray-600 font-medium'>ФИО:</span>
							<span className='ml-2'>{profile.fullName}</span>
						</div>
						<div className='profile-field'>
							<span className='text-gray-600 font-medium'>Город:</span>
							<span className='ml-2'>{profile.city}</span>
						</div>
						<div className='profile-field'>
							<span className='text-gray-600 font-medium'>Группа:</span>
							<span className='ml-2'>{profile.group}</span>
						</div>
						<div className='profile-field'>
							<span className='text-gray-600 font-medium'>
								Зачётная книжка:
							</span>
							<span className='ml-2'>{profile.studentId}</span>
						</div>
						<div className='profile-field'>
							<span className='text-gray-600 font-medium'>Телефон:</span>
							<span className='ml-2'>{profile.phone}</span>
						</div>
						<div className='profile-field'>
							<span className='text-gray-600 font-medium'>Email:</span>
							<span className='ml-2'>{profile.email}</span>
						</div>
					</div>
				</div>

				<div className='bg-white p-6 rounded-lg shadow-md'>
					<form onSubmit={handleSubmit} className='space-y-4'>
						<h2 className='text-xl font-semibold mb-6'>
							Редактирование профиля
						</h2>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Номер телефона
							</label>
							<input
								type='tel'
								name='phone'
								value={formData.phone}
								onChange={handleChange}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Email
							</label>
							<input
								type='email'
								name='email'
								value={formData.email}
								onChange={handleChange}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
							/>
						</div>
						{error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
						<div className='flex justify-end mt-6'>
							<button
								type='submit'
								className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700'
							>
								Сохранить изменения
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default ProfilePage
