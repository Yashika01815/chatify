// src/routes/auth.route.js
import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js'; // Adjust the path based on your project structure

import { checkAuth, signupController, loginController, logoutController, updateProfileController  } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);

router.put("/update-profile",protectRoute, updateProfileController);
router.get("/check", protectRoute, checkAuth);

export default router;
