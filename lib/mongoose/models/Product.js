import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
	name: String,
	about: String,
	description: String,
	type: String,
	price: Number,
	quantity: { type: Number, default: 1000000 },
	release_date: { type: Date, default: Date.now },
	images: [
		{
			img_src: { type: String, default: "/images/the-lich.png" },
			img_alt: { type: String, default: "The Lich" },
		},
	],
	available: { type: Boolean, default: true },
});

const Product =
	mongoose.models.Product ||
	mongoose.model("Product", productSchema, "products");

export default Product;
