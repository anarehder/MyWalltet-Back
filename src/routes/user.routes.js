import { Router } from "express"
import { signin, signup, logout } from "../controllers/user.controller.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { signInSchema, userSchema } from "../schemas/user.schema.js"
import { authValidation } from "../middlewares/auth.middleware.js"


const userRoutes = Router()

userRoutes.post("/cadastro", validateSchema(userSchema), signup)
userRoutes.post("/login", validateSchema(signInSchema), signin)
userRoutes.post("/logout", authValidation,logout)

export default userRoutes