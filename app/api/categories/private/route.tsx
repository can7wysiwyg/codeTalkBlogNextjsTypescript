import { getSession } from "@/db/getSession"
import { PrismaClient } from "@prisma/client"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"


const prisma = new PrismaClient()

export const POST = async(request: Request) => {
    try {
        const session = await getSession()
        

        if(!session) {
            return NextResponse.json({msg: "you are not authenticated"})
        }

        const body =  await request.json()
        const {catName} = body

        if(!catName) {

            return NextResponse.json({msg: "value cannot be empty"})

        }

        
        await prisma.category.create({ data: {catName} }) 

        

        return NextResponse.json({msg: "successfully created"})

        


        
    } catch (error: any) {

        return NextResponse.json({msg: `there was an error ${error}`})
        
    }

   
}
