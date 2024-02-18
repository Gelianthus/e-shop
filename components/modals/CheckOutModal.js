"use client";

import { useEffect, useRef } from "react";
import { modalControlStore } from "@/lib/zustand/modalControlStore";
import { toBeDeliveredStore } from "@/lib/zustand/toBeDeliveredStore";
import { scrollLock } from "@/utils/useEffectFunc";

export default function CheckOutModal({
	userId,
	cartItems,
	setCartItems,
	checkOutItems,
	setCheckOutItems,
}) {
	const { checkOutModalVisibility, setCheckOutModalVisibility } =
		modalControlStore();
	const { setToBeDelivered } = toBeDeliveredStore();

	const modalRef = useRef(null);

	const items = cartItems.filter((item) => {
		return checkOutItems.includes(item.product._id);
	});

	const checkOutHandle = async () => {
		setCheckOutModalVisibility();
		try {
			const res = await fetch(`/api/to-be-delivered`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					user_id: userId,
					product_ids: checkOutItems,
				}),
				cache: "no-store",
			});

			if (res.ok) {
				const data = await res.json();
				setToBeDelivered(data.toBeDelivered.items);
				setCartItems(data.cart.items);
				setCheckOutItems([]);
			} else {
				const data = await res.json();
				window.alert(data.message);
				setCheckOutItems([]);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		if (checkOutModalVisibility) {
			modalRef.current.showModal();
		} else {
			modalRef.current.close();
		}

		scrollLock(checkOutModalVisibility);
	}, [checkOutModalVisibility]);

	return (
		<dialog
			ref={modalRef}
			className="p-8"
		>
			<p className="font-bold text-center text-lg">Transaction Preview</p>
			<p className="font-bold text-center">
				Please review your purchase before confirming.
			</p>
			<ul className="my-8 space-y-4">
				{items.map((item) => {
					return (
						<li
							key={item.product._id}
							className="flex flex-row gap-4 flex-wrap justify-between font-semibold"
						>
							<span>{item.product.name}</span>{" "}
							<span>
								${item.product.price} x {item.quantity} = $
								{item.product.price * item.quantity}
							</span>
						</li>
					);
				})}
			</ul>
			<hr />
			<span className="font-semibold my-4 block text-end">
				Total: $
				{items.reduce((accumulator, currentItem) => {
					const { product, quantity } = currentItem;
					const price = product.price * quantity;
					return accumulator + price;
				}, 0)}
			</span>
			<div className="flex flex-row gap-4 justify-center mt-8">
				<button
					className="p-2 bg-gray-200 hover:bg-rose-500 hover:text-white active:bg-rose-700 active:text-white"
					onClick={() => setCheckOutModalVisibility()}
				>
					Cancel{" "}
					<span className="material-symbols-outlined wght-300 align-bottom">
						close
					</span>
				</button>
				<button
					className="p-2 bg-gray-200 hover:bg-blue-500 hover:text-white active:bg-blue-700 active:text-white"
					onClick={() => checkOutHandle()}
				>
					Confirm{" "}
					<span className="material-symbols-outlined wght-300 align-bottom">
						done
					</span>
				</button>
			</div>
		</dialog>
	);
}
