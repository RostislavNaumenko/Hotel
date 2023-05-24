import User from "../models/User.js";
import RoomStat from "../models/RoomStat.js"


export const getWorkers = async (req, res) => {
    try{
        const user = await User.find().select("-password");
        res.status(200).json(user);
    }catch (error){
        res.status(404).json({message: error.message})
    }
}


export const updateRoomStat = async (req, res) => {
  const { roomStatId : _id} = req.body;
  console.log(req.body);
  try {
    const room = await RoomStat.updateOne({_id}, { $set: { status: "Done" } });

    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
}