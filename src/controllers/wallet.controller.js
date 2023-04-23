import { db } from "../database/database.connection.js"
import dayjs from "dayjs"

export async function addOperations(req, res) {
    const { value, description } = req.body
    const { tipo } = req.params
    const date = dayjs().format('DD/MM/YYYY');

    try {
        const sessions = res.locals.sessao;
        const newOperation = { value, description, type: tipo, date, userID: sessions.userID};
        console.log(newOperation)
        await db.collection("operations").insertOne(newOperation)
        res.sendStatus(201)
        
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function showOperations(req, res) {
    try {
        const sessions = res.locals.sessao;
        const operations = await db.collection("operations").find({userID: sessions.userID}).toArray()
        const operationsReverse = operations.reverse()
        console.log(operationsReverse)
        res.send(operationsReverse)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

