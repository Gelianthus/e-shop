import { create } from "zustand";

export const userStore = create((set) => ({
	user: null,
	setUser: (newUser) => set({ user: newUser }),
	getUser: async (useremail) => {
		try {
			const res = await fetch(`/api/users/user?useremail=${useremail}`, {
				cache: "no-store",
			});
			if (res.ok) {
				const data = await res.json();
				set(() => ({ user: data.user }));
			}
		} catch (error) {
			console.log(error.message);
		}
	},
}));
