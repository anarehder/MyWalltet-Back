import { Router } from "express"
import { signin, signup, logout } from "../controllers/user.controller.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { userSchema } from "../schemas/user.schema.js"


const userRoutes = Router()

userRoutes.post("/sign-up", validateSchema(userSchema), signup)
userRoutes.post("/sign-in", signin)
userRoutes.post("/sign-in", logout)

export default userRoutes