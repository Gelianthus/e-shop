import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	items: {
		type: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					unique: true,
				},
				quantity: { type: Number, default: 1 },
			},
		],
		default: [],
	},
});

const Cart =
	mongoose.models.Cart || mongoose.model("Cart", cartSchema, "carts");

export default Cart;
