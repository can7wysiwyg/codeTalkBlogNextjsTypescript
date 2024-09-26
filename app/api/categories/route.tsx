import connect from "@/db/db"
import { getSession } from "@/db/getSession"
import { Category } from "@/db/models/Category"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"


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

        await connect()

        await Category.create({
            catName
        }) 

        

        return NextResponse.json({msg: "successfully created"})

        


        
    } catch (error: any) {

        return NextResponse.json({msg: `there was an error ${error}`})
        
    }

   
}
