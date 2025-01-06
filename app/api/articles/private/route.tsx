import { v2 as cloudinary } from 'cloudinary';
import { getSession } from "@/db/getSession";
import { NextResponse } from "next/server";
import { Readable } from 'stream';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient



// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


interface UploadResponse {
    secure_url: string;  // Cloudinary URL for the uploaded image
    public_id: string;   // Public ID of the uploaded image (optional)
    format: string;      // Image format (optional)
  }
  

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

export const POST = async (request: Request) => {
    try {
        const session = await getSession();

        if (!session) {
            return NextResponse.json({ msg: "You are not authenticated" });
        }

        const sessEmail = session?.user?.email;
        if (!sessEmail) {
            return NextResponse.json({ msg: "There was a problem with the email" });
        }

        // Parse form data (including the image file)
        const formData = await request.formData();
        const imageFile = formData.get('image') as File;

        if (!imageFile) {
            return NextResponse.json({ msg: "No image file provided" });
        }

        // Convert Web ReadableStream to Node.js Readable
        const nodeReadableStream = webReadableStreamToNodeReadable(imageFile.stream());

        // Wrap Cloudinary upload_stream in a promise to handle the result
        // const uploadResponse: UploadResponse = await new Promise((resolve, reject) => {
        //     const uploadStream = cloudinary.uploader.upload_stream(
        //         { folder: 'articles', resource_type: 'image' },  // Optional Cloudinary settings
        //         (error, result) => {
        //             if (error) {
        //                 reject(error);
        //             } else {
        //                 resolve(result);  // This is where you'll get the `secure_url`
        //             }
        //         }
        //     );

        //     // Pipe the converted Node.js readable stream to Cloudinary
        //     nodeReadableStream.pipe(uploadStream);
        // });


        const uploadResponse: UploadResponse = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'articles', resource_type: 'image' }, // Optional Cloudinary settings
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else if (result) {
                        resolve(result); // Ensure result is defined before resolving
                    } else {
                        reject(new Error("Unexpected undefined result from Cloudinary upload."));
                    }
                }
            );
        
            // Pipe the converted Node.js readable stream to Cloudinary
            nodeReadableStream.pipe(uploadStream);
        });
        

        // Connect to MongoDB
        
        const adminExists = await prisma.admin.findUnique({
            where: {email: sessEmail}
        })
        


if(adminExists?.adminRole !== "cockney")  {
    
    return NextResponse.json({msg: "authorization error"})
    
}


        // Get other form data
        const articleTitle = formData.get('title') as string;
        const articleCategory = formData.get('category') as string;
        const articleText = formData.get('text') as string;


        if(!articleTitle) {
            return  NextResponse.json({msg: "there was a problem uploading the title"})
        }


        if(!articleCategory) {
            return  NextResponse.json({msg: "there was a problem uploading the article category"})
        }

        if(!articleText) {
            return  NextResponse.json({msg: "there was a problem uploading the article text"})
        }
          
        
        // Create a new article document in MongoDB with the image URL from Cloudinary
        const newArticle = await prisma.article.create({
            data: {
                articleTitle,
                articleImage: uploadResponse.secure_url,  // Get the Cloudinary URL here
                articleCategoryId: articleCategory,
                articleText
            }

        })
        
        
        
       
        

        return NextResponse.json({ msg: "Article created successfully", article: newArticle });
    } catch (error: unknown) {
        if (error instanceof Error) {
          return NextResponse.json({ msg: `There was an error: ${error.message}` });
        } else {
          return NextResponse.json({ msg: 'An unknown error occurred' });
        }
      }
      

    
};
