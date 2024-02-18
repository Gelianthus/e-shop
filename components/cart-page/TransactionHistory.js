"use client";

import { useEffect, useState } from "react";
import { transactionHistoryStore } from "@/lib/zustand/transactionHistoryStore";
import TransactionHistoryItem from "./TransactionHistoryItem";
import RateProductModal from "../modals/RateProductModal";

export default function TransactionHistory({ userId }) {
	const { transactionHistory, getTransactionHistory } =
		transactionHistoryStore();

	const [selectedItem, setSelectedItem] = useState(null);
	const [observer, setObserver] = useState(0);

	useEffect(() => {
		getTransactionHistory(userId);
	}, []);

	return (
		<>
			<p className="font-bold text-2xl">Transaction History</p>
			<ul className="my-8 space-y-2">
				{!transactionHistory.length ? (
					<li>
						<p className="my-4 text-xl text-center border-2 p-2">
							No purchases have been made yet.
						</p>
					</li>
				) : (
					transactionHistory.map((transaction) => {
						return (
							<TransactionHistoryItem
								key={transaction.product._id}
								userId={userId}
								transaction={transaction}
								setSelectedItem={setSelectedItem}
								observer={observer}
							/>
						);
					})
				)}
			</ul>
			<RateProductModal
				userId={userId}
				product={selectedItem}
				setSelectedItem={setSelectedItem}
				setObserver={setObserver}
			/>
		</>
	);
}
