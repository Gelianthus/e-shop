"use client";

import { useState, useEffect } from "react";
import ProductCard from "../ProductCard";

export default function DigitalProds() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await fetch(`/api/products/digital-products`, {
					cache: "no-store",
				});
				if (res.ok) {
					const data = await res.json();
					setProducts(data.products);
				} else {
					const data = await res.json();
					console.log(data.message);
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchProducts();

		setLoading(false);
	}, []);

	return (
		<div className="flex flex-row flex-wrap justify-center gap-2 ">
			{loading && (
				<p className="my-4 font-semibold text-lg text-center">
					Loading products
				</p>
			)}

			{products.length === 0 && !loading ? (
				<p className="my-4 font-semibold text-lg text-center">
					No products to display
				</p>
			) : (
				products.map((product) => {
					return (
						<ProductCard
							key={product._id}
							product={product}
						/>
					);
				})
			)}
		</div>
	);
}
