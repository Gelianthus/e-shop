"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { userStore } from "@/lib/zustand/userStore";

export default function MobileNav() {
	const { data: session } = useSession();
	const { user, setUser, getUser } = userStore();
	const [menuOpen, setMenuOpen] = useState(false);
	const navRef = useRef(null);

	useEffect(() => {
		session?.user && getUser(session?.user.email);
	}, [session]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (!navRef.current.contains(event.target)) {
				setMenuOpen(false);
			}
		};

		if (menuOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [menuOpen]);

	return (
		<nav
			ref={navRef}
			className="block sm:hidden relative"
		>
			<button onClick={() => setMenuOpen((prevState) => !prevState)}>
				<span
					className={`material-symbols-outlined align-middle ${
						menuOpen ? "text-emerald-500" : "text-neutral-800"
					}`}
				>
					menu
				</span>
			</button>
			<div
				className={`${
					menuOpen ? "block" : "hidden"
				} absolute right-0 top-12 w-32 text-end p-2 bg-gray-200 rounded space-y-2`}
			>
				{!session && (
					<button onClick={() => signIn("google")}>
						Sign in{" "}
						<span className="material-symbols-outlined wght-300 align-bottom hover:text-sky-600 active:text-sky-800">
							login
						</span>
					</button>
				)}
				{session && (
					<>
						<Link
							className={`${
								user === null ? "disabled" : ""
							} hover:text-amber-600 active:text-amber-800`}
							aria-disabled={user === null}
							tabIndex={user === null ? -1 : undefined}
							href={`/cart`}
							onClick={() => setMenuOpen(false)}
						>
							Cart{" "}
							<span className="material-symbols-outlined wght-300 align-bottom">
								shopping_cart
							</span>
						</Link>
						<button
							className="hover:text-rose-600 active:text-rose-800"
							onClick={() => {
								setMenuOpen(false);
								signOut({ callbackUrl: "/" });
								setUser(null);
							}}
						>
							Sign out{" "}
							<span className="material-symbols-outlined wght-300 align-bottom">
								logout
							</span>
						</button>
					</>
				)}
			</div>
		</nav>
	);
}
