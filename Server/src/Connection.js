import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config({path: '../../.env'})

mongoose.set('strictQuery', true)

const uri = process.env.URI_DB
const db = mongoose.connection

export function connect(){
    try {
        const db = mongoose.connect(uri)
        console.log("connected with ", db.connection.name)
    } catch (error) {
        console.error(error)
    }
}

db.once('open', _ => {
    console.log("database connected with: " + uri)
})

db.on('error', err => {
    console.log(err)
})