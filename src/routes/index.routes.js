import { Router } from "express"
import userRoutes from "./user.routes.js"
import walletRoutes from "./wallet.routes.js"

const router = Router()
router.use(userRoutes)
router.use(walletRoutes)

export default router
