import { getSession } from "@/db/getSession";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import crypto from "crypto"

const prisma = new PrismaClient()


const hashPassword = (password: string, salt: string): string => {
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512");
  return `${salt}:${hash.toString("hex")}`;
};


// Helper function to generate a random salt
const generateSalt = (): string => {
  return crypto.randomBytes(16).toString("hex");
};



export const POST = async (request: Request) => {
  try {
    // Get the email and password from the request body
    const { email, password } = await request.json();

    // Validate input fields
    if (!email || !password) {
      return NextResponse.json(
        { msg: "Email and password are required." },
        { status: 400 }
      );
    }

    // Check if the email already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { msg: "Email is already taken." },
        { status: 409 }
      );
    }

    // Generate a salt and hash the password
    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);

    // Create a new admin in the database
    const newAdmin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword, // Store salt and hash together
      },
    });

    // Return a success response
    return NextResponse.json(
      {
        msg: "Admin registered successfully.",
        admin: {
          id: newAdmin.id,
          email: newAdmin.email,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ msg: `There was an error: ${error.message}` });
    } else {
      return NextResponse.json({ msg: "An unknown error occurred" });
    }
  }
};



export const GET = async() => {

    
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


        
    } catch (error: unknown) {
      if (error instanceof Error) {
        return NextResponse.json({ msg: `There was an error: ${error.message}` });
      } else {
        return NextResponse.json({ msg: 'An unknown error occurred' });
      }
    }
    

    
   
   

}