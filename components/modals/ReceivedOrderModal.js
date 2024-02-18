"use client";

import { useEffect, useRef } from "react";
import { modalControlStore } from "@/lib/zustand/modalControlStore";
import { toBeDeliveredStore } from "@/lib/zustand/toBeDeliveredStore";
import { transactionHistoryStore } from "@/lib/zustand/transactionHistoryStore";
import { scrollLock } from "@/utils/useEffectFunc";

export default function ReceivedOrderModal({ userId, item, setSelectedItem }) {
	const { receivedOrderModalVisibility, setReceivedOrderModalVisibility } =
		modalControlStore();
	const { setToBeDelivered } = toBeDeliveredStore();
	const { setTransactionHistory } = transactionHistoryStore();

	useEffect(() => {
		if (receivedOrderModalVisibility) {
			modalRef.current.showModal();
		} else {
			modalRef.current.close();
		}

		scrollLock(receivedOrderModalVisibility);
	}, [receivedOrderModalVisibility]);

	const receivedOrderHandle = async () => {
		setReceivedOrderModalVisibility();
		try {
			const res = await fetch(`/api/transaction-history`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					user_id: userId,
					product_id: item?.product._id,
				}),
				cache: "no-store",
			});

			if (res.ok) {
				const data = await res.json();
				setToBeDelivered(data.toBeDelivered.items);
				setTransactionHistory(data.transactionHistory.transactions);
				setSelectedItem(null);
			}
		} catch (error) {
			console.log(error.message);
			setSelectedItem(null);
		}
	};

	const modalRef = useRef(null);
	return (
		<dialog
			className="p-8"
			ref={modalRef}
		>
			<p className="text-center font-semibold text-lg">
				Product Received Confirmation
			</p>
			<p className="text-center font-semibold ">
				Please confirm if you've successfully received your order.
			</p>
			<p className="text-center font-semibold ">{item?.product.name}</p>
			<div className="flex flex-row flex-wrap gap-4 justify-center mt-4">
				<button
					className="p-2 bg-gray-200 hover:bg-rose-500 hover:text-white active:bg-rose-700 active:text-white"
					onClick={() => {
						setReceivedOrderModalVisibility();
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
					onClick={receivedOrderHandle}
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
