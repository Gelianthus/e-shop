import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<footer>
			<div className="my-4 bg-gray-800 p-4 text-neutral-50">
				<Image
					src={"/images/logo-white.webp"}
					alt="gelianthus logo"
					width={240}
					height={240}
					className="block mx-auto mb-4"
				/>
				<span className="text-4xl font-bold text-center block">
					Gelianthus' Shed Sale
				</span>
				<span className="block">© Gelianthus 2024</span>
			</div>
			<nav className="grid grid-cols-3">
				<div>
					<h2>Products</h2>
					<div>
						<Link href="">Digital Goods</Link>
						<Link href="">Physical Goods</Link>
					</div>
				</div>
				<div></div>
				<div></div>
			</nav>
		</footer>
	);
}
