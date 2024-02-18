import { create } from "zustand";

export const transactionHistoryStore = create((set) => ({
	transactionHistory: [],
	setTransactionHistory: (newTransactionHistory) =>
		set({ transactionHistory: newTransactionHistory }),
	getTransactionHistory: async (userId) => {
		try {
			const res = await fetch(`/api/transaction-history?userid=${userId}`, {
				cache: "no-store",
			});
			if (res.ok) {
				const data = await res.json();
				set(() => ({
					transactionHistory: data.transactionHistory.transactions,
				}));
			}
		} catch (error) {
			console.log(error.message);
		}
	},
}));
