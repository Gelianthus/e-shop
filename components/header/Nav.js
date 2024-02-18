"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { userStore } from "@/lib/zustand/userStore";

export default function Nav() {
	const { user, setUser, getUser } = userStore();
	const { data: session } = useSession();

	useEffect(() => {
		session?.user && getUser(session?.user.email);
	}, [session]);

	return (
		<nav className="hidden sm:block">
			{!session && (
				<button
					onClick={() => signIn("google")}
					className=" hover:text-blue-600 active:text-blue-800"
				>
					Sign In{" "}
					<span className="material-symbols-outlined wght-300 align-bottom">
						login
					</span>
				</button>
			)}
			{session && (
				<div className="space-x-4 ">
					<Link
						className={`${
							user === null ? "disabled" : ""
						} hover:text-amber-600 active:text-amber-800`}
						aria-disabled={user === null}
						tabIndex={user === null ? -1 : undefined}
						href={`/cart`}
					>
						Cart{" "}
						<span className="material-symbols-outlined wght-300 align-bottom">
							shopping_cart
						</span>
					</Link>
					<button
						onClick={() => {
							signOut({ callbackUrl: "/" });
							setUser(null);
						}}
						className="hover:text-rose-600 active:text-rose-800"
					>
						Sign out{" "}
						<span className="material-symbols-outlined wght-300 align-bottom">
							logout
						</span>
					</button>
				</div>
			)}
		</nav>
	);
}
