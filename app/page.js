import Products from "@/components/products/Products";
import Link from "next/link";

export default function Home() {
	return (
		<main>
			<div className="text-center my-16">
				<h1 className="font-bold text-5xl mb-2 break-words">
					<span className="text-emerald-500">Gelianthus</span>' Shed Sale
				</h1>
				<p className="text-neutral-800 text-2xl font-semibold break-words">
					Summer <span className="line-through">Spring</span> cleaning time! The{" "}
					<span className="font-semibold">first </span>of the many summers of
					the Philippines have just arrived. <br />
					Time to tidy up the shed and start selling old and unused stuff to
					make room <br />
					<span className="text-neutral-500">
						for more stuff that will never see daylight.
					</span>
				</p>
			</div>
			<p className="text-center font-bold my-4 break-words">
				<span className="text-rose-700">Disclaimer: </span> This website is for
				demonstration purpose only, all listed products are either{" "}
				<Link
					href=""
					className="underline"
				>
					free
				</Link>{" "}
				or non-existent. <br /> If you've accidentally made a purchase, contact
				me to undo your purchase.
			</p>
			<Products />
		</main>
	);
}
