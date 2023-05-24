import express from "express";
import { getWorkers, updateRoomStat} from "../controllers/client.js";
import User from "../models/User.js";
import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;


const router = express.Router();

router.get("/workers", getWorkers);
router.put("/updateRoomStat", updateRoomStat);
router.post("/login", async (req, res, next) => {
    let { email, password} = req.body;
    console.log( req.body);
    let existingUser;
    try {
      existingUser = await User.findOne({ email: email });
    } catch (e){
      console.log(e);
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
    if (!existingUser || existingUser.password != password) {
      const error = Error("Wrong details please check at once");
      return next(error);
    }
    let token;
    try {
      //Creating jwt token
      token = sign(
        { userId: existingUser.id, email: existingUser.email },
        "secretkeyappearshere",
        { expiresIn: "1h" }
      );
    } catch (err) {
      console.log(err);
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
   
    res
      .status(200)
      .json({
        success: true,
        data: {
          userId: existingUser.id,
          email: existingUser.email,
          token: token,
        },
      });
  })



export default router;