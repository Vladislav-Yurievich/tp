import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function getProfile(req, res) {
	try {
		// Получаем токен из заголовка
		const token = req.headers.authorization?.split(' ')[1]

		if (!token) {
			return res.status(401).json({ error: 'Токен не предоставлен' })
		}

		// Проверяем токен
		const decoded = jwt.verify(token, process.env.SECRET_KEY)

		// Получаем данные пользователя
		const user = await prisma.users.findUnique({
			where: { id: decoded.id },
			select: {
				firstName: true,
				lastName: true,
				middleName: true,
				city: true,
				group: true,
				studentId: true,
				phone: true,
				email: true,
			},
		})

		if (!user) {
			return res.status(404).json({ error: 'Пользователь не найден' })
		}

		// Формируем полное имя
		const fullName = `${user.lastName} ${user.firstName}${
			user.middleName ? ' ' + user.middleName : ''
		}`

		res.json({
			...user,
			fullName,
		})
	} catch (error) {
		console.error('Ошибка при получении профиля:', error)
		if (error.name === 'JsonWebTokenError') {
			return res.status(401).json({ error: 'Недействительный токен' })
		}
		res.status(500).json({ error: 'Ошибка сервера' })
	}
}

export async function updateProfile(req, res) {
	try {
		// Получаем токен из заголовка
		const token = req.headers.authorization?.split(' ')[1]

		if (!token) {
			return res.status(401).json({ error: 'Токен не предоставлен' })
		}

		// Проверяем токен
		const decoded = jwt.verify(token, process.env.SECRET_KEY)

		const { email, phone } = req.body

		// Проверяем, не занят ли email другим пользователем
		if (email) {
			const existingUser = await prisma.users.findFirst({
				where: {
					email,
					NOT: {
						id: decoded.id,
					},
				},
			})

			if (existingUser) {
				return res.status(400).json({ error: 'Этот email уже используется' })
			}
		}

		// Обновляем данные пользователя
		const updatedUser = await prisma.users.update({
			where: { id: decoded.id },
			data: {
				email,
				phone,
			},
			select: {
				firstName: true,
				lastName: true,
				middleName: true,
				city: true,
				group: true,
				studentId: true,
				phone: true,
				email: true,
			},
		})

		// Формируем полное имя
		const fullName = `${updatedUser.lastName} ${updatedUser.firstName}${
			updatedUser.middleName ? ' ' + updatedUser.middleName : ''
		}`

		res.json({
			...updatedUser,
			fullName,
		})
	} catch (error) {
		console.error('Ошибка при обновлении профиля:', error)
		if (error.name === 'JsonWebTokenError') {
			return res.status(401).json({ error: 'Недействительный токен' })
		}
		res.status(500).json({ error: 'Ошибка при обновлении профиля' })
	}
}
