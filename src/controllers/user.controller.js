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
        console.log(user);

        const checkPassword = bcrypt.compareSync(password, user.password)
        if (!checkPassword) return res.status(401).send("Senha incorreta")

        const token = uuid()
        await db.collection("sessions").insertOne({ token, userID: user._id })
        const resposta = {name: user.name, email: user.email, userID: user._id, token};
        console.log(resposta);
        res.send(resposta)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function logout(req, res) {
    try {
        const sessions = res.locals.sessao;
        console.log(sessions.token);

        const result = await db.collection("sessions").deleteOne({ token: sessions.token })

        if (result.deletedCount === 0) return res.status(404).send("Erro ao fazer logout!")

        res.send("O usuário fez logout!")

    } catch (err) {
        res.status(500).send(err.message)
    }
}