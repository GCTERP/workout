import express from "express";
import studentController from "../controllers/studentController.js";

const router = express.Router();

router.get('/request',studentController.getAllRequests);

router.post('/request',studentController.createRequest);

// router.put()
// router.delete()


export default router;