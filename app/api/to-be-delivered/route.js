import mongoConnection from "@/lib/mongoose/mongoconnection";
import Cart from "@/lib/mongoose/models/Cart";
import ToBeDelivered from "@/lib/mongoose/models/ToBeDelivered";
import { NextResponse } from "next/server";

export async function GET(req, res) {
	await mongoConnection();
	const { searchParams } = new URL(req.url);
	const userid = searchParams.get("userid");

	try {
		const toBeDelivered = await ToBeDelivered.findOne({
			user: userid,
		}).populate("items.product");
		if (toBeDelivered) {
			return NextResponse.json({ toBeDelivered }, { status: 200 });
		} else {
			return NextResponse.json(
				{ message: "Failed to get data" },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{ message: "Failed to get data" },
			{ status: 500 }
		);
	}
}

export async function PUT(req, res) {
	await mongoConnection();
	const { user_id, product_ids } = await req.json();

	try {
		const cart = await Cart.findOne({ user: user_id });

		if (!user_id || !product_ids)
			return NextResponse.json({ message: "Missing IDs" }, { status: 500 });

		if (!cart)
			return NextResponse.json(
				{ message: "Failed to get data" },
				{ status: 404 }
			);

		const checkOutItems = cart.items.filter((item) =>
			product_ids.includes(item.product)
		);

		const toBeDelivered = await ToBeDelivered.findOneAndUpdate(
			{ user: user_id },
			{ $push: { items: { $each: checkOutItems } } },
			{ new: true }
		).populate("items.product");

		if (toBeDelivered) {
			return NextResponse.json({ toBeDelivered }, { status: 200 });
		} else {
			return NextResponse.json(
				{ message: "Failed to get data" },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ message: "Failed to get data" },
			{ status: 500 }
		);
	}
}

// will received an array of product ids
// get cart using user id
// loop through cart.items using the received product id array and add cart.items[index] to tobedelivered.items
