import  express from 'express';
const router = express.Router();
import {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser
} from "../controllers/userRequest.js";

import {auth,hasRole} from "../middleware/auth.js"

router.get('/users',auth, hasRole("SuperAdmin","Admin","NormalUser","Manager"), getAllUsers);
router.get('/userbyid/:id',auth, hasRole("SuperAdmin","Admin","NormalUser","Manager"), getUserById);
router.delete('/deleteuser/:id',auth, hasRole("SuperAdmin","Admin",), deleteUser);
router.patch('/editusers/:id',auth, hasRole("SuperAdmin","Admin","NormalUser","Manager"), updateUser);

export default router;