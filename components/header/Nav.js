"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { userStore } from "@/lib/zustand/userStore";

export default function Nav() {
	const { user, setUser, getUser } = userStore();
	const { data: session } = useSession();

	useEffect(() => {
		console.log("user:", user);
		session && getUser(session?.user.email);
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
