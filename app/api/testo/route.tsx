import { getSession } from "@/db/getSession";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"


const prisma = new PrismaClient()


export const POST = async (request: Request) => {
    try {
      // Get the email and password from the request body
      const { email, password } = await request.json();
  
      // Validate input fields
      if (!email || !password) {
        return NextResponse.json({ msg: "Email and password are required." }, { status: 400 });
      }
  
      // Check if the email already exists
      const existingAdmin = await prisma.admin.findUnique({
        where: { email },
      });
  
      if (existingAdmin) {
        return NextResponse.json({ msg: "Email is already taken." }, { status: 409 });
      }
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
  
      // Create a new admin in the database
      const newAdmin = await prisma.admin.create({
        data: {
          email,
          password: hashedPassword
        },
      });
  
      // Return a success response
      return NextResponse.json({
        msg: "Admin registered successfully.",
        admin: {
          id: newAdmin.id,
          email: newAdmin.email,
        },
      }, { status: 201 });
  
    } catch (error: any) {
      // Handle errors gracefully
      return NextResponse.json({ msg: `There was a problem: ${error.message}` }, { status: 500 });
    }
  };
  





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