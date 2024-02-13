import Image from "next/image";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import Link from "next/link";

export default function Header() {
	return (
		<header className="p-4 xs:p-8 sm:px-16 sm:py-8 flex flex-row items-center justify-between gap-4">
			<Link href={"/"}>
				<Image
					src="/images/logo.webp"
					alt="Gelianthus logo"
					width={40}
					height={40}
					className="block"
				/>
			</Link>
			<Nav />
			<MobileNav />
		</header>
	);
}
