"use client";

import { userStore } from "@/lib/zustand/userStore";
import { useState, useEffect } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { productTabStore } from "@/lib/zustand/productTabStore";
import { toBeDeliveredStore } from "@/lib/zustand/toBeDeliveredStore";
import { modalControlStore } from "@/lib/zustand/modalControlStore";
import CartItem from "@/components/cart-page/CartItem";
import ToBeDelivered from "@/components/cart-page/ToBeDelivered";
import CheckOutModal from "@/components/modals/CheckOutModal";

export default function CartPage() {
	const { user } = userStore();
	const { setTab } = productTabStore();
	const { setToBeDelivered } = toBeDeliveredStore();
	const { setCheckOutModalVisibility } = modalControlStore();

	const [cartItems, setCartItems] = useState([]);
	const [checkOutItems, setCheckOutItems] = useState([]);

	useEffect(() => {
		const getCart = async () => {
			try {
				const res = await fetch(`/api/cart?userid=${user?._id}`, {
					method: "GET",
					cache: "no-store",
				});
				if (res.ok) {
					const data = await res.json();
					setCartItems(data.cart.items);
					setCheckOutItems(
						data.cart.items.map((item) => {
							return item.product._id;
						})
					);
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		user ? getCart() : redirect("/");
	}, [setToBeDelivered]);

	return (
		<main className="p-4 xs:p-8 sm:py-8 sm:px-16">
			{user === null && (
				<p className="my-4 text-xl text-center">
					User not found. You'll be redirected to the Homepage.
				</p>
			)}
			{user && (
				<div>
					<h1 className="font-bold text-4xl mb-8">
						Hi {user?.name}, ready to check out?
					</h1>
					<p className="font-bold text-2xl">Cart</p>
					<ul className="my-8 space-y-2">
						{cartItems.length > 0 ? (
							cartItems.map((item) => {
								return (
									<CartItem
										key={item?.product._id}
										item={item}
										userId={user?._id}
										setCheckOutItems={setCheckOutItems}
										setCartItems={setCartItems}
									/>
								);
							})
						) : (
							<li>
								<p className="my-4 text-xl text-center border-2 p-2">
									Your cart is empty. Browse{" "}
									<Link
										onClick={() => setTab("latest")}
										href={"/#products"}
										className="underline"
									>
										products
									</Link>{" "}
									here
								</p>
							</li>
						)}
					</ul>
					<button
						onClick={() => setCheckOutModalVisibility()}
						className="block ml-auto bg-gray-200 hover:bg-green-400 hover:text-white active:bg-green-600 active:text-white p-2"
					>
						Checkout{" "}
						<span className="material-symbols-outlined wght-300 align-bottom">
							shopping_cart_checkout
						</span>
					</button>
					<CheckOutModal
						checkOutItems={checkOutItems}
						setCheckOutItems={setCheckOutItems}
					/>
					<ToBeDelivered />

					<p className="font-bold text-2xl">Transaction History</p>
					<ul>
						<li>
							<p className="my-4 text-xl text-center border-2 p-2">
								No purchases have been made yet.
							</p>
						</li>
					</ul>
				</div>
			)}
		</main>
	);
}
