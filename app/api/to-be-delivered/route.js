import mongoConnection from "@/lib/mongoose/mongoconnection";
import Cart from "@/lib/mongoose/models/Cart";
import ToBeDelivered from "@/lib/mongoose/models/ToBeDelivered";
import { NextResponse } from "next/server";

export async function GET(req, res) {
	await mongoConnection();
	const { searchParams } = new URL(req.url);
	const userid = searchParams.get("userid");

	try {
		const toBeDelivered = await ToBeDelivered.findOne({
			user: userid,
		}).populate("items.product");
		if (toBeDelivered) {
			return NextResponse.json({ toBeDelivered }, { status: 200 });
		} else {
			return NextResponse.json(
				{ message: "Failed to get data" },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{ message: "Failed to get data" },
			{ status: 500 }
		);
	}
}

export async function PUT(req, res) {
	await mongoConnection();

	try {
		const { user_id, product_ids } = await req.json();

		if (!user_id || !product_ids || !Array.isArray(product_ids)) {
			return NextResponse.json(
				{ message: "Invalid input data" },
				{ status: 400 }
			);
		}

		const cart = await Cart.findOne({ user: user_id });

		if (!cart) {
			return NextResponse.json({ message: "Cart not found" }, { status: 404 });
		}

		// Initialize an object to store items to be added or updated in ToBeDelivered
		const itemsToUpdate = {};

		// Iterate through cart items
		cart.items.forEach((item) => {
			if (product_ids.includes(item.product.toString())) {
				const existingItemIndex = itemsToUpdate[item.product.toString()];
				if (existingItemIndex !== undefined) {
					// If item already exists in itemsToUpdate, increment its quantity
					itemsToUpdate[item.product.toString()].quantity += item.quantity;
				} else {
					// If item doesn't exist in itemsToUpdate, add it with current quantity
					itemsToUpdate[item.product.toString()] = {
						product: item.product,
						quantity: item.quantity,
					};
				}
			}
		});

		// Find the ToBeDelivered document for the user
		const toBeDelivered = await ToBeDelivered.findOne({
			user: user_id,
		});

		// Iterate through itemsToUpdate and update ToBeDelivered items
		Object.values(itemsToUpdate).forEach((item) => {
			const existingItem = toBeDelivered.items.find(
				(i) => i.product.toString() === item.product.toString()
			);
			if (existingItem) {
				// If item already exists in ToBeDelivered, update its quantity
				existingItem.quantity += item.quantity;
			} else {
				// If item doesn't exist in ToBeDelivered, add it to the items array
				toBeDelivered.items.push(item);
			}
		});

		// Save the updated ToBeDelivered document
		await toBeDelivered.save();

		const populatedToBeDelivered = await ToBeDelivered.findById(
			toBeDelivered._id
		).populate("items.product");

		// Update the cart by removing the items that are being delivered
		const newCart = await Cart.findOneAndUpdate(
			{ user: user_id },
			{ $pull: { items: { product: { $in: product_ids } } } },
			{ new: true }
		).populate("items.product");

		if (!newCart) {
			return NextResponse.json(
				{ message: "Failed to update cart" },
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{ toBeDelivered: populatedToBeDelivered, cart: newCart },
			{ status: 200 }
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: error.message || "Internal server error" },
			{ status: 500 }
		);
	}
}
