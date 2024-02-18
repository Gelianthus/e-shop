"use client";

import { useEffect, useRef } from "react";
import { modalControlStore } from "@/lib/zustand/modalControlStore";
import { scrollLock } from "@/utils/useEffectFunc";

export default function AddToCartModal({ user, product }) {
	const { setLoginModalVisibility } = modalControlStore();
	const { addToCartModalVisibility, setAddToCartModalVisibility } =
		modalControlStore();

	const modalRef = useRef(null);

	const addToCartHandle = async () => {
		if (user === null || undefined) {
			setLoginModalVisibility();
		} else {
			try {
				const res = await fetch(`/api/add-to-cart`, {
					method: "PUT",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({
						user_id: user?._id,
						product_id: product?._id,
					}),
					cache: "no-store",
				});
				if (res.ok) {
					const data = await res.json();
					window.alert(data.message);
					setAddToCartModalVisibility(false);
				} else {
					const data = await res.json();
					console.log("error:", data.message);
					setAddToCartModalVisibility(false);
				}
			} catch (error) {
				console.log(error.message);
			}
		}
	};

	useEffect(() => {
		if (addToCartModalVisibility) {
			modalRef.current.showModal();
		} else {
			modalRef.current.close();
		}

		scrollLock(addToCartModalVisibility);
	}, [addToCartModalVisibility]);

	return (
		<dialog
			className="p-8"
			ref={modalRef}
		>
			<p className="text-center font-semibold text-lg">
				Add {product?.name} to cart?
			</p>
			<div className="flex flex-row flex-wrap gap-4 justify-center mt-4">
				<button
					className="p-2 bg-gray-200 hover:bg-rose-500 hover:text-white active:bg-rose-700 active:text-white"
					onClick={() => setAddToCartModalVisibility(false)}
				>
					Cancel{" "}
					<span className="material-symbols-outlined wght-300 align-bottom">
						close
					</span>
				</button>
				<button
					className="p-2 bg-gray-200 hover:bg-green-500 hover:text-white active:bg-green-700 active:text-white"
					onClick={addToCartHandle}
				>
					Add{" "}
					<span className="material-symbols-outlined wght-300 align-bottom">
						add
					</span>
				</button>
			</div>
		</dialog>
	);
}
