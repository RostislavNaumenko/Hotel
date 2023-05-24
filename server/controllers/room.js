import Room from "../models/Room.js";
import RoomStat from "../models/RoomStat.js";
import User from "../models/User.js";

export const getRoom = async (req, res) => {
    try {
        const rooms = await Room.find();

        const roomsWithStats = await Promise.all(
            rooms.map(async (room) => {
                const stat = await RoomStat.find({
                    roomId: room._id
                })
                return {
                    ...room._doc,
                    stat,
                }
            })
        );
        res.status(200).json(roomsWithStats);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

