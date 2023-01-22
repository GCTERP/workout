import express from "express";

import { getSomething } from "../controllers/ExampleController.js"

const router = express.Router()

// GET: Something
router.get('/', getSomething)

export default router;