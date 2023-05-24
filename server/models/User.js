import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            require: true,
            min: 2,
            max: 100,
        },
        surname:{
            type: String,
            require: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            require: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            min: 5,
        },
        occupation: String,
        phoneNumber: String,
        role:{
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
    },
    {timestamps: true}
);

const User = mongoose.model("User", UserSchema);

export default User;