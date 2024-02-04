import mongoConnection from "@/lib/mongoose/mongoconnection";
import Product from "@/lib/mongoose/models/Product";
import { NextResponse } from "next/server";

export async function GET(req, res) {
	await mongoConnection();
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");
	try {
		const prod = await Product.findById(id);
		if (prod) {
			return NextResponse.json({ prod }, { status: 200 });
		} else {
			return NextResponse.json(
				{ message: "Failed to get product detail" },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{ message: "Failed to get product detail" },
			{ status: 500 }
		);
	}
}
