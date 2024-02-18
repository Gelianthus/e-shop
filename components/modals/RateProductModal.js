"use client";

import { useEffect, useRef } from "react";
import { modalControlStore } from "@/lib/zustand/modalControlStore";
import { starRatingStore } from "@/lib/zustand/starRatingStore";
import { scrollLock } from "@/utils/useEffectFunc";

export default function RateProductModal({
	userId,
	product,
	setSelectedItem,
	setObserver,
}) {
	const { rateProductModalVisibility, setRateProductModalVisibility } =
		modalControlStore();
	const { starRating, setStarRating } = starRatingStore();

	const modalRef = useRef(null);

	useEffect(() => {
		if (rateProductModalVisibility) {
			modalRef.current.showModal();
		} else {
			modalRef.current.close();
		}

		scrollLock(rateProductModalVisibility);
	}, [rateProductModalVisibility]);

	const submitRatingHande = async () => {
		setRateProductModalVisibility();
		try {
			const res = await fetch(`/api/rate-product`, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					user_id: userId,
					product_id: starRating.product,
					star_rating: starRating.star,
				}),
				cache: "no-store",
			});

			if (res.ok) {
				setObserver((prevState) => prevState + 1);
				setStarRating({ star: 0, product: "" });
				setSelectedItem(null);
			} else {
				setStarRating({ star: 0, product: "" });
				setSelectedItem(null);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<dialog
			ref={modalRef}
			className="p-8"
		>
			<p className="text-center font-semibold text-lg">
				Submit <span className="font-bold">{starRating.star} Star/s</span>{" "}
				rating for <span className="font-bold">{product?.product.name}</span> ?
			</p>

			<div className="flex flex-row flex-wrap gap-4 justify-center mt-4">
				<button
					onClick={() => {
						setRateProductModalVisibility();
						setStarRating({ star: 0, product: "" });
						setSelectedItem(null);
					}}
					className="p-2 bg-gray-200 hover:bg-rose-500 hover:text-white active:bg-rose-700 active:text-white"
				>
					Cancel{" "}
					<span className="material-symbols-outlined wght-300 align-bottom">
						close
					</span>
				</button>
				<button
					onClick={submitRatingHande}
					className="p-2 bg-gray-200 hover:bg-gray-700 hover:text-white active:bg-gray-900 active:text-white"
				>
					Submit{" "}
					<span className="material-symbols-outlined wght-300 align-bottom">
						done
					</span>
				</button>
			</div>
		</dialog>
	);
}
