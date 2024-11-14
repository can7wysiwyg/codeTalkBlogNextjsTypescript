import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export const GET = async(request: Request, {params}: {params: {catArticle: string}}) => {

    try {

        const {catArticle} = params

        
        const articles = await prisma.article.findMany({where: {articleCategoryId: catArticle}})
        
        
        return NextResponse.json(articles)
        
    } catch (error: any) {

        return NextResponse.json({msg: `there was an error ${error}`})
        
    }


}