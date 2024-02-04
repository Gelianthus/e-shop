import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
	const { _id, name, type, price, images, about } = product;
	return (
		<Link
			href={`/product?id=${_id}`}
			className="bg-white p-4 w-64"
		>
			<Image
				src={images[0].img_src}
				alt={images[0].img_alt}
				width={240}
				height={240}
				className="block mx-auto"
			/>
			<span className="text-xs block my-2 text-green-500">{type}</span>
			<div className="flex flex-col xs:flex-row gap-1 xs:gap-4 xs:justify-between my-1 text-xl font-semibold">
				<span>{name}</span>
				<span>${price}</span>
			</div>
			<span className="block my-1">{about}</span>
		</Link>
	);
}