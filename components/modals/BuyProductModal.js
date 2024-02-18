"use client";

import { useEffect, useRef } from "react";
import { modalControlStore } from "@/lib/zustand/modalControlStore";
import { scrollLock } from "@/utils/useEffectFunc";

export default function BuyProductModal({
	user,
	product,
	quantity,
	setQuantity,
}) {
	const { buyProductModalVisibility, setBuyProductModalVisibility } =
		modalControlStore();
	const { setLoginModalVisibility } = modalControlStore();

	useEffect(() => {
		if (buyProductModalVisibility) {
			modalRef.current.showModal();
		} else {
			modalRef.current.close();
		}

		scrollLock(buyProductModalVisibility);
	}, [buyProductModalVisibility]);

	const buyProductHandle = async () => {
		if (user === null || undefined) {
			setLoginModalVisibility();
		} else {
			try {
				const res = await fetch(`/api/buy-product`, {
					method: "PUT",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({
						user_id: user?._id,
						product_id: product?._id,
						quantity: quantity,
					}),
					cache: "no-store",
				});

				if (res.ok) {
					const data = await res.json();
					window.alert(data.message);
					setBuyProductModalVisibility(false);
				} else {
					const data = await res.json();
					window.alert(data.message);
					setBuyProductModalVisibility(false);
				}
			} catch (error) {
				console.log(error.message);
			}
		}
	};

	const modalRef = useRef(null);
	return (
		<dialog
			ref={modalRef}
			className="p-8"
		>
			<p className="text-center font-semibold text-xl mb-4">Purchase Preview</p>
			<div>
				<span className="text-center font-semibold text-lg">
					{product?.name}
				</span>

				<div className="text-center my-4">
					<p className="mb-2 font-semibold">Quantity: </p>
					<div className="overflow-hidden w-fit mx-auto border rounded">
						<button
							onClick={() => {
								if (quantity === 1) {
									window.alert("Quantity can't be 0");
								} else {
									setQuantity((prevState) => prevState - 1);
								}
							}}
							className="font-bold bg-gray-200 p-2 hover:text-red-500 active:text-red-700"
						>
							-
						</button>
						<span className="p-2">{quantity}</span>
						<button
							onClick={() => {
								if (product?.quantity === quantity) {
									window.alert("Limit exceeded");
								} else {
									setQuantity((prevState) => prevState + 1);
								}
							}}
							className="font-bold bg-gray-200 p-2 hover:text-green-500 active:text-green-700"
						>
							+
						</button>
					</div>
				</div>

				<p className="mb-2 font-semi-bold text-center">
					<span className="font-semibold">Total: </span>$
					{product?.price * quantity}
				</p>
			</div>

			<div className="flex flex-row flex-wrap gap-4 justify-center mt-8">
				<button
					onClick={() => {
						setBuyProductModalVisibility(false);
						setQuantity(1);
					}}
					className="p-2 bg-gray-200 hover:bg-rose-500 hover:text-white active:bg-rose-700 active:text-white"
				>
					Cancel{" "}
					<span className="material-symbols-outlined wght-300 align-bottom">
						close
					</span>
				</button>
				<button
					onClick={buyProductHandle}
					className="p-2 bg-gray-200 hover:bg-gray-700 hover:text-white active:bg-gray-900 active:text-white"
				>
					Confirm
					<span className="material-symbols-outlined wght-300 align-bottom">
						done
					</span>
				</button>
			</div>
		</dialog>
	);
}
