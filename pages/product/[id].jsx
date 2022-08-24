import Image from 'next/image'
import { useState } from 'react'
import styles from '../../styles/Product.module.css'

const Product = () => {
	const [size, setSize] = useState(0)

	const pizza = {
		id: 1,
		img: '/img/pizza.png',
		name: 'CAMPAHNOLA',
		price: [19.9, 23.9, 27.9],
		desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium pariatur nam autem, mollitia aspernatur enim laboriosam perspiciatis explicabo reprehenderit odio maiores aut maxime dolor voluptates saepe iure modi ipsa neque.',
	}

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<div className={styles.imgContainer}>
					<Image src={pizza.img} layout='fill' alt='' objectFit='contain' />
				</div>
			</div>
			<div className={styles.right}>
				<div className={styles.title}>{pizza.name}</div>
				<span className={styles.price}>${pizza.price[size]}</span>
				<p className={styles.desc}>{pizza.desc}</p>
				<h3 className={styles.choose}>Choose your size</h3>
				<div className={styles.sizes}>
					<div className={styles.size} onClick={() => setSize(0)}>
						<Image src='/img/size.png' layout='fill' alt='' />
						<span className={styles.number}>Small</span>
					</div>
					<div className={styles.size} onClick={() => setSize(1)}>
						<Image src='/img/size.png' layout='fill' alt='' />
						<span className={styles.number}>Medium</span>
					</div>
					<div className={styles.size} onClick={() => setSize(2)}>
						<Image src='/img/size.png' layout='fill' alt='' />
						<span className={styles.number}>Large</span>
					</div>
				</div>
				<h3 className={styles.choose}>Choose additional ingredients</h3>
				<div className={styles.ingredients}>
					<div className={styles.option}>
						<input
							type='checkbox'
							id='double'
							name='double'
							className={styles.checkbox}
						/>
						<label htmlFor='double'>Double Ingredients</label>
					</div>
					<div className={styles.option}>
						<input
							type='checkbox'
							id='cheese'
							name='cheese'
							className={styles.checkbox}
						/>
						<label htmlFor='cheese'>Extra Cheese</label>
					</div>
					<div className={styles.option}>
						<input
							type='checkbox'
							id='spicy_sauce'
							name='spicy_sauce'
							className={styles.checkbox}
						/>
						<label htmlFor='spicy_sauce'>Spicy Sauce</label>
					</div>
					<div className={styles.option}>
						<input
							type='checkbox'
							id='garlic_sauce'
							name='garlic_sauce'
							className={styles.checkbox}
						/>
						<label htmlFor='garlic_sauce'>Garlic Sauce</label>
					</div>
				</div>
				<div className={styles.add}>
					<input type='number' defaultValue={1} className={styles.quantity} />
					<button className={styles.button}>Add to Cart</button>
				</div>
			</div>
		</div>
	)
}

export default Product
