import connect from "@/db/db"
import { Category } from "@/db/models/Category"
import { NextResponse } from "next/server"

export const GET = async(request: Request) => {

    try {

        await connect()

        const categories = await Category.find().sort({_id: -1})

        return NextResponse.json(categories)
        
    } catch (error: any) {

        return NextResponse.json({msg: `there was a problem ${error}`})
        
    }

}