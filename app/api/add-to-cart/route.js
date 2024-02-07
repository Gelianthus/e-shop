import mongoConnection from "@/lib/mongoose/mongoconnection";
import Cart from "@/lib/mongoose/models/Cart";
import { NextResponse } from "next/server";

export async function PUT(req, res) {
	await mongoConnection();
	try {
		const { user_id, product_id } = await req.json();
		const addedToCart = await Cart.findOneAndUpdate(
			{ user: user_id },
			{ $push: { items: product_id } }
		);
		if (addedToCart) {
			return NextResponse.json({ message: "Added to cart" }, { status: 200 });
		} else {
			return NextResponse.json(
				{ message: "Failed to add product into cart" },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{ message: "Failed to add product into cart" },
			{ status: 500 }
		);
	}
}
