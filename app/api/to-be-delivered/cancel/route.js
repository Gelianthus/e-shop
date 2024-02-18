import mongoConnection from "@/lib/mongoose/mongoconnection";
import ToBeDelivered from "@/lib/mongoose/models/ToBeDelivered";
import { NextResponse } from "next/server";

export async function PUT(req, res) {
	await mongoConnection();
	const { user_id, product_id } = await req.json();

	try {
		console.log(user_id, product_id);

		const toBeDelivered = await ToBeDelivered.findOneAndUpdate(
			{ user: user_id },
			{
				$pull: { items: { product: product_id } },
			},
			{
				new: true,
			}
		).populate("items.product");

		if (toBeDelivered) {
			return NextResponse.json({ toBeDelivered }, { status: 200 });
		} else {
			return NextResponse.json(
				{ message: "Failed to perform action" },
				{ status: 500 }
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
