import { create } from "zustand";

export const toBeDeliveredStore = create((set) => ({
	toBeDelivered: [],
	setToBeDelivered: (newToBeDelivered) =>
		set({ toBeDelivered: newToBeDelivered }),
	getToBeDelivered: async (userId) => {
		try {
			const res = await fetch(`/api/to-be-delivered?userid=${userId}`, {
				cache: "no-store",
			});
			if (res.ok) {
				const data = await res.json();
				set(() => ({ toBeDelivered: data.toBeDelivered.items }));
			}
		} catch (error) {
			console.log(error.message);
		}
	},
}));
