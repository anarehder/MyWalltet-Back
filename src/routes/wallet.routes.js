import { Router } from "express"
import { showOperations, addOperations } from "../controllers/wallet.controller.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { walletSchema } from "../schemas/wallet.schema.js"
import { authValidation } from "../middlewares/auth.middleware.js"

const walletRoutes = Router()

walletRoutes.use(authValidation)

walletRoutes.post("/nova-transacao/:tipo", validateSchema(walletSchema), addOperations)
walletRoutes.get("/operations", showOperations)

export default walletRoutes