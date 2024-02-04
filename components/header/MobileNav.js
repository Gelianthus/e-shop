"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { userStore } from "@/lib/zustand/userStore";

export default function MobileNav() {
	const { data: session } = useSession();
	const { user, setUser } = userStore();
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		console.log("currentUser:", user);
		const getUser = async () => {
			try {
				const res = await fetch(
					`/api/users/user?useremail=${session?.user.email}`
				);
				if (res.ok) {
					const data = await res.json();
					setUser(data.user);
				}
			} catch (error) {
				console.log(error.message);
			}
		};

		session && getUser();
	}, [session]);

	return (
		<nav className="block sm:hidden relative">
			<button onClick={() => setMenuOpen((prevState) => !prevState)}>
				<span className="material-symbols-outlined align-middle">menu</span>
			</button>
			<div
				className={`${
					menuOpen ? "block" : "hidden"
				} absolute right-0 top-12 w-24 text-end p-2 bg-neutral-200 space-y-2`}
			>
				{!session && <button onClick={() => signIn("google")}>Sign in</button>}
				{session && (
					<>
						<Link href={""}>Cart</Link>
						<button
							onClick={() => {
								signOut();
								setUser(null);
							}}
						>
							Sign out
						</button>
					</>
				)}
			</div>
		</nav>
	);
}
