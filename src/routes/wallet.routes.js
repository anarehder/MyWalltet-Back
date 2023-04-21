import { Router } from "express"
import { showOperations, addOperations } from "../controllers/wallet.controller.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { walletSchema } from "../schemas/wallet.schema.js"


const walletRoutes = Router()

walletRoutes.post("/nova-transacao/:tipo", validateSchema(walletSchema), addOperations)
walletRoutes.post("/home", showOperations)

export default walletRoutes