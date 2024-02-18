"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { modalControlStore } from "@/lib/zustand/modalControlStore";
import { userStore } from "@/lib/zustand/userStore";
import ImageGallery from "@/components/products/ImageGallery";
import SignInModal from "@/components/modals/SignInModal";
import AddToCartModal from "@/components/modals/AddToCartModal";
import BuyProductModal from "@/components/modals/BuyProductModal";

export default function ProductPage() {
	const { setAddToCartModalVisibility } = modalControlStore();
	const { setBuyProductModalVisibility } = modalControlStore();
	const { user } = userStore();
	const searchParams = useSearchParams();
	const id = searchParams.get("id");

	const [product, setProduct] = useState(null);
	const [quantity, setQuantity] = useState(1);

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
			{product === null && (
				<main className="p-4 xs:p-8 sm:py-8 sm:px-16">
					<h1 className="text-center font-bold text-2xl my-8">
						Product Not Found
					</h1>
				</main>
			)}
			{product && (
				<main className="p-4 xs:p-8 sm:py-8 sm:px-16">
					<div className="flex flex-row flex-wrap gap-4 my-8 ">
						<ImageGallery images={product.images} />
						<div className="w-64 sm:w-96 mx-auto">
							<span className="block my-2">{product?.type}</span>
							<h1 className="text-4xl font-bold">{product?.name}</h1>
							<span className="block my-2 text-4xl font-bold">
								${product?.price}
							</span>
							<p className="my-8">{product?.about}</p>
							<p className="my-8">{product?.description}</p>
							<div className="flex flex-row gap-2 flex-wrap">
								<button
									onClick={() => setAddToCartModalVisibility(true)}
									className="p-2 bg-gray-200 hover:bg-emerald-400 hover:text-neutral-50  active:bg-emerald-600 active:text-neutral-50"
								>
									Add to cart{" "}
									<span className="material-symbols-outlined wght-300 align-bottom">
										add_shopping_cart
									</span>
								</button>
								<button
									onClick={() => setBuyProductModalVisibility(true)}
									className="p-2 bg-gray-200 hover:bg-sky-400 hover:text-neutral-50  active:bg-sky-600 active:text-neutral-50"
								>
									Buy{" "}
									<span className="material-symbols-outlined wght-300 align-bottom">
										shopping_bag
									</span>
								</button>
							</div>
						</div>
					</div>
					<SignInModal setQuantity={setQuantity} />
					<AddToCartModal
						user={user}
						product={product}
					/>
					<BuyProductModal
						user={user}
						product={product}
						quantity={quantity}
						setQuantity={setQuantity}
					/>
				</main>
			)}
		</>
	);
}
