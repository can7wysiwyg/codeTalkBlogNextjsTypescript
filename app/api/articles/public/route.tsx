
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export const GET = async(request: Request) => {

    try {

        
        const articles = await prisma.article.findMany()

        return NextResponse.json(articles)
        
    } catch (error: any) {

        return NextResponse.json({msg: `there was a problem in fetching articles ${error}`})

        
    }

}