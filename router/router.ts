import { Router } from "https://deno.land/x/oak/mod.ts";
import { authLogin, home } from "../controllers/authController.ts";
import authMiddleware from "../utils/authMiddleware.ts";

const router = new Router();

router.post("/api/v1/login", authLogin);
router.get("/api/v1/home", authMiddleware, home);

export default router;
