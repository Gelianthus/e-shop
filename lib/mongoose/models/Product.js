import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
	name: String,
	type: String,
	price: Number,
	available: Boolean,
});

const Product =
	mongoose.models.Product ||
	mongoose.model("Product", productSchema, "products");

export default Product;
