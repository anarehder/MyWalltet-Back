import { db } from "../database/database.connection.js"
import { ObjectId } from "mongodb"

export async function signin(req, res) {
    try {
        res.send(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function signout(req, res) {
    try {
        res.send(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function logout(req, res) {
    try {
        res.send(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}