import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"


 const prisma = new PrismaClient() 

export const GET = async(request: Request, {params} : {params: {article: string}}) => {

    try {

        const {article} = params


        
  const articleSingle = await prisma.article.findUnique({where: {id: article}})
  

  return NextResponse.json(articleSingle)

        
    } catch (error: unknown) {
        if (error instanceof Error) {
          return NextResponse.json({ msg: `There was an error: ${error.message}` });
        } else {
          return NextResponse.json({ msg: 'An unknown error occurred' });
        }
      }
      

}