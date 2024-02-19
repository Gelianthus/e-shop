"use client";

import { useState, useRef, useEffect } from "react";
import { scrollLock } from "@/utils/useEffectFunc";
import { CldImage } from "next-cloudinary";

export default function ImageGallery({ images }) {
	const imagePrevRef = useRef(null);
	const [imageIndex, setImageIndex] = useState(0);
	const [imgPrevToggle, setImgPrevToggle] = useState(false);

	useEffect(() => {
		scrollLock(imgPrevToggle);
	}, [imgPrevToggle]);

	return (
		<div className="space-y-1 mx-auto">
			<div className="block xs:hidden p-1 bg-neutral-200 min-w-64 max-w-64 sm:max-w-96 sm:min-w-96">
				<CldImage
					src={`e-shop/${
						images[imageIndex].img_src
							.slice(8, images[imageIndex].img_src.length)
							.split(".")[0]
					}`}
					alt={images[imageIndex].img_alt}
					width={360}
					height={360}
					className="block w-full cursor-pointer"
					loading="lazy"
				/>
			</div>
			<div
				onClick={() => {
					imagePrevRef.current.showModal();
					setImgPrevToggle(true);
				}}
				className="hidden xs:block p-1 bg-gray-200 min-w-64 max-w-64 sm:max-w-96 sm:min-w-96"
			>
				<CldImage
					src={`e-shop/${
						images[imageIndex].img_src
							.slice(8, images[imageIndex].img_src.length)
							.split(".")[0]
					}`}
					alt={images[imageIndex].img_alt}
					width={360}
					height={360}
					className="block w-full cursor-pointer"
					loading="lazy"
				/>
			</div>
			<div className="p-1 bg-gray-200 grid grid-cols-4 gap-1 min-w-64 max-w-64 sm:max-w-96 sm:min-w-96 h-fit">
				{images.map((image, index) => {
					return (
						<div
							onClick={() => setImageIndex(index)}
							key={index}
							className="bg-red-400 cursor-pointer"
						>
							<CldImage
								src={`e-shop/${
									images[index].img_src
										.slice(8, images[index].img_src.length)
										.split(".")[0]
								}`}
								alt={image.img_alt}
								width={40}
								height={40}
								className="block w-full"
								loading="lazy"
							/>
						</div>
					);
				})}
			</div>
			<dialog
				ref={imagePrevRef}
				className="h-fit p-1 sm:p-4 my-auto overflow-hidden relative outline-none"
			>
				<CldImage
					src={`e-shop/${
						images[imageIndex].img_src
							.slice(8, images[imageIndex].img_src.length)
							.split(".")[0]
					}`}
					alt={images[imageIndex].img_alt}
					width={720}
					height={720}
					className="block aspect-square max-w-64 xs:max-w-96 sm:max-w-xl my-auto "
					loading="lazy"
				/>
				<button
					onClick={() => {
						imagePrevRef.current.close();
						setImgPrevToggle(false);
					}}
					className="absolute top-0 right-0 p-2 bg-neutral-600 text-neutral-50  hover:bg-rose-500 active:bg-rose-600 font-semibold"
				>
					Close{" "}
					<span className="material-symbols-outlined wght-300 align-bottom">
						close
					</span>
				</button>
			</dialog>
		</div>
	);
}
