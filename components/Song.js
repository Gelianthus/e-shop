"use client";

import TaylorSwiftLyrics from "taylor-swift-lyrics";

export default function Song() {
	const styles = {
		wrapper: "p-16 bg-neutral-800 text-neutral-50",
		title: "text-2xl font-bold mb-4",
		line_container: "space-y-4",
	};
	return (
		<TaylorSwiftLyrics
			song="so_it_goes"
			customStyles={styles}
		/>
	);
}
