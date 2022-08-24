import Image from 'next/image'
import styles from '../styles/Footer.module.css'

const Footer = () => {
	return (
		<div className={styles.container}>
			<div className={styles.item}>
				<Image src='/img/bg.png' layout='fill' alt='' objectFit='cover' />
			</div>
			<div className={styles.item}>
				<div className={styles.card}>
					<h2 className={styles.motto}>
						OH YES, WE DID. THE PONOCHOVNY PIZZA, WELL BAKED SPICE OF PIZZA.
					</h2>
				</div>
				<div className={styles.card}>
					<h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
					<p className={styles.text}>
						1654 R. Don Road #304.
						<br /> NewYork, 85022
						<br /> (602) 867-1010
					</p>
					<p className={styles.text}>
						1654 R. Don Road #304.
						<br /> NewYork, 85022
						<br /> (602) 867-1010
					</p>
					<p className={styles.text}>
						1654 R. Don Road #304.
						<br /> NewYork, 85022
						<br /> (602) 867-1010
					</p>
					<p className={styles.text}>
						1654 R. Don Road #304.
						<br /> NewYork, 85022
						<br /> (602) 867-1010
					</p>
				</div>
				<div className={styles.card}>
					<h1 className={styles.title}>WORKING HOURS</h1>

					<p className={styles.text}>
						MONDAY UNTIL FRIDAY
						<br /> 9:00 - 22:00
					</p>
					<p className={styles.text}>
						SATURDAY - SUNDAY
						<br /> 12:00 - 23:00
					</p>
				</div>
			</div>
		</div>
	)
}

export default Footer
