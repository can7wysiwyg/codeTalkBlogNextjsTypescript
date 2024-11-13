import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export const GET = async(request: Request) => {

    try {

        const categories = await prisma.category.findMany({
            orderBy: {
              id: 'asc'  
            } });
          
        
        
        return NextResponse.json(categories)
        
    } catch (error: any) {

        return NextResponse.json({msg: `there was a problem ${error}`})
        
    }

}