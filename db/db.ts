'use server';


import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/codeTalk"; // Fallback

const connect = async () => {

    const connectionState = mongoose.connection.readyState


    if(connectionState === 1) {
        console.log("was already connected")
        return
    }

    if(connectionState === 2) {
        console.log("connecting....")

        return
    }


    try {
       await mongoose.connect(MONGODB_URI!, {

            dbName: "codeTalk",
            bufferCommands: true
        })
        console.log("connected to database")
    } catch (error: any) {

        console.log("Error", error)

        throw new Error("Error", error)
        
    }

}


export default connect