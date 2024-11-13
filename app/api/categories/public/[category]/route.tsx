import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server"


const prisma = new PrismaClient()


export const GET = async(request: Request, { params }: { params: { category: string } }) => {

    try {

        const { category } = params; 


        if(!category) {
            return NextResponse.json({msg: "there was no id provided"})
        }

        
        const catItem = await prisma.category.findUnique({where: {id: category}})
        
        
                                                                              
        return NextResponse.json(catItem)






        
    } catch (error: any) {

        return NextResponse.json({msg: `there was a problem ${error}`})
        
    }

}

