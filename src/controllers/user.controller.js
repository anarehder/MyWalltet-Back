import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

export async function signup(req, res) {
    const { name, email, password } = req.body

    try {
        const usuario = await db.collection("users").findOne({ email })
        if (usuario) return res.status(409).send("E-mail já cadastrado.")

        const hash = bcrypt.hashSync(password, 10)

        await db.collection("users").insertOne({ name, email, password: hash })
        res.sendStatus(201)

    } catch (err) {
        res.sendStatus(500).send(err.message)
    }
}

export async function signin(req, res) {
    const { email, password } = req.body

    try {
        const user = await db.collection("users").findOne({ email })
        if (!user) return res.status(404).send("E-mail não cadastrado.")

        const checkPassword = bcrypt.compareSync(password, user.password)
        if (!checkPassword) return res.status(401).send("Senha incorreta")

        const token = uuid()
        await db.collection("sessoes").insertOne({ token, userID: user._id })
        res.send(token)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function logout(req, res) {
    try {
        const sessao = res.locals.sessao

        const result = await db.collection("sessoes").deleteOne({ userID: sessao.userID })

        if (result.deletedCount === 0) return res.status(404).send("Erro ao fazer logout!")
        res.send("O usuário fez logout!")

    } catch (err) {
        res.status(500).send(err.message)
    }
}