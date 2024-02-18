import mongoConnection from "@/lib/mongoose/mongoconnection";
import Rating from "@/lib/mongoose/models/Rating";
import { NextResponse } from "next/server";

export async function GET(req, res) {
	mongoConnection();
	const { searchParams } = new URL(req.url);
	const userid = searchParams.get("userid");
	const productid = searchParams.get("productid");
	try {
		const rating = await Rating.findOne({
			rating_for: productid,
			rated_by: userid,
		});
		if (rating) {
			return NextResponse.json(
				{ rating: rating.star_rating, message: "Rating found" },
				{ status: 200 }
			);
		} else {
			return NextResponse.json(
				{ rating: 0, message: "Rating not found" },
				{ status: 200 }
			);
		}
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{ message: "Failed to get data, from catch block" },
			{ status: 500 }
		);
	}
}

export async function POST(req, res) {
	await mongoConnection();
	const { user_id, product_id, star_rating } = await req.json();

	try {
		const ratingExist = await Rating.findOne({
			rating_for: product_id,
			rated_by: user_id,
		});

		if (!ratingExist) {
			const newRating = await Rating.create({
				rating_for: product_id,
				rated_by: user_id,
				star_rating: star_rating,
			});
			if (newRating) {
				return NextResponse.json({ rating: newRating }, { status: 200 });
			} else {
				return NextResponse.json(
					{ message: "Failed to perform action" },
					{ status: 500 }
				);
			}
		} else {
			const updatedRating = await Rating.findOneAndUpdate(
				{ rating_for: product_id, rated_by: user_id },
				{ $set: { star_rating: star_rating } },
				{ new: true }
			);

			if (updatedRating) {
				return NextResponse.json({ rating: updatedRating }, { status: 200 });
			} else {
				return NextResponse.json(
					{ message: "Failed to perform action" },
					{ status: 500 }
				);
			}
		}
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ message: "Failed to perform action" },
			{ status: 500 }
		);
	}
}
