"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { userStore } from "@/lib/zustand/userStore";

export default function Nav() {
	const { user, setUser } = userStore();
	const { data: session } = useSession();

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
		<nav className="hidden sm:block">
			{!session && <button onClick={() => signIn("google")}>Sign In</button>}
			{session && (
				<div className="space-x-4 ">
					<Link href="">Cart</Link>
					<button
						onClick={() => {
							signOut();
							setUser(null);
						}}
					>
						Sign out
					</button>
				</div>
			)}
		</nav>
	);
}
