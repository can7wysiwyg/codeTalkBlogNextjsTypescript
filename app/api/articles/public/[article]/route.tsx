import connect from "@/db/db"
import { Article } from "@/db/models/Article"
import { NextResponse } from "next/server"

export const GET = async(request: Request, {params} : {params: {article: string}}) => {

    try {

        const {article} = params


        await connect()
  const articleSingle = await Article.findById({_id: article})

  return NextResponse.json(articleSingle)

        
    } catch (error) {
        return NextResponse.json({msg: `there was an error: ${error}`})
    }

}