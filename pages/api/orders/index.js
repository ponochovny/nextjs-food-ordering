import dbConnect from '../../../utils/mongo'
import Order from '../../../models/Order'

const handler = async (req, res) => {
	const { method, cookies } = req

	await dbConnect()

	const token = cookies.token

	if (method === 'GET') {
		try {
			const orders = await Order.find()
			res.status(200).json(orders)
		} catch (error) {
			res.status(500).json(error)
		}
	}
	if (method === 'POST') {
		const text = `token: ${token}, process token: ${process.env.TOKEN}`
		if (!token || token !== process.env.TOKEN) {
			return res.status(401).json('Not authenticated!' + text)
		}
		try {
			const order = await Order.create(req.body)
			res.status(201).json(order)
		} catch (error) {
			res.status(500).json(error)
		}
	}
}

export default handler
