import express from 'express';
import {allBookings, bookVisit, cancelBooking, createUser} from '../controllers/userController.js';
const router = express.Router();

router.post("/register", createUser);
router.post("/bookvisit/:id", bookVisit);
router.get("/allBookings", allBookings);
router.post("/removeBooking/:id", cancelBooking )

export {router as userRoute}
