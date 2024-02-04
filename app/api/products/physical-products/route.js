import mongoConnection from "@/lib/mongoose/mongoconnection";
import Product from "@/lib/mongoose/models/Product";
import { NextResponse } from "next/server";

export async function GET(req, res) {
	await mongoConnection();

	try {
		const products = await Product.find({ type: "Physical" })
			.sort({ release_date: 1 })
			.limit(10);
		if (products) {
			return NextResponse.json({ products }, { status: 200 });
		} else {
			return NextResponse.json(
				{ message: "Unable to obtain products" },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{ message: "Failed to fetch data" },
			{ status: 500 }
		);
	}
}
