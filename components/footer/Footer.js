"use client";

import { productTabStore } from "@/lib/zustand/productTabStore";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	const { setTab } = productTabStore();

	return (
		<footer className="relative bg-gray-800 text-neutral-50 sm:p-16 xs:p-8 p-4">
			<button
				title="Back to top"
				onClick={() => {
					window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
				}}
				className="absolute top-0 right-0 sm:top-4 sm:right-4 p-2 w-fit h-fit hover:text-gray-400 active:text-gray-600"
			>
				<span className="material-symbols-outlined wght-700 bg-gray-950">
					keyboard_arrow_up
				</span>
			</button>
			<div className="mb-8 xs:mb-12 sm:mb-16">
				<div className="mx-auto w-36 sm:w-60">
					<Image
						src={"/images/logo-white.webp"}
						alt="gelianthus logo"
						width={240}
						height={240}
						className="block mx-auto mb-4"
					/>
				</div>
				<span className="text-2xl xs:text-3xl sm:text-4xl font-bold text-center block">
					Gelianthus' Shed Sale
				</span>
				<span className="block text-center text-sm xs:text-base">
					© 2024 Gelianthus. Built with Next.js
				</span>
			</div>
			<nav className="grid grid-cols1 xs:grid-cols-2 sm:grid-cols-3 gap-4">
				<div>
					<h2 className="font-bold mb-2 text-sm xs:text-base">Products</h2>
					<ul className="text-xs xs:text-sm space-y-2">
						<li>
							<Link
								onClick={() => setTab("digital")}
								href="/#products"
								className="hover:underline active:underline"
							>
								Digital Goods
							</Link>
						</li>
						<li>
							<Link
								onClick={() => setTab("physical")}
								href="/#products"
								className="hover:underline active:underline"
							>
								Physical Goods
							</Link>
						</li>
					</ul>
				</div>
				<div>
					<h2 className="font-bold mb-2 text-sm xs:text-base">Links</h2>
					<ul className="text-xs xs:text-sm space-y-2">
						<li>
							<Link
								href="/about"
								className="hover:underline active:underline"
							>
								About
							</Link>
						</li>
						<li>
							<Link
								href="/about#terms-and-conditions"
								className="hover:underline active:underline"
							>
								Terms and Conditions
							</Link>
						</li>

						<li>
							<Link
								href="/about#privacy"
								className="hover:underline active:underline"
							>
								Privacy
							</Link>
						</li>
						<li>
							<Link
								href="/about#faq"
								className="hover:underline active:underline"
							>
								FAQ
							</Link>
						</li>
					</ul>
				</div>
				<div>
					<h2 className="font-bold mb-2 text-sm xs:text-base">Contacts</h2>
					<ul className="text-xs xs:text-sm space-y-2">
						<li>gelotandoc04@gmail.com</li>
					</ul>
				</div>
			</nav>
		</footer>
	);
}
