import { getSession } from "@/db/getSession";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient()


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

     
    const adminFound = await prisma.admin.findUnique({
        where: {
            id: id,  // Replace with actual admin ID
        },
        select: {
            password: true,
            adminRole: true
        }
    });
    



     return NextResponse.json(JSON.stringify(adminFound), { status: 200 });


        
    } catch (error: any) {

        return NextResponse.json({msg: `there was a problem ${error}`})
        
    }

    
   
   

}