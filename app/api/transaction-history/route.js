import mongoConnection from "@/lib/mongoose/mongoconnection";
import ToBeDelivered from "@/lib/mongoose/models/ToBeDelivered";
import TransactionHistory from "@/lib/mongoose/models/TransactionHistory";
import { NextResponse } from "next/server";

export async function GET(req, res) {
	await mongoConnection();
	const { searchParams } = new URL(req.url);
	const userid = searchParams.get("userid");

	try {
		const transactionHistory = await TransactionHistory.findOne({
			user: userid,
		}).populate("transactions.product");
		if (transactionHistory) {
			return NextResponse.json({ transactionHistory }, { status: 200 });
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
	const { user_id, product_id } = await req.json();

	try {
		if (!user_id || !product_id)
			return NextResponse.json({ message: "Missing IDs" }, { status: 500 });

		const toBeDelivered = await ToBeDelivered.findOne({ user: user_id });

		if (!toBeDelivered)
			return NextResponse.json(
				{ message: "Failed to get data" },
				{ status: 404 }
			);

		const receivedItem = toBeDelivered.items.filter(
			(item) => item.product.toString() === product_id
		)[0];

		console.log("received item:", receivedItem);

		const transactionHistory = await TransactionHistory.findOneAndUpdate(
			{ user: user_id },
			{ $push: { transactions: receivedItem } },
			{ new: true }
		).populate("transactions.product");

		if (transactionHistory) {
			const newToBeDelivered = await ToBeDelivered.findOneAndUpdate(
				{ user: user_id },
				{ $pull: { items: { product: product_id } } },
				{ new: true }
			).populate("items.product");

			if (!newToBeDelivered) {
				return NextResponse.json(
					{ message: "Failed to perform action" },
					{ status: 500 }
				);
			}

			return NextResponse.json(
				{ transactionHistory, toBeDelivered: newToBeDelivered },
				{ status: 200 }
			);
		}
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{ message: "Failed to perform action" },
			{ status: 500 }
		);
	}
}
