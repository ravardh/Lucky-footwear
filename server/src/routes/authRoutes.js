import express from "express";
import {
  userRegister,
  userLogin,
  userLogout,
  //   userUpdate,
  //   userCurrent,
  //   userDelete,
} from "../controller/authController.js";

// import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", userRegister);

router.post("/login", userLogin);

router.get("/logout", userLogout);

// router.put("/update", userUpdate);

// router.get("/current", userCurrent);

// router.delete("/delete", userDelete);

export default router;
