import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
    {
        roomNumber: Number,
        floor: Number,
        countOfVisitors: {
            type: Number,
            enum: [1, 2, 3, 4],
            default: 2
        }
    },
    {timestamps: true}
);

const Room = mongoose.model("Room", RoomSchema);

export default Room;