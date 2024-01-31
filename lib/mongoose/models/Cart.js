import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Cart =
	mongoose.models.Cart || mongoose.model("Cart", cartSchema, "carts");

export default Cart;
