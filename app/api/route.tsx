import { getSession } from "@/db/getSession";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient()


export const GET = async () => {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ msg: "You are not authenticated" }, { status: 401 });
    }

    const id = session.user?.id;

    if (!id) {
      return NextResponse.json({ msg: "The ID is invalid" }, { status: 400 });
    }

   
    // Use .lean() to get plain JavaScript objects
    const adminFound = await prisma.admin.findUnique({
      where: {
          id: id,  // Replace with actual admin ID
      },
      select: {
          password: true,
          adminRole: true
      }
  });
  
    
    if (!adminFound) {
      return NextResponse.json({ msg: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json(adminFound, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ msg: `There was an error: ${error.message}` });
    } else {
      return NextResponse.json({ msg: 'An unknown error occurred' });
    }
  }
  
};
