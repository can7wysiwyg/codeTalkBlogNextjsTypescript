import connect from "@/db/db"
import { Article } from "@/db/models/Article"
import { NextResponse } from "next/server"

export const GET = async(request: Request, {params}: {params: {catArticle: string}}) => {

    try {

        const {catArticle} = params

        

        await connect()

        const articles = await Article.find({articleCategory: catArticle})

        return NextResponse.json(articles)
        
    } catch (error: any) {

        return NextResponse.json({msg: `there was an error ${error}`})
        
    }


}