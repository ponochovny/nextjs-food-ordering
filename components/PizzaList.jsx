import styles from '../styles/PizzaList.module.css'
import PizzaCard from './PizzaCard'

const PizzaList = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
			<p className={styles.desc}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
				pariatur nam autem, mollitia aspernatur enim laboriosam perspiciatis
				explicabo reprehenderit odio maiores aut maxime dolor voluptates saepe
				iure modi ipsa neque.
			</p>
			<div className={styles.wrapper}>
				<PizzaCard />
				<PizzaCard />
				<PizzaCard />
				<PizzaCard />
				<PizzaCard />
				<PizzaCard />
				<PizzaCard />
			</div>
		</div>
	)
}

export default PizzaList
