import connect from "@/db/db";
import { getSession } from "@/db/getSession";
import { Admin } from "@/db/models/Admin";
import { NextResponse } from "next/server";

export const GET = async(request: Request) => {

    
    try {

        const session = await getSession()

    if(!session) {
        return NextResponse.json({msg: "you are not authenticated"})
    }




    const id = session?.user?.id   


    if(!id) {
        return  NextResponse.json({msg: "the id is invalid"})
    } 

     await connect()

     const adminFound = await Admin.findById({_id: id})




     return NextResponse.json(JSON.stringify(adminFound), { status: 200 });


        
    } catch (error: any) {

        return NextResponse.json({msg: `there was a problem ${error}`})
        
    }

    
   
   

}