import mongoConnection from "@/lib/mongoose/mongoconnection";
import User from "@/lib/mongoose/models/User";
import { NextResponse } from "next/server";

export async function GET(req, res) {
	await mongoConnection();
	const { searchParams } = new URL(req.url);
	const useremail = searchParams.get("useremail");
	try {
		const user = await User.findOne({ email: useremail });
		if (user) {
			return NextResponse.json({ user }, { status: 200 });
		} else {
			return NextResponse.json(
				{ message: "Failed to get user details" },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{ message: "Failed to get user details" },
			{ status: 500 }
		);
	}
}
