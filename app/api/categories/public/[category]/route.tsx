import connect from "@/db/db";
import { Category } from "@/db/models/Category";
import { NextResponse } from "next/server"

export const GET = async(request: Request, { params }: { params: { category: string } }) => {

    try {

        const { category } = params; 


        if(!category) {
            return NextResponse.json({msg: "there was no id provided"})
        }

        await connect()

        const catItem = await Category.findById({_id: category})

        return NextResponse.json(catItem)






        
    } catch (error: any) {

        return NextResponse.json({msg: `there was a problem ${error}`})
        
    }

}

