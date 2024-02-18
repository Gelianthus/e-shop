import Link from "next/link";

export default function AboutPage() {
	return (
		<main className="p-4 xs:p-8 sm:py-8 sm:px-16">
			<nav className="sticky top-0 flex flex-row gap-4 bg-white snap-x flex-wrap">
				<Link
					className="px-2 py-4 block hover:bg-gray-200 active:bg-gray-600 active:text-neutral-50"
					href={"/about"}
				>
					About
				</Link>
				<Link
					className="px-2 py-4 block hover:bg-gray-200 active:bg-gray-600 active:text-neutral-50"
					href={"/about#terms-and-conditions"}
				>
					Terms and Conditions
				</Link>
				<Link
					className="px-2 py-4 block hover:bg-gray-200 active:bg-gray-600 active:text-neutral-50"
					href={"/about#privacy"}
				>
					Privacy
				</Link>
				<Link
					className="px-2 py-4 block hover:bg-gray-200 active:bg-gray-600 active:text-neutral-50"
					href={"/about#faq"}
				>
					FAQ
				</Link>
			</nav>
			<span className="my-2 text-xs text-neutral-600 text-end block">
				Written by ChatGPT
			</span>
			<section
				className="scroll-mt-16 bg-neutral-100 p-4 my-8"
				id="about"
			>
				<h2 className="text-xl font-bold mb-4">About</h2>

				<p className="my-2">
					Gelianthus' Shed is not just another e-commerce website; it's a
					passion project born out of the desire to explore the world of
					full-stack development and create something unique. At Gelianthus'
					Shed, our goal is to provide users with a fully functional e-commerce
					experience, complete with all the features and functionalities you'd
					expect from a typical online marketplace. However, unlike traditional
					e-commerce platforms, Gelianthus' Shed is not designed to sell actual
					products. Instead, it serves as a playground for experimentation and
					learning in the realm of web development. Gelianthus' Shed showcases
					the culmination of countless hours of coding, testing, and refining.
					From seamless navigation to intuitive user interfaces, every aspect of
					Gelianthus' Shed has been carefully crafted to deliver an immersive
					and engaging online shopping experience.
				</p>
			</section>
			<section
				className="scroll-mt-16 bg-neutral-100 p-4 my-8"
				id="terms-and-conditions"
			>
				<h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
				<p className="my-2">
					Welcome to Gelianthus' Services! By using our services, you agree to
					be bound by the following terms and conditions. Please read them
					carefully.
				</p>
				<h3 className="my-4 font-semibold">1. Account Creation and Usage</h3>
				<p className="my-2">
					1.1. To access certain features of Gelianthus, you may be required to
					create an account. By creating an account, you agree to provide
					accurate and complete information.
				</p>
				<p className="my-2">
					1.2. By creating an account, you consent to the storage of your email
					address in our database for the purpose of account creation and
					communication.
				</p>
				<h3 className="my-4 font-semibold">2. Privacy</h3>
				<p className="my-2">
					2.1. Your privacy is important to us. Please review our Privacy Policy
					to understand how we collect, use, and disclose information about you.
				</p>
				<h3 className="my-4 font-semibold">3. Acceptable Use</h3>
				<p className="my-2">
					3.1. You agree not to use Gelianthus for any unlawful purposes or in
					violation of any applicable laws or regulations.
				</p>
				<p className="my-2">
					3.2. You agree not to access or use Gelianthus in any manner that
					could damage, disable, overburden, or impair our servers or networks.
				</p>
				<h3 className="my-4 font-semibold">4. Intellectual Property</h3>
				<p className="my-2">
					4.1. All content included on Gelianthus, such as text, graphics,
					logos, button icons, images, audio clips, digital downloads, data
					compilations, and software, is the property of Gelianthus or its
					content suppliers and protected by international copyright laws.
				</p>
				<h3 className="my-4 font-semibold">5. Limitation of Liability</h3>
				<p className="my-2">
					5.1. Gelianthus shall not be liable for any indirect, incidental,
					special, consequential, or punitive damages, or any loss of profits or
					revenues, whether incurred directly or indirectly, or any loss of
					data, use, goodwill, or other intangible losses, resulting from{" "}
					{"(a)"}
					your access to or use of or inability to access or use Gelianthus;{" "}
					{"(b)"}
					any conduct or content of any third party on Gelianthus.{" "}
				</p>
				<h3 className="my-4 font-semibold">
					6. Changes to Terms and Conditions
				</h3>
				<p className="my-2">
					6.1. Gelianthus reserves the right to modify these terms and
					conditions at any time, effective upon posting the modified terms and
					conditions on Gelianthus. Your continued use of Gelianthus after any
					such modifications shall constitute your consent to such
					modifications.
				</p>
				<h3 className="my-4 font-semibold">7. Contact Information</h3>
				<p className="my-2">
					If you have any questions about these terms and conditions, please
					contact us at gelotandoc04@gmail.com.
				</p>
			</section>
			<section
				className="scroll-mt-16 bg-neutral-100 p-4 my-8"
				id="privacy"
			>
				<h2 className="text-xl font-bold mb-4">Privacy</h2>
				<p className="my-2">
					This Privacy Policy describes how Gelianthus ("we," "us," or "our")
					collects, uses, and shares information about you when you use our
					website (the "Service").
				</p>

				<h3 className="my-4 font-semibold">Information We Collect</h3>
				<p className="my-2">
					We collect certain information when you use our Service, including:
				</p>
				<ul>
					<li>
						<p className="my-2">
							<span className="font-semibold">- Personal Information:</span>{" "}
							When you create an account on Gelianthus, we may collect personal
							information such as your name, email address, and any other
							information you choose to provide.
						</p>
					</li>
					<li>
						<p className="my-2">
							<span className="font-semibold">Usage Information:</span> We
							automatically collect certain information about your use of the
							Service, including your IP address, browser type, operating
							system, device identifiers, and the pages you visit on our
							website.
						</p>
					</li>
				</ul>
				<h3 className="my-4 font-semibold">How We Use Your Information</h3>
				<p className="my-2">
					We may use the information we collect for various purposes, including
					to:
				</p>
				<ul>
					<li>
						<p className="my-2">
							- Provide, maintain, and improve the Service;
						</p>
					</li>
					<li>
						<p className="my-2">
							- Communicate with you about your account and our services;
						</p>
					</li>
					<li>
						<p className="my-2">
							- Personalize your experience on our website;
						</p>
					</li>
				</ul>
			</section>
			<section
				className="scroll-mt-16 bg-neutral-100 p-4 my-8"
				id="faq"
			>
				<h2 className="text-xl font-bold mb-4">FAQ</h2>
				<p className="my-2">
					Welcome to the Gelianthus FAQ section! Here, we've compiled answers to
					some common questions you might have about our platform.
				</p>
				<ul>
					<li>
						<p className="my-2">
							<span className="font-semibold block my-2">
								1. What is Gelianthus?
							</span>{" "}
							Gelianthus is a mock e-commerce website created for educational
							and experimental purposes. While it offers all the functionalities
							of a typical online marketplace, it does not sell actual products.
							Instead, Gelianthus serves as a platform for users to explore the
							world of full-stack development and learn about e-commerce website
							architecture.
						</p>
					</li>
					<li>
						<p className="my-2">
							<span className="font-semibold block my-2">
								2. Can I make purchases on Gelianthus?
							</span>
							No, Gelianthus is not a real e-commerce platform and does not
							facilitate the sale of products. However, you are welcome to
							browse the website, add items to your cart, and simulate the
							checkout process for educational purposes.
						</p>
					</li>
					<li>
						<p className="my-2">
							<span className="font-semibold block my-2">
								3. Is my personal information safe on Gelianthus?
							</span>
							We take the privacy and security of your personal information
							seriously. While Gelianthus collects certain information for
							account creation and usage purposes, we use industry-standard
							security measures to protect your data from unauthorized access,
							disclosure, alteration, or destruction. For more information,
							please refer to our Privacy Policy.
						</p>
					</li>
				</ul>
			</section>
		</main>
	);
}
