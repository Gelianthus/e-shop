import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema({
	rating_for: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
	rated_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	star_rating: Number,
});

const Rating =
	mongoose.models.Rating || mongoose.model("Rating", ratingSchema, "ratings");

export default Rating;
