import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import mongoConnection from "@/lib/mongoose/mongoconnection";
import User from "@/lib/mongoose/models/User";
import Cart from "@/lib/mongoose/models/Cart";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async signIn({ user }) {
			await mongoConnection();
			try {
				const profileExist = await User.findOne({
					email: user.email,
				});

				if (!profileExist) {
					const createdUser = await User.create({
						name: user.name,
						email: user.email,
						profile_pic: {
							img_src: user.image,
							img_alt: `Profile picture of ${user.name}`,
						},
					});

					await Cart.create({
						user: createdUser._id,
					});
					return true;
				}

				return true;
			} catch (error) {
				console.error(error);
				return false;
			}
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
