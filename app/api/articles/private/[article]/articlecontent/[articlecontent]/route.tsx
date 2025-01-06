import { getSession } from "@/db/getSession";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export const PATCH = async(request: Request, {params}: {params: {articlecontent: string}}) => {

    try {

        const session = await getSession()

        const body = await request.json()

        const {articlecontent} = params

        const {articleText} = body


        if(!session) {  


            return NextResponse.json({msg: "you are not authenticated"})
}

const sessEmail = session?.user?.email



if(!sessEmail) {
    return NextResponse.json({msg: "there was a problem with the email"})
}



const adminExists = await prisma.admin.findUnique({
    where: {
        email: sessEmail
    },
    select: {
        password: true,
        adminRole: true
    }
})





if(adminExists?.adminRole !== "cockney")  {
    
    return NextResponse.json({msg: "authorization error"})
    
}


await prisma.article.update({where: {id: articlecontent}, data: {
    articleText
} })


return NextResponse.json({msg: "succesfully updated!!"})



        
    } catch (error: unknown) {
        if (error instanceof Error) {
          return NextResponse.json({ msg: `There was an error: ${error.message}` });
        } else {
          return NextResponse.json({ msg: 'An unknown error occurred' });
        }
      }
      


} 