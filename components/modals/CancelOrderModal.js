"use client";

import { useEffect, useRef } from "react";
import { modalControlStore } from "@/lib/zustand/modalControlStore";
import { toBeDeliveredStore } from "@/lib/zustand/toBeDeliveredStore";
import { scrollLock } from "@/utils/useEffectFunc";

export default function CancelOrderModal({ userId, item, setSelectedItem }) {
	const { cancelOrderModalVisibility, setCancelOrderModalVisibility } =
		modalControlStore();
	const { setToBeDelivered } = toBeDeliveredStore();

	const modalRef = useRef(null);

	useEffect(() => {
		if (cancelOrderModalVisibility) {
			modalRef.current.showModal();
		} else {
			modalRef.current.close();
		}

		scrollLock(cancelOrderModalVisibility);
	}, [cancelOrderModalVisibility]);

	const cancelOrderHandle = async () => {
		setCancelOrderModalVisibility();
		try {
			const res = await fetch(`/api/to-be-delivered/cancel`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					user_id: userId,
					product_id: item.product._id,
				}),
				cache: "no-cache",
			});
			if (res.ok) {
				const data = await res.json();
				setToBeDelivered(data.toBeDelivered.items);
				setSelectedItem(null);
			} else {
				const data = await res.json();
				setSelectedItem(null);
				window.alert(data.message);
			}
		} catch (error) {
			console.log(error.message);
			setSelectedItem(null);
		}
	};

	return (
		<dialog
			ref={modalRef}
			className="p-8"
		>
			<p className="text-center font-semibold text-lg">
				Cancel order of {item?.product.name}?
			</p>
			<div className="flex flex-row flex-wrap gap-4 justify-center mt-4">
				<button
					className="p-2 bg-gray-200 hover:bg-rose-500 hover:text-white active:bg-rose-700 active:text-white"
					onClick={() => {
						setCancelOrderModalVisibility();
						setSelectedItem(null);
					}}
				>
					Cancel{" "}
					<span className="material-symbols-outlined wght-300 align-bottom">
						close
					</span>
				</button>
				<button
					className="p-2 bg-gray-200 hover:bg-gray-700 hover:text-white active:bg-gray-900 active:text-white"
					onClick={cancelOrderHandle}
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
