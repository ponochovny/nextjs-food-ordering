import styles from '../styles/Cart.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	PayPalScriptProvider,
	PayPalButtons,
	usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import axios from 'axios'
import { useRouter } from 'next/router'
import { reset } from '../redux/cartSlice'
import OrderDetails from '../components/OrderDetails'

const Cart = () => {
	const [open, setOpen] = useState(false)
	const [cash, setCash] = useState(false)
	const cart = useSelector((state) => state.cart)
	const amount = cart.total
	const currency = 'USD'
	const style = { layout: 'vertical' }

	const [mounted, setMounted] = useState(false)
	const dispatch = useDispatch()
	const router = useRouter()

	useEffect(() => setMounted(true), [])

	if (!mounted) return null

	const createOrder = async (data) => {
		try {
			const res = await axios.post(
				'https://630afdac94f02807300aa3df--illustrious-malasada-0b0248.netlify.app/api/orders',
				data
			)
			res.status === 201 && router.push('/orders/' + res.data._id)
			dispatch(reset())
		} catch (error) {
			console.log(error)
		}
	}

	// Custom component to wrap the PayPalButtons and handle currency changes
	const ButtonWrapper = ({ currency, showSpinner }) => {
		// usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
		// This is the main reason to wrap the PayPalButtons in a new component
		const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

		useEffect(() => {
			dispatch({
				type: 'resetOptions',
				value: {
					...options,
					currency: currency,
				},
			})
		}, [currency, showSpinner])

		return (
			<>
				{showSpinner && isPending && <div className='spinner' />}
				<PayPalButtons
					style={style}
					disabled={false}
					forceReRender={[amount, currency, style]}
					fundingSource={undefined}
					createOrder={(data, actions) => {
						return actions.order
							.create({
								purchase_units: [
									{
										amount: {
											currency_code: currency,
											value: amount,
										},
									},
								],
							})
							.then((orderId) => {
								// Your code here after create the order
								return orderId
							})
					}}
					onApprove={async (data, actions) => {
						return actions.order.capture().then((details) => {
							const shipping = details.purchase_units[0].shipping
							createOrder({
								customer: shipping.name.full_name,
								address: shipping.address.address_line_1,
								total: cart.total,
								method: 1,
							})
						})
					}}
				/>
			</>
		)
	}

	const payPalButtonRender = () => (
		<div className={styles.paymentMethods}>
			<button className={styles.payButton} onClick={() => setCash(true)}>
				CASH ONDELIVERY
			</button>
			<PayPalScriptProvider
				options={{
					'client-id':
						'AdNpnO4DmS-7465ag2e31aebdSrm3N0MokxLKFOW6YCB6WeIXQP_EK5rgraxQsRRx738HKtHCfiDFJtP',
					components: 'buttons',
					currency: 'USD',
					'disable-funding': 'credit,card,p24',
				}}
			>
				<ButtonWrapper currency={currency} showSpinner={false} />
			</PayPalScriptProvider>
		</div>
	)

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<table className={styles.table}>
					<thead>
						<tr className={styles.tr}>
							<th>Product</th>
							<th>Name</th>
							<th>Extras</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						{cart.products.map((product) => (
							<tr className={styles.tr} key={product._id + Math.random()}>
								<td>
									<div className={styles.imgContainer}>
										<Image
											src={product.img}
											layout='fill'
											objectFit='cover'
											alt=''
										/>
									</div>
								</td>
								<td>
									<span className={styles.name}>{product.title}</span>
								</td>
								<td>
									<span className={styles.extras}>
										{product.extras.map((extra, i) => {
											const ending =
												product.extras.length - 1 === i ? '.' : ', '
											return (
												<span key={extra._id}>
													{extra.text}
													{ending}
												</span>
											)
										})}
									</span>
								</td>
								<td>
									<span className={styles.price}>${product.price}</span>
								</td>
								<td>
									<span className={styles.quantity}>{product.quantity}</span>
								</td>
								<td>
									<span className={styles.total}>
										${product.price * product.quantity}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className={styles.right}>
				<div className={styles.wrapper}>
					<h2 className={styles.title}>CART TOTAL</h2>
					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
					</div>
					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>Discount:</b>$0.00
					</div>
					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>Total:</b>${cart.total}
					</div>
					{open ? (
						payPalButtonRender()
					) : (
						<button className={styles.button} onClick={() => setOpen(true)}>
							CHECKOUT NOW
						</button>
					)}
				</div>
			</div>
			{cash && <OrderDetails total={cart.total} createOrder={createOrder} />}
		</div>
	)
}

export default Cart
