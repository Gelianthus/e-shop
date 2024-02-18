"use client";

import { useEffect, useRef } from "react";
import { modalControlStore } from "@/lib/zustand/modalControlStore";
import { userStore } from "@/lib/zustand/userStore";
import { scrollLock } from "@/utils/useEffectFunc";
import { signIn, useSession } from "next-auth/react";

export default function SignInModal({ setQuantity }) {
	const { data: session } = useSession();
	const { loginModalVisibility, setLoginModalVisibility } = modalControlStore();
	const { setAddToCartModalVisibility } = modalControlStore();
	const { setBuyProductModalVisibility } = modalControlStore();
	const { getUser } = userStore();
	const modalRef = useRef(null);

	useEffect(() => {
		if (loginModalVisibility) {
			modalRef.current.showModal();
		} else {
			modalRef.current.close();
		}

		scrollLock(loginModalVisibility);
	}, [loginModalVisibility]);

	useEffect(() => {
		session && getUser(session?.user.email);
	}, [session]);

	return (
		<dialog
			ref={modalRef}
			className="p-8 text-neutral-800 "
		>
			<p className="text-center text-xl">
				Must be signed in to add items into cart
			</p>
			<div className="flex flex-row gap-4 flex-wrap justify-end mt-4">
				<button
					className="p-2 bg-neutral-200 hover:bg-rose-500 active:bg-rose-600 hover:text-neutral-50 active:text-neutral-50"
					onClick={() => {
						setAddToCartModalVisibility(false);
						setBuyProductModalVisibility(false);
						setQuantity(1);
						setLoginModalVisibility();
					}}
				>
					Close{" "}
					<span className="material-symbols-outlined wght-300 align-bottom">
						close
					</span>
				</button>
				<button
					className="p-2 bg-neutral-200 hover:bg-blue-500 active:bg-blue-600 hover:text-neutral-50 active:text-neutral-50"
					onClick={() => signIn("google")}
				>
					Sign in{" "}
					<span className="material-symbols-outlined wght-300 align-bottom">
						login
					</span>
				</button>
			</div>
		</dialog>
	);
}
