import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export const GET = async() => {

    try {

        const categories = await prisma.category.findMany({
            orderBy: {
              id: 'asc'  
            } });
          
        
        
        return NextResponse.json(categories)
        
    } catch (error: unknown) {
        if (error instanceof Error) {
          return NextResponse.json({ msg: `There was an error: ${error.message}` });
        } else {
          return NextResponse.json({ msg: 'An unknown error occurred' });
        }
      }
      

}