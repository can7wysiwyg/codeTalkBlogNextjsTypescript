import connect from "@/db/db"
import { Article } from "@/db/models/Article"
import { NextResponse } from "next/server"

export const GET = async(request: Request) => {

    try {

        await connect()

        const articles = await Article.find().sort({_id: -1})

        return NextResponse.json(articles)
        
    } catch (error: any) {

        return NextResponse.json({msg: `there was a problem in fetching articles ${error}`})

        
    }

}