"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import ImageGallery from "@/components/products/ImageGallery";

export default function ProductPage() {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");

	const [product, setProduct] = useState(null);

	useEffect(() => {
		const getProduct = async () => {
			try {
				const res = await fetch(`/api/products?id=${id}`, {
					cache: "no-store",
				});
				if (res.ok) {
					const data = await res.json();
					setProduct(data.prod);
				}
			} catch (error) {
				console.log(error.message);
			}
		};

		getProduct();
	}, []);

	return (
		<>
			{product === null && <main>Product Not Found</main>}
			{product && (
				<main className="p-4 xs:p-8 sm:py-8 sm:px-16">
					<div className="flex flex-row flex-wrap gap-4 my-8 ">
						<ImageGallery />
						<div className="w-64 sm:w-96 mx-auto">
							<span className="block my-2">{product?.type}</span>
							<h1 className="text-4xl font-bold">{product?.name}</h1>
							<span className="block my-2 text-4xl font-bold">
								${product?.price}
							</span>
							<p className="my-8">{product?.about}</p>
							<p className="my-8">{product?.description}</p>
							<div className="flex flex-row gap-2 flex-wrap">
								<button className="p-2 bg-neutral-200">Add to cart</button>
								<button className="p-2 bg-neutral-200">Buy</button>
							</div>
						</div>
					</div>
				</main>
			)}
		</>
	);
}
