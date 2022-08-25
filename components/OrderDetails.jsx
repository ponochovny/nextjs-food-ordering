import { useState } from 'react'
import styles from '../styles/OrderDetails.module.css'

const OrderDetails = ({ total, createOrder }) => {
	const [customer, setCustomer] = useState('')
	const [address, setAddress] = useState('')

	const handleClick = () => {
		createOrder({ customer, address, total, method: 0 })
	}

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h1 className={styles.title}>You will pay $12 after delivery.</h1>
				<div className={styles.item}>
					<label className={styles.label}>Name Surname</label>
					<input
						placeholder='John Doe'
						type='text'
						className={styles.input}
						onChange={(e) => setCustomer(e.target.value)}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>Phone Number</label>
					<input
						type='text'
						placeholder='+38(099) 123 45 56'
						className={styles.input}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>Address</label>
					<textarea
						rows={5}
						type='text'
						placeholder='Elton St. 505 NY'
						className={styles.textarea}
						onChange={(e) => setAddress(e.target.value)}
					/>
				</div>
				<button className={styles.button} onClick={handleClick}>
					Order
				</button>
			</div>
		</div>
	)
}

export default OrderDetails
