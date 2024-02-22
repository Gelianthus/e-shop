"use client";

import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { useState, useEffect } from "react";
import { modalControlStore } from "@/lib/zustand/modalControlStore";
import DelFromCartModal from "../modals/DelFromCartModal";

export default function CartItem({
	item,
	userId,
	setCheckOutItems,
	setCartItems,
}) {
	const [checked, setChecked] = useState(true);
	const { setDelFromCartModalVisibility } = modalControlStore();

	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [timeoutId, setTimeoutId] = useState(null);

	const timeoutHandle = () => {
		const id = setTimeout(() => {
			setButtonDisabled(false);
		}, 2200);
		setTimeoutId(id);
	};

	const incrementQty = async () => {
		setButtonDisabled(true);
		try {
			const res = await fetch(`/api/add-to-cart`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({ user_id: userId, product_id: item.product._id }),
				cache: "no-store",
			});
			if (res.ok) {
				const data = await res.json();
				setCartItems(data.cart.items);
			} else {
				const data = await res.json();
				console.log("error:", data.message);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const decrementQty = async () => {
		setButtonDisabled(true);
		try {
			const res = await fetch(`/api/cart/qty`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({ user_id: userId, product_id: item.product._id }),
				cache: "no-store",
			});
			if (res.ok) {
				const data = await res.json();
				setCartItems(data.cart.items);
			} else {
				const data = await res.json();
				console.log("error:", data.message);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		return () => {
			clearTimeout(timeoutId);
		};
	}, [timeoutId]);

	const checkItemToggle = () => {
		setChecked((prevState) => !prevState);
		if (checked) {
			setCheckOutItems((prevArr) => {
				return prevArr.filter((index) => index !== item.product._id);
			});
		} else {
			setCheckOutItems((prevArr) => {
				return [...prevArr, item.product._id];
			});
		}
	};

	const removeFromCart = async () => {
		setDelFromCartModalVisibility();
		try {
			const res = await fetch(`/api/cart`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({ user_id: userId, product_id: item.product._id }),
				cache: "no-store",
			});

			if (res.ok) {
				const data = await res.json();
				setCartItems(data.cart.items);
				setCheckOutItems((prevArr) => {
					return prevArr.filter((index) => index !== item.product._id);
				});
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<li
			className={`flex flex-row gap-4 items-center justify-between flex-wrap border-2 ${
				checked ? "bg-gray-700 text-white" : "bg-white text-black"
			}`}
		>
			<p
				className={`${
					buttonDisabled ? "block" : "hidden"
				} absolute top-8 left-0 right-0 text-gray-500  font-semibold text-center`}
			>
				Please wait a moment before performing an action again.
			</p>
			<div>
				<Link
					href={`/product/${item?.product._id}`}
					className="flex flex-row flex-wrap gap-4 items-center hover:underline p-4"
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
					<span className="font-semibold">{item?.product.name}</span>
				</Link>
				<div className="flex flex-row gap-4 items-center px-4 pb-4">
					<span className="font-semibold rounded bg-neutral-100 text-neutral-800 p-2">
						$ {item?.product.price}
					</span>
					<div className="rounded bg-neutral-100 text-neutral-800 space-x-4 overflow-hidden w-fit">
						<button
							disabled={buttonDisabled}
							className="font-bold hover:bg-neutral-300 p-2 active:bg-neutral-300 active:text-rose-500"
							onClick={() => {
								if (item.quantity > 1) {
									decrementQty();
									timeoutHandle();
								} else {
									setDelFromCartModalVisibility();
								}
							}}
						>
							-
						</button>
						<span className="py-2">{item.quantity}</span>
						<button
							disabled={buttonDisabled}
							className="font-bold hover:bg-neutral-300 p-2 active:bg-neutral-300 active:text-emerald-500"
							onClick={() => {
								incrementQty();
								timeoutHandle();
							}}
						>
							+
						</button>
					</div>
				</div>
			</div>

			<div className="flex flex-row flex-wrap gap-4 items-center p-4">
				<button
					className={`${
						checked
							? "hover:text-rose-600 active:text-rose-800"
							: "hover:text-emerald-600 active:text-emerald-800"
					} `}
					onClick={checkItemToggle}
				>
					{checked ? "Uninclude " : "Include "}
					<span className="material-symbols-outlined wght-300 align-bottom">
						{checked ? "close" : "done"}
					</span>
				</button>
				<button
					onClick={() => {
						setDelFromCartModalVisibility();
					}}
					className="hover:text-red-600 active:text-red-800"
				>
					Delete{" "}
					<span className="material-symbols-outlined wght-300 align-bottom">
						remove_shopping_cart
					</span>
				</button>
			</div>
			<DelFromCartModal removeFromCart={removeFromCart} />
		</li>
	);
}
