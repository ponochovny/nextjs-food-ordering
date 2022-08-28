import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from '../../styles/Login.module.css'

const Login = () => {
	const [username, setUsername] = useState(null)
	const [password, setPassword] = useState(null)
	const [error, setError] = useState(null)
	const router = useRouter()

	const handleClick = async () => {
		try {
			await axios.post(
				'https://630afdac94f02807300aa3df--illustrious-malasada-0b0248.netlify.app/api/login',
				{
					username,
					password,
				}
			)
			setError(false)
			router.push('/admin')
		} catch (error) {
			setError(true)
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h1>Admin Dashboard</h1>
				<input
					type='text'
					placeholder='username'
					className={styles.input}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type='password'
					placeholder='password'
					className={styles.input}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button onClick={handleClick} className={styles.button}>
					Sign In
				</button>
				{error && <span className={styles.error}>Wrong Credentials!</span>}
			</div>
		</div>
	)
}

export default Login
