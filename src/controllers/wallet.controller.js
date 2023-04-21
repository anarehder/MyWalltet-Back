import { db } from "../database/database.connection.js"
import { ObjectId } from "mongodb"

export async function showOperations(req, res) {
    try {
        res.send(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function addOperations(req, res) {
    try {
        res.send(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}