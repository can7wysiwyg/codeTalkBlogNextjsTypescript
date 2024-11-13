import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"


 const prisma = new PrismaClient() 

export const GET = async(request: Request, {params} : {params: {article: string}}) => {

    try {

        const {article} = params


        
  const articleSingle = await prisma.article.findUnique({where: {id: article}})
  

  return NextResponse.json(articleSingle)

        
    } catch (error) {
        return NextResponse.json({msg: `there was an error: ${error}`})
    }

}