import express from 'express'
import { login, signup, getAllUsers, deleteUser, updateProfile, updatePassword } from '../controllers/user.controller.js';
import verifyToken from '../middleware/auth.middleware.js';
import verifyAdmin from '../middleware/admin.middleware.js';

const router = express.Router();
router.post("/signup", signup)
router.post("/login", login)
router.get("/all", verifyToken, verifyAdmin, getAllUsers)
router.delete("/:id", verifyToken, verifyAdmin, deleteUser)
router.put("/profile", verifyToken, updateProfile)
router.put("/password", verifyToken, updatePassword)

export default router;