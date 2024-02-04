"use client";

import { useState, useEffect } from "react";
import ProductCard from "../ProductCard";

export default function PhysicalProds() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await fetch(`/api/products/physical-products`, {
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
		<div className="flex flex-row flex-wrap gap-2 p-4 bg-neutral-600">
			{loading && <p>Loading products</p>}

			{products.length === 0 && !loading ? (
				<p>No products to display</p>
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
