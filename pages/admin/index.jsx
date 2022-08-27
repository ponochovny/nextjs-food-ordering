import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../../styles/Admin.module.css'

const Index = ({ orders, products }) => {
	const [pizzaList, setPizzaList] = useState(products)
	const [orderList, setOrderList] = useState(orders)
	const status = ['preparing', 'on the way', 'delivered']

	const handleDelete = async (id) => {
		try {
			await axios.delete('http://localhost:3000/api/products/' + id)
			setPizzaList(pizzaList.filter((pizza) => pizza._id !== id))
		} catch (error) {
			console.log(error)
		}
	}

	const handleStatus = async (id) => {
		const item = orderList.filter((order) => order._id === id)[0]
		const currentStatus = item.status

		try {
			const res = await axios.put('http://localhost:3000/api/orders/' + id, {
				status: currentStatus + 1,
			})
			setOrderList([res.data, ...orderList.filter((order) => order._id !== id)])
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.item}>
				<h1 className={styles.title}>Products</h1>
				<table className={styles.table}>
					<thead>
						<tr className={styles.tr}>
							<th>Image</th>
							<th>Id</th>
							<th>Title</th>
							<th>Price</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{pizzaList.map((product) => (
							<tr className={styles.tr} key={product._id}>
								<td>
									<Image
										src={product.img}
										width={50}
										height={50}
										objectFit='cover'
										alt=''
									/>
								</td>
								<td>{product._id.slice(0, 5)}...</td>
								<td>{product.title}</td>
								<td>${product.prices[0]}</td>
								<td>
									<button className={styles.button}>Edit</button>
									<button
										className={styles.button}
										onClick={() => handleDelete(product._id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className={styles.item}>
				<h1 className={styles.title}>Orders</h1>
				<table className={styles.table}>
					<thead>
						<tr className={styles.tr}>
							<th>Id</th>
							<th>Customer</th>
							<th>Total</th>
							<th>Payment</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{orderList.map((order) => (
							<tr className={styles.tr} key={order._id}>
								<td>{order._id.slice(0, 5)}...</td>
								<td>{order.customer}</td>
								<td>${order.total}</td>
								<td>
									<span>{order.method === 0 ? 'cash' : 'paid'}</span>
								</td>
								<td>{status[order.status]}</td>
								<td>
									<button
										className={styles.button}
										onClick={() => handleStatus(order._id)}
									>
										Next stage
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export const getServerSideProps = async (ctx) => {
	const myCookie = ctx.req?.cookies || ''

	if (myCookie.token !== process.env.TOKEN) {
		return {
			redirect: {
				destination: '/admin/login',
				permanent: false,
			},
		}
	}

	let productRes
	let orderRes

	try {
		productRes = await axios.get('http://localhost:3000/api/products')
		orderRes = await axios.get('http://localhost:3000/api/orders')
	} catch (error) {
		console.log('HERE 2 error')
		return {
			props: {
				orders: [],
				products: [],
			},
		}
	}

	return {
		props: {
			orders: orderRes.data,
			products: productRes.data,
		},
	}
}

export default Index
