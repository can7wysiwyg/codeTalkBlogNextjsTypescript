import { v2 as cloudinary } from 'cloudinary';
import { getSession } from "@/db/getSession";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { Readable } from 'stream';

const prisma = new PrismaClient()


// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Helper to convert Web ReadableStream to Node.js Readable stream
function webReadableStreamToNodeReadable(webStream: ReadableStream) {
    const reader = webStream.getReader();
    return new Readable({
        async read() {
            const { done, value } = await reader.read();
            if (done) {
                this.push(null);  // Signals end of the stream
            } else {
                this.push(Buffer.from(value));  // Push the chunk into the Node.js readable stream
            }
        }
    });
}


export const PATCH = async (request: Request, { params }: { params: { photo: string } }) => {
    try {
      const session = await getSession();
  
      if (!session) {
        return NextResponse.json({ msg: "You are not authenticated" });
      }
  
      const sessEmail = session?.user?.email;
      if (!sessEmail) {
        return NextResponse.json({ msg: "There was a problem with the email" });
      }
  
      const adminExists = await prisma.admin.findUnique({
        where: { email: sessEmail },
        select: { password: true, adminRole: true },
      });
  
      if (adminExists?.adminRole !== "cockney") {
        return NextResponse.json({ msg: "Authorization error" });
      }
  
      const formData = await request.formData();
      const imageFile = formData.get("image") as File;
  
      if (!imageFile) {
        return NextResponse.json({ msg: "No image file provided" });
      }
  
      // Convert the Web File stream to Node.js Readable stream
      const imageStream = webReadableStreamToNodeReadable(imageFile.stream());
  
      // Upload the image to Cloudinary
      const uploadPromise = new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "your_folder_name" },
          (error, result) => {
            if (error || !result) {
              reject(error || new Error("Upload failed"));
            } else {
              resolve(result.secure_url); // Cloudinary URL
            }
          }
        );
  
        imageStream.pipe(uploadStream);
      });
  
      const cloudinaryUrl = await uploadPromise;
  
      // Update the photo in the database
       await prisma.article.update({
        where: { id: params.photo },
        data: { articleImage: cloudinaryUrl },
      });
  
      return NextResponse.json({
        msg: "Photo updated successfully"
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return NextResponse.json({ msg: `There was an error: ${error.message}` });
      } else {
        return NextResponse.json({ msg: 'An unknown error occurred' });
      }
    }
    
  };
  
