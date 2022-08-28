import dbConnect from '../../../utils/mongo'
import Order from '../../../models/Order'

const handler = async (req, res) => {
	const {
		method,
		query: { id },
		cookies,
	} = req

	console.log(cookies)

	const token = cookies.token

	await dbConnect()

	if (method === 'GET') {
		try {
			const order = await Order.findById(id)
			res.status(200).json(order)
		} catch (error) {
			res.status(500).json(error)
		}
	}
	if (method === 'PUT') {
		const text = `token: ${token}, process token: ${process.env.TOKEN}`
		if (!token || token !== process.env.TOKEN) {
			return res.status(401).json('Not authenticated!' + text)
		}
		try {
			const order = await Order.findByIdAndUpdate(id, req.body, {
				new: true,
			})
			res.status(200).json(order)
		} catch (error) {
			res.status(500).json(error)
		}
	}
}

export default handler
