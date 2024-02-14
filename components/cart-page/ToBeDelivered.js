"use client";

import { useEffect } from "react";
import { userStore } from "@/lib/zustand/userStore";
import { toBeDeliveredStore } from "@/lib/zustand/toBeDeliveredStore";
import Link from "next/link";

export default function ToBeDelivered() {
	const { user } = userStore();
	const { toBeDelivered, getToBeDelivered, setToBeDelivered } =
		toBeDeliveredStore();

	useEffect(() => {
		getToBeDelivered(user?._id);
	}, []);

	return (
		<>
			<p className="font-bold text-2xl">To Be Delivered</p>
			<ul>
				{!toBeDelivered.length ? (
					<li>
						<p className="my-4 text-xl text-center border-2 p-2">
							No items to be delivered.
						</p>
					</li>
				) : (
					toBeDelivered.map((item) => {
						return <li key={item?._id}>{item?.name}</li>;
					})
				)}
			</ul>
		</>
	);
}
