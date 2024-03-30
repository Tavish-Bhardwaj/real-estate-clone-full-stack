import express from 'express';
import {allBookings, bookVisit, cancelBooking, createUser, getAllFav, toFav} from '../controllers/userController.js';
const router = express.Router();

router.post("/register", createUser);
router.post("/bookvisit/:id", bookVisit);
router.get("/allBookings", allBookings);
router.post("/removeBooking/:id", cancelBooking )
router.post("/toFav/:rid", toFav)
router.get("/allFav", getAllFav)
export {router as userRoute}
