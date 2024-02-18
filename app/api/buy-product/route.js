import mongoConnection from "@/lib/mongoose/mongoconnection";
import ToBeDelivered from "@/lib/mongoose/models/ToBeDelivered";
import { NextResponse } from "next/server";

export async function PUT(req, res) {
	await mongoConnection();
	const { user_id, product_id, quantity } = await req.json();

	try {
		if (!user_id || !product_id || !quantity)
			return NextResponse.json({ message: "Missing IDs" }, { status: 500 });

		const toBeDelivered = await ToBeDelivered.findOne({ user: user_id });

		if (
			!toBeDelivered.items
				.map((item) => item.product.toString())
				.includes(product_id)
		) {
			const buyProduct = await ToBeDelivered.findOneAndUpdate(
				{ user: user_id },
				{ $push: { items: { product: product_id, quantity: quantity } } },
				{ new: true }
			);

			if (buyProduct) {
				return NextResponse.json(
					{ message: "Thank you for your purchase." },
					{ status: 200 }
				);
			} else {
				return NextResponse.json(
					{ message: "Failed to perform action" },
					{ status: 500 }
				);
			}
		} else {
			const updateToBeDelivered = await ToBeDelivered.findOneAndUpdate(
				{ user: user_id, "items.product": product_id },
				{ $inc: { "items.$.quantity": quantity } },
				{ new: true }
			);
			if (updateToBeDelivered) {
				return NextResponse.json(
					{ message: "Thank you for your purchase" },
					{ status: 200 }
				);
			} else {
				return NextResponse.json(
					{ message: "Failed to perform action" },
					{ status: 500 }
				);
			}
		}
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{ message: "Failed to perform action" },
			{ status: 500 }
		);
	}
}
