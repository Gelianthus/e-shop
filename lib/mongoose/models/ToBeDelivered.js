import mongoose, { Schema } from "mongoose";

const toBeDeliveredSchema = new Schema({
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

const ToBeDelivered =
	mongoose.models.ToBeDelivered ||
	mongoose.model(
		"ToBeDelivered",
		toBeDeliveredSchema,
		"to_be_delivered_collection"
	);

export default ToBeDelivered;
