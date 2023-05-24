import mongoose from "mongoose";
import { Schema } from "mongoose";

const DailyPlanSchema = new mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        rooms: [{
            roomId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'RoomStat',
                required: true
            },
        }],
    },
    { timestamps: true }
);

const RoomStat = mongoose.model("DailyPlan", DailyPlanSchema);

export default RoomStat;