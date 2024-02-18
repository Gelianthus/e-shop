import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import mongoConnection from "@/lib/mongoose/mongoconnection";
import User from "@/lib/mongoose/models/User";
import Cart from "@/lib/mongoose/models/Cart";
import ToBeDelivered from "@/lib/mongoose/models/ToBeDelivered";
import TransactionHistory from "@/lib/mongoose/models/TransactionHistory";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	session: {
		autoSignIn: false,
		maxAge: 4 * 60 * 60,
	},
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

					const cartCreated = await Cart.create({
						user: createdUser._id,
					});

					const toBeDeliveredCreated = await ToBeDelivered.create({
						user: createdUser._id,
					});

					const transactionHistory = await TransactionHistory.create({
						user: createdUser._id,
					});

					if (
						!createdUser ||
						!cartCreated ||
						!toBeDeliveredCreated ||
						!transactionHistory
					) {
						return false;
					}

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
