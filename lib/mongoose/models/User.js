import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
	name: String,
	email: String,
	profile_pic: {
		img_src: String,
		img_alt: String,
	},
});

const User =
	mongoose.models.User || mongoose.model("User", userSchema, "users");

export default User;
