import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const prisma = new PrismaClient()

export async function postLogin(req, res) {
	const { email, password } = req.body
	try {
		const user = await prisma.users.findUnique({ where: { email } })
		if (!user) {
			return res.status(404).json({ error: 'Пользователь не найден!' })
		}
		const success = await bcrypt.compare(password, user.hashed_password)
		if (!success) {
			return res.status(401).json({ error: 'Неверный пароль!' })
		}
		const token = jwt.sign({ id: user.id, email }, process.env.SECRET_KEY, {
			expiresIn: '1hr',
		})
		res.json({ token, email: user.email })
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Ошибка сервера' })
	}
}
