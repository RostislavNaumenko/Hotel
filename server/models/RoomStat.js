import mongoose from "mongoose";

const RoomStatSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room'
        },
        typeOfWork: {
            type: String,
            enum: ["AB", "BL"],
            default: "AB"
        },
        cost: Number,
        date: Date,
        descriptions: String,
        status: {
            type: String,
            enum: ["Done", "During"],
            default: "AB"
        }
    },
    { timestamps: true }
);

const RoomStat = mongoose.model("RoomStat", RoomStatSchema);

export default RoomStat;
