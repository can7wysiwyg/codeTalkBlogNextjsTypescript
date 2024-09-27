import connect from "@/db/db"
import { getSession } from "@/db/getSession"
import { Admin } from "@/db/models/Admin"
import { Category } from "@/db/models/Category"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"


export const PATCH = async(request: Request, {params}: {params: {category: string}}) => {

    try {

        const session = await getSession()
        const body = await request.json()
        const{category} = params

        const {catName} = body


       

         if(!session) {  


            return NextResponse.json({msg: "you are not authenticated"})
}

const sessEmail = session?.user?.email



if(!sessEmail) {
    return NextResponse.json({msg: "there was a problem with the email"})
}


await connect()

const adminExists = await Admin.findOne({email: sessEmail})




if(adminExists.adminRole !== "cockney")  {
    
    return NextResponse.json({msg: "authorization error"})
    
}


await Category.findByIdAndUpdate({_id: category}, {catName}, {new: true})


return NextResponse.json({msg: "successfully updated"})





        
    } catch (error: any) {

        return NextResponse.json({msg: `there was  a problem ${error}`})
        
    }




}