import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const RatingPage = () => {
	const [cookies] = useCookies(['AuthToken', 'Email'])
	const navigate = useNavigate()
	const [error, setError] = useState(null)
	const [profile, setProfile] = useState(null)

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
				}
			} catch (err) {
				setError('Ошибка при загрузке профиля')
				console.error('Ошибка:', err)
			}
		}

		fetchProfile()
	}, [cookies.AuthToken, navigate])

	// Временные данные для рейтинга и активностей
	const ratingData = {
		rating: 87,
		level: 'Отличник',
		attendance: '92%',
	}

	if (!profile) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='text-xl'>Загрузка...</div>
			</div>
		)
	}

	return (
		<div className='container mx-auto px-4 py-8 max-w-4xl'>
			<div className='bg-white rounded-lg shadow-sm p-6 mb-6'>
				<div className='flex flex-col md:flex-row gap-6'>
					{/* Аватар и основная информация */}
					<div className='flex flex-col items-center md:w-1/3'>
						<img
							src='https://randomuser.me/api/portraits/men/92.jpg'
							alt='Фото студента'
							className='w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-100'
						/>
						<div className='text-center'>
							<h2 className='text-2xl font-bold mb-1'>{profile.fullName}</h2>
							<span
								className={`px-3 py-1 rounded-full text-sm font-medium ${
									ratingData.rating >= 90
										? 'bg-purple-100 text-purple-800'
										: ratingData.rating >= 80
										? 'bg-blue-100 text-blue-800'
										: 'bg-yellow-100 text-yellow-800'
								}`}
							>
								Рейтинг: {ratingData.rating} ({ratingData.level})
							</span>
						</div>
					</div>

					{/* Детальная информация */}
					<div className='md:w-2/3'>
						<h3 className='text-xl font-semibold mb-4'>Личные данные</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div>
								<p className='text-sm text-gray-500'>Город</p>
								<p className='font-medium'>{profile.city}</p>
							</div>
							<div>
								<p className='text-sm text-gray-500'>Группа</p>
								<p className='font-medium'>{profile.group}</p>
							</div>
							<div>
								<p className='text-sm text-gray-500'>Зачётная книжка</p>
								<p className='font-medium'>{profile.studentId}</p>
							</div>
							<div>
								<p className='text-sm text-gray-500'>Телефон</p>
								<p className='font-medium'>{profile.phone}</p>
							</div>
							<div className='md:col-span-2'>
								<p className='text-sm text-gray-500'>Email</p>
								<p className='font-medium'>{profile.email}</p>
							</div>
						</div>

						<div className='mt-6 pt-6 border-t border-gray-100'>
							<h3 className='text-xl font-semibold mb-4'>Учебные показатели</h3>
							<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
								<div className='bg-blue-50 p-3 rounded-lg'>
									<p className='text-sm text-gray-500'>Посещаемость</p>
									<p className='text-lg font-bold text-blue-600'>
										{ratingData.attendance}
									</p>
								</div>
								<div className='bg-purple-50 p-3 rounded-lg'>
									<p className='text-sm text-gray-500'>Рейтинг</p>
									<p className='text-lg font-bold text-purple-600'>
										{ratingData.rating}
									</p>
								</div>
								<div className='bg-green-50 p-3 rounded-lg'>
									<p className='text-sm text-gray-500'>Уровень</p>
									<p className='text-lg font-bold text-green-600'>
										{ratingData.level}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Дополнительные карточки */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div className='bg-white rounded-lg shadow-sm p-6'>
					<h3 className='text-xl font-semibold mb-4'>Последние активности</h3>
					<ul className='space-y-3'>
						<li className='flex items-center space-x-3'>
							<div className='w-2 h-2 bg-green-500 rounded-full'></div>
							<span>Посещение лекции "Базы данных" - 15.05.2023</span>
						</li>
						<li className='flex items-center space-x-3'>
							<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
							<span>Сдача лабораторной работы №5 - 12.05.2023</span>
						</li>
						<li className='flex items-center space-x-3'>
							<div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
							<span>Получение оценки за курсовую - 10.05.2023</span>
						</li>
					</ul>
				</div>

				<div className='bg-white rounded-lg shadow-sm p-6'>
					<h3 className='text-xl font-semibold mb-4'>Ближайшие события</h3>
					<ul className='space-y-3'>
						<li className='flex items-center space-x-3'>
							<div className='w-2 h-2 bg-red-500 rounded-full'></div>
							<span>Экзамен по математике - 25.05.2023</span>
						</li>
						<li className='flex items-center space-x-3'>
							<div className='w-2 h-2 bg-purple-500 rounded-full'></div>
							<span>Консультация по диплому - 20.05.2023</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default RatingPage
