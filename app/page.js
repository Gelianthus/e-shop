import Products from "@/components/products/Products";

export default function Home() {
	return (
		<main className="p-4 xs:p-8 sm:py-8 sm:px-16">
			<div className="text-center my-8 sm:my-16">
				<h1 className="font-bold text-xl xs:text-2xl sm:text-5xl mb-2 break-words">
					<span className="text-emerald-500">Gelianthus</span>' Shed Sale
				</h1>
				<p className="text-neutral-800 text-base sm:text-2xl  sm:font-semibold break-words">
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
				demonstration purpose only, all listed products are non-existent.
			</p>
			<Products />
		</main>
	);
}
