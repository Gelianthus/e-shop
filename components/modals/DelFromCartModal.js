"use client";

import { useEffect, useRef } from "react";
import { modalControlStore } from "@/lib/zustand/modalControlStore";
import { scrollLock } from "@/utils/useEffectFunc";

export default function DelFromCartModal({ removeFromCart }) {
	const { delFromCartModalVisibility, setDelFromCartModalVisibility } =
		modalControlStore();
	const modalRef = useRef(null);
	useEffect(() => {
		if (delFromCartModalVisibility) {
			modalRef.current.showModal();
		} else {
			modalRef.current.close();
		}

		scrollLock(delFromCartModalVisibility);
	}, [delFromCartModalVisibility]);

	return (
		<dialog
			ref={modalRef}
			className="p-8"
		>
			<p className="text-center font-semibold text-lg">Remove from cart?</p>
			<div className="space-x-4 mt-4">
				<button
					className="p-2 bg-gray-200 hover:bg-rose-500 hover:text-white active:bg-rose-700 active:text-white"
					onClick={() => {
						setDelFromCartModalVisibility();
					}}
				>
					Cancel{" "}
					<span className="material-symbols-outlined wght-300 align-bottom">
						close
					</span>
				</button>
				<button
					className="p-2 bg-gray-200 hover:bg-gray-700 hover:text-white active:bg-gray-900 active:text-white"
					onClick={removeFromCart}
				>
					Confirm
					<span className="material-symbols-outlined wght-300 align-bottom">
						done
					</span>
				</button>
			</div>
		</dialog>
	);
}
