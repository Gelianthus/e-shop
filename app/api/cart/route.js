import mongoConnection from "@/lib/mongoose/mongoconnection";
import Cart from "@/lib/mongoose/models/Cart";
import { NextResponse } from "next/server";

export async function GET(req, res) {
	await mongoConnection();
	const { searchParams } = new URL(req.url);
	const userid = searchParams.get("userid");

	try {
		if (!userid) {
			return NextResponse.json({ message: "Missing Id" }, { status: 500 });
		}
		const cart = await Cart.findOne({ user: userid }).populate("items.product");

		if (cart) {
			return NextResponse.json({ cart }, { status: 200 });
		} else {
			return NextResponse.json(
				{ message: "Failed to get Cart data" },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{ message: "Failed to get Cart data" },
			{ status: 500 }
		);
	}
}

export async function PUT(req, res) {
	await mongoConnection();
	const { user_id, product_id } = await req.json();

	try {
		if (!user_id || !product_id)
			return NextResponse.json({ message: "Missing IDs" }, { status: 500 });

		const cart = await Cart.findOneAndUpdate(
			{ user: user_id },
			{ $pull: { items: { product: product_id } } },
			{ new: true }
		).populate("items.product");

		if (cart) {
			return NextResponse.json({ cart }, { status: 200 });
		} else {
			return NextResponse.json({ message: 500 }, { status: 500 });
		}
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{ message: "Failed to update cart" },
			{ status: 500 }
		);
	}
}
