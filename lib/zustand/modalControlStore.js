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
		set((state) => ({ checkOutModal: !state.checkOutModal })),
}));
