import mongoose, { Schema } from "mongoose";

const transactionHistorySchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	transactions: {
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
	expireAt: { type: Date, expires: 172800, default: Date.now },
});

const TransactionHistory =
	mongoose.models.TransactionHistory ||
	mongoose.model(
		"TransactionHistory",
		transactionHistorySchema,
		"transaction_histories"
	);

export default TransactionHistory;
