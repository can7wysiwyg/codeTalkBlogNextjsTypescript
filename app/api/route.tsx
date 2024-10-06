import connect from "@/db/db";
import { getSession } from "@/db/getSession";
import { Admin } from "@/db/models/Admin";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ msg: "You are not authenticated" }, { status: 401 });
    }

    const id = session.user?.id;

    if (!id) {
      return NextResponse.json({ msg: "The ID is invalid" }, { status: 400 });
    }

    await connect();

    // Use .lean() to get plain JavaScript objects
    const adminFound = await Admin.findById(id).lean();

    if (!adminFound) {
      return NextResponse.json({ msg: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json(adminFound, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ msg: `There was a problem: ${error.message}` }, { status: 500 });
  }
};
