"use client";

import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { useState, useEffect } from "react";
import { starRatingStore } from "@/lib/zustand/starRatingStore";
import { modalControlStore } from "@/lib/zustand/modalControlStore";

export default function TransactionHistoryItem({
	userId,
	transaction,
	setSelectedItem,
	observer,
}) {
	const { starRating, setStarRating } = starRatingStore();
	const { setRateProductModalVisibility } = modalControlStore();

	const [visualStar, setVisualStar] = useState(0);
	const [star, setStar] = useState(0);

	useEffect(() => {
		(starRating.product === transaction.product._id ||
			starRating.product === "") &&
			setStar(starRating.star);
	}, [starRating]);

	useEffect(() => {
		const getRating = async () => {
			try {
				const res = await fetch(
					`/api/rate-product?userid=${userId}&productid=${transaction.product._id}`,
					{ method: "GET", cache: "no-store" }
				);
				if (res.ok) {
					const data = await res.json();
					setStar(data.rating);
				}
			} catch (error) {
				console.log(error.message);
			}
		};

		getRating();
	}, []);

	useEffect(() => {
		const reFetchRating = async () => {
			try {
				const res = await fetch(
					`/api/rate-product?userid=${userId}&productid=${transaction.product._id}`,
					{ method: "GET", cache: "no-store" }
				);
				if (res.ok) {
					const data = await res.json();
					setStar(data.rating);
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		observer > 0 && reFetchRating();
	}, [observer]);

	return (
		<li
			className={`flex flex-row gap-4 items-center justify-between flex-wrap border-2 bg-white text-black`}
		>
			<div>
				<Link
					className="flex flex-row flex-wrap gap-4 items-center hover:underline p-4"
					href={`/product/${transaction.product._id}`}
				>
					{" "}
					<CldImage
						src={`e-shop/${
							transaction?.product.images[0].img_src
								.slice(8, transaction?.product.images[0].img_src.length)
								.split(".")[0]
						}`}
						alt={transaction?.product.images[0].img_alt}
						width={40}
						height={40}
						loading="lazy"
					/>{" "}
					<p className="font-semibold">
						{transaction.product.name} <span className="font-normal">x</span>{" "}
						{transaction.quantity}
					</p>
				</Link>
			</div>
			<div className="p-4 flex flex-row flex-wrap gap-2">
				<button
					onClick={() => {
						setSelectedItem(transaction);
						setStarRating({ star: 1, product: transaction.product._id });
						setRateProductModalVisibility();
					}}
					onMouseOver={() => setVisualStar(1)}
					onMouseLeave={() => setVisualStar(0)}
				>
					<span
						className={`material-symbols-outlined wght-300 ${
							star >= 1 || visualStar >= 1 ? "text-yellow-500 fill-1" : ""
						}  align-bottom`}
					>
						star
					</span>
				</button>
				<button
					onClick={() => {
						setSelectedItem(transaction);
						setStarRating({ star: 2, product: transaction.product._id });
						setRateProductModalVisibility();
					}}
					onMouseOver={() => setVisualStar(2)}
					onMouseLeave={() => setVisualStar(0)}
				>
					<span
						className={`material-symbols-outlined wght-300 ${
							star >= 2 || visualStar >= 2 ? "text-yellow-500 fill-1" : ""
						}  align-bottom`}
					>
						star
					</span>
				</button>
				<button
					onClick={() => {
						setSelectedItem(transaction);
						setStarRating({ star: 3, product: transaction.product._id });
						setRateProductModalVisibility();
					}}
					onMouseOver={() => setVisualStar(3)}
					onMouseLeave={() => setVisualStar(0)}
				>
					<span
						className={`material-symbols-outlined wght-300 ${
							star >= 3 || visualStar >= 3 ? "text-yellow-500 fill-1" : ""
						}  align-bottom`}
					>
						star
					</span>
				</button>
				<button
					onClick={() => {
						setSelectedItem(transaction);
						setStarRating({ star: 4, product: transaction.product._id });
						setRateProductModalVisibility();
					}}
					onMouseOver={() => setVisualStar(4)}
					onMouseLeave={() => setVisualStar(0)}
				>
					<span
						className={`material-symbols-outlined wght-300 ${
							star >= 4 || visualStar >= 4 ? "text-yellow-500 fill-1" : ""
						}  align-bottom`}
					>
						star
					</span>
				</button>
				<button
					onClick={() => {
						setSelectedItem(transaction);
						setStarRating({ star: 5, product: transaction.product._id });
						setRateProductModalVisibility();
					}}
					onMouseOver={() => setVisualStar(5)}
					onMouseLeave={() => setVisualStar(0)}
				>
					<span
						className={`material-symbols-outlined wght-300 ${
							star >= 5 || visualStar >= 5 ? "text-yellow-500 fill-1" : ""
						}  align-bottom`}
					>
						star
					</span>
				</button>
			</div>
		</li>
	);
}
