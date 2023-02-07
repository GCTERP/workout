import express from "express";

import { getSomething, postSomething } from "../controllers/ExampleController.js"

const router = express.Router()

// GET: Something
router.get('/', getSomething)

// POST: Something
router.post('/', postSomething)

export default router;