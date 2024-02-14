"use client";

import { useEffect, useRef, useState } from "react";
import { modalControlStore } from "@/lib/zustand/modalControlStore";
import { toBeDeliveredStore } from "@/lib/zustand/toBeDeliveredStore";
import { userStore } from "@/lib/zustand/userStore";
import { scrollLock } from "@/utils/useEffectFunc";

export default function CheckOutModal({ checkOutItems, setCheckOutItems }) {
	const { user } = userStore();
	const { checkOutModalVisibility, setCheckOutModalVisibility } =
		modalControlStore();
	const { setToBeDelivered } = toBeDeliveredStore();

	const modalRef = useRef(null);

	const [items, setItems] = useState([]);

	useEffect(() => {
		const getCart = async () => {
			try {
				const res = await fetch(`/api/cart?userid=${user?._id}`, {
					cache: "no-store",
				});
				if (res.ok) {
					const data = await res.json();
					setItems(
						data.cart.items.filter((item) =>
							checkOutItems.includes(item.product)
						)
					);
				}
			} catch (error) {
				console.log(error.message);
			}
		};

		getCart();
	}, []);

	const checkOutHandle = async () => {
		setCheckOutModalVisibility();
		try {
			const res = await fetch(`/api/to-be-delivered`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					user_id: user?._id,
					product_ids: checkOutItems,
				}),
				cache: "no-store",
			});

			if (res.ok) {
				const data = await res.json();
				setToBeDelivered(data.toBeDelivered.items);
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
			<p>Transaction Preview</p>
			<p>Please review your purchase before confirming.</p>
			<ul>
				{items.map((item) => {
					return (
						<li key={item.product._id}>
							<span>{item.product.name}</span>
							<span>
								{item.product.price} x {item.quantity} ={" "}
								{item.product.price * item.quantity}
							</span>
						</li>
					);
				})}
			</ul>
			<span>
				Total:{" "}
				{items.reduce((accumulator, currentItem) => {
					const { product, quantity } = currentItem;
					const price = product.price * quantity;
					return accumulator + price;
				}, 0)}
			</span>
			<div className="flex flex-row gap-4 justify-center mt-8">
				<button onClick={() => setCheckOutModalVisibility()}>Cancel</button>
				<button onClick={() => checkOutHandle()}>Confirm</button>
			</div>
		</dialog>
	);
}
