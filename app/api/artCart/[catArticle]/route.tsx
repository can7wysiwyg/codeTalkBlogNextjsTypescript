import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export const GET = async(request: Request, {params}: {params: {catArticle: string}}) => {

    try {

        const {catArticle} = params

        
        const articles = await prisma.article.findMany({where: {articleCategoryId: catArticle}})
        
        
        return NextResponse.json(articles)
        
    } catch (error: unknown) {
        if (error instanceof Error) {
          return NextResponse.json({ msg: `There was an error: ${error.message}` });
        } else {
          return NextResponse.json({ msg: 'An unknown error occurred' });
        }
      }
      


}