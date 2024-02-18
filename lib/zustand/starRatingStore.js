import { create } from "zustand";

export const starRatingStore = create((set) => ({
	starRating: {
		star: 0,
		product: "",
	},
	setStarRating: (newStarRating) => set({ starRating: newStarRating }),
}));
