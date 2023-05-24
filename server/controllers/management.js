import DailyPlan from "../models/DailyPlan.js";
import Room from "../models/Room.js"; 
import RoomStat from "../models/RoomStat.js";
import User from "../models/User.js";


export const getDailyPlan = async (req, res) => {
    try {
        const dailyPlan = await DailyPlan.find();
        const userWithPlan = await Promise.all(
            dailyPlan.map(async (plan) => {
                const planWithUser = await User.findById(plan.userId);

                
                const roomIds = plan.rooms.map(room => room.roomId);

                
                const rooms = await Room.find({_id: {$in: roomIds}});

                
                const roomStats = await Promise.all(rooms.map(async (room) => {
                    const roomStat = await RoomStat.find({roomId: room._id});
                    return {
                        ...room._doc,
                        roomStat
                    };
                }));

                return {
                    ...plan._doc,
                    planWithUser,
                    rooms: roomStats
                };
            })
        );

        res.status(200).json(userWithPlan);
    }catch (error) {
    res.status(404).json({ message: error.message })}
}
export const createWorker = async (req, res) => {
    try {
        const user = await User.create(
            req.body

        );

        console.log(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message })
        console.log(error);
    }
}

export const createRoomWork = async (req, res) => {
    try {
        const roomsStat = await RoomStat.create(
            req.body

        );

        console.log(req.body);
        res.status(200).json(roomsStat);
    } catch (error) {
        res.status(400).json({ message: error.message })
        console.log(error);
    }
}