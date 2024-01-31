"use client";

import { useState } from "react";
import LatestProds from "./LatestProds";
import DigitalProds from "./digital-products/DigitalProds";
import PhysicalProds from "./physical-products/PhysicalProds";

export default function Products() {
	const [tab, setTab] = useState("latest");
	return (
		<div className="p-4 xs:p-8 sm:p-16">
			<nav>
				<ul className="flex flex-row gap-4 flex-wrap mb-4 sm:mb-8 text-neutral-500">
					<li>
						<button
							className={`font-semibold ${
								tab === "latest" && "text-neutral-800"
							}`}
							onClick={() => {
								setTab("latest");
							}}
						>
							LATEST GOODS
						</button>
					</li>
					<li>
						<button
							className={`font-semibold ${
								tab === "physical" && "text-neutral-800"
							}`}
							onClick={() => {
								setTab("physical");
							}}
						>
							PHYSICAL GOODS
						</button>
					</li>
					<li>
						<button
							className={`font-semibold ${
								tab === "digital" && "text-neutral-800"
							}`}
							onClick={() => {
								setTab("digital");
							}}
						>
							DIGITAL GOODS
						</button>
					</li>
				</ul>
			</nav>
			{tab === "latest" && <LatestProds />}
			{tab === "physical" && <PhysicalProds />}
			{tab === "digital" && <DigitalProds />}
		</div>
	);
}
