"use client";

import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import { toBeDeliveredStore } from "@/lib/zustand/toBeDeliveredStore";
import { modalControlStore } from "@/lib/zustand/modalControlStore";
import CancelOrderModal from "../modals/CancelOrderModal";
import Link from "next/link";
import ReceivedOrderModal from "../modals/ReceivedOrderModal";

export default function ToBeDelivered({ userId }) {
	const { toBeDelivered, getToBeDelivered } = toBeDeliveredStore();
	const { setCancelOrderModalVisibility, setReceivedOrderModalVisibility } =
		modalControlStore();

	const [selectedItem, setSelectedItem] = useState(null);

	useEffect(() => {
		getToBeDelivered(userId);
	}, []);

	return (
		<>
			<p className="font-bold text-2xl">To Be Delivered</p>
			<ul className="my-8 space-y-2">
				{!toBeDelivered.length ? (
					<li>
						<p className="my-4 text-xl text-center border-2 p-2">
							No items to be delivered.
						</p>
					</li>
				) : (
					toBeDelivered.map((item) => {
						return (
							<li
								className={`flex flex-row gap-4 items-center justify-between flex-wrap border-2 bg-white text-black
								`}
								key={item?.product._id}
							>
								<div>
									<Link
										className="flex flex-row flex-wrap gap-4 items-center hover:underline p-4"
										href={`/product?id=${item?.product._id}`}
									>
										<CldImage
											src={`e-shop/${
												item?.product.images[0].img_src
													.slice(8, item?.product.images[0].img_src.length)
													.split(".")[0]
											}`}
											alt={item?.product.images[0].img_alt}
											width={40}
											height={40}
											loading="lazy"
										/>
										<p className="font-semibold">
											{item.product.name} <span className="font-normal">x</span>{" "}
											{item.quantity}
										</p>
									</Link>
								</div>
								<div className="flex flex-row flex-wrap gap-4 items-center p-4">
									<button
										onClick={() => {
											setCancelOrderModalVisibility();
											setSelectedItem(item);
											console.log(item);
										}}
										className="hover:text-red-600 active:text-red-800"
									>
										Cancel Order{" "}
										<span className="material-symbols-outlined wght-300 align-bottom">
											cancel
										</span>
									</button>
									<button
										onClick={() => {
											setReceivedOrderModalVisibility();
											setSelectedItem(item);
										}}
										className="hover:text-emerald-600 active:text-emerald-800"
									>
										Received{" "}
										<span className="material-symbols-outlined wght-300 align-bottom">
											orders
										</span>
									</button>
								</div>
							</li>
						);
					})
				)}
			</ul>
			<CancelOrderModal
				userId={userId}
				item={selectedItem}
				setSelectedItem={setSelectedItem}
			/>
			<ReceivedOrderModal
				userId={userId}
				item={selectedItem}
				setSelectedItem={setSelectedItem}
			/>
		</>
	);
}
