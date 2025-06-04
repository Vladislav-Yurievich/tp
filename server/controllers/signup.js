import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const prisma = new PrismaClient()

export async function postSignUp(req, res) {
	try {
		const {
			firstName,
			lastName,
			middleName,
			city,
			group,
			studentId,
			phone,
			email,
			password,
		} = req.body

		// Проверяем, существует ли пользователь с таким email или studentId
		const existingUser = await prisma.users.findFirst({
			where: {
				OR: [{ email }, { studentId }],
			},
		})

		if (existingUser) {
			return res.status(400).json({
				error:
					'Пользователь с таким email или номером зачётной книжки уже существует',
			})
		}

		const salt = bcrypt.genSaltSync(10)
		const hashedPassword = bcrypt.hashSync(password, salt)

		const newUser = await prisma.users.create({
			data: {
				firstName,
				lastName,
				middleName,
				city,
				group,
				studentId,
				phone,
				email,
				hashed_password: hashedPassword,
			},
			select: {
				id: true,
				email: true,
				firstName: true,
				lastName: true,
			},
		})

		const token = jwt.sign(
			{
				id: newUser.id,
				email: newUser.email,
			},
			process.env.SECRET_KEY,
			{ expiresIn: '24h' }
		)

		res.json({
			user: {
				id: newUser.id,
				email: newUser.email,
				firstName: newUser.firstName,
				lastName: newUser.lastName,
			},
			token,
		})
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Ошибка при регистрации пользователя' })
	}
}
