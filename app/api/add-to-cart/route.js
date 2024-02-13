import mongoConnection from "@/lib/mongoose/mongoconnection";
import Cart from "@/lib/mongoose/models/Cart";
import { NextResponse } from "next/server";

export async function PUT(req, res) {
	await mongoConnection();
	try {
		const { user_id, product_id } = await req.json();

		const cart = await Cart.findOne({ user: user_id });

		if (!cart) return NextResponse.json({ status: 500 });

		const isAlreadyAdded = cart.items.some(
			(item) => item.product.toString() === product_id
		);

		if (!isAlreadyAdded) {
			const addedToCart = await Cart.findOneAndUpdate(
				{ user: user_id },
				{ $push: { items: { product: product_id } } },
				{ new: true }
			).populate("items.product");
			if (addedToCart) {
				return NextResponse.json(
					{ message: "Added to cart", cart: addedToCart },
					{ status: 200 }
				);
			} else {
				return NextResponse.json(
					{ message: "Failed to add product into cart" },
					{ status: 500 }
				);
			}
		} else {
			const incrementQuantity = await Cart.findOneAndUpdate(
				{ user: user_id, "items.product": product_id },
				{ $inc: { "items.$.quantity": 1 } },
				{ new: true }
			).populate("items.product");
			if (incrementQuantity) {
				return NextResponse.json(
					{ message: "Added to cart", cart: incrementQuantity },
					{ status: 200 }
				);
			} else {
				return NextResponse.json(
					{ message: "Failed to add product into cart" },
					{ status: 500 }
				);
			}
		}
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{ message: "Failed to add product into cart" },
			{ status: 500 }
		);
	}
}
