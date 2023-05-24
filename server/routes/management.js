import express from 'express';
import { getRoom} from '../controllers/room.js';
import {getDailyPlan} from '../controllers/management.js'
import {createWorker, createRoomWork} from '../controllers/management.js'


const router = express.Router();

router.get("/rooms", getRoom);
router.get("/workList", getDailyPlan);
router.post("/worker", createWorker);
router.post("/addRoomStat", createRoomWork)

export default router;