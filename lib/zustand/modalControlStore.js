import { create } from "zustand";

export const modalControlStore = create((set) => ({
	loginModalVisibility: false,
	setLoginModalVisibility: () =>
		set((state) => ({ loginModalVisibility: !state.loginModalVisibility })),

	delFromCartModalVisibility: false,
	setDelFromCartModalVisibility: () =>
		set((state) => ({
			delFromCartModalVisibility: !state.delFromCartModalVisibility,
		})),

	checkOutModalVisibility: false,
	setCheckOutModalVisibility: () =>
		set((state) => ({
			checkOutModalVisibility: !state.checkOutModalVisibility,
		})),

	cancelOrderModalVisibility: false,
	setCancelOrderModalVisibility: () =>
		set((state) => ({
			cancelOrderModalVisibility: !state.cancelOrderModalVisibility,
		})),

	receivedOrderModalVisibility: false,
	setReceivedOrderModalVisibility: () =>
		set((state) => ({
			receivedOrderModalVisibility: !state.receivedOrderModalVisibility,
		})),

	rateProductModalVisibility: false,
	setRateProductModalVisibility: () =>
		set((state) => ({
			rateProductModalVisibility: !state.rateProductModalVisibility,
		})),

	addToCartModalVisibility: false,
	setAddToCartModalVisibility: (bool) =>
		set({ addToCartModalVisibility: bool }),

	buyProductModalVisibility: false,
	setBuyProductModalVisibility: (bool) =>
		set({ buyProductModalVisibility: bool }),
}));
