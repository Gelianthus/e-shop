import { create } from "zustand";

export const productTabStore = create((set) => ({
	tab: "latest",
	setTab: (newTab) => set({ tab: newTab }),
}));
