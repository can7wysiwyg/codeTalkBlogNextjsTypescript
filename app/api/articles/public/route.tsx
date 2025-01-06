
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export const GET = async() => {

    try {

        
    const  articles = await prisma.article.findMany();

    // {
    //   orderBy: {
    //     createdAt: 'desc', 
    //   },
    // }

        return NextResponse.json(articles)
        
    } catch (error: unknown) {
        if (error instanceof Error) {
          return NextResponse.json({ msg: `There was an error: ${error.message}` });
        } else {
          return NextResponse.json({ msg: 'An unknown error occurred' });
        }
      }
      

}