import Image from "next/image";

export default function ImageGallery({ images }) {
	return (
		<div className="space-y-1 mx-auto">
			<div className="p-1 bg-neutral-200 min-w-64 max-w-64 sm:max-w-96 sm:min-w-96">
				<Image
					src={"/images/the-lich.png"}
					alt="The Lich"
					width={360}
					height={360}
					className="block w-full"
				/>
			</div>
			<div className="p-1 bg-neutral-200 grid grid-cols-4 gap-1 min-w-64 max-w-64 sm:max-w-96 sm:min-w-96 h-fit">
				<div className="bg-red-400">
					<Image
						src={"/images/the-lich.png"}
						alt="The Lich"
						width={40}
						height={40}
						className="block w-full"
					/>
				</div>
				<div className="bg-green-400">
					<Image
						src={"/images/the-lich.png"}
						alt="The Lich"
						width={40}
						height={40}
						className="block w-full"
					/>
				</div>
				<div className="bg-blue-400">
					<Image
						src={"/images/the-lich.png"}
						alt="The Lich"
						width={40}
						height={40}
						className="block w-full"
					/>
				</div>
				<div className="bg-yellow-400">
					<Image
						src={"/images/the-lich.png"}
						alt="The Lich"
						width={40}
						height={40}
						className="block w-full"
					/>
				</div>
			</div>
		</div>
	);
}
