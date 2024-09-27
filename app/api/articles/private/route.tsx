import { v2 as cloudinary } from 'cloudinary';
import connect from "@/db/db";
import { getSession } from "@/db/getSession";
import { Article } from "@/db/models/Article";
import { NextResponse } from "next/server";
import { Readable } from 'stream';

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
        const uploadResponse = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'articles', resource_type: 'image' },  // Optional Cloudinary settings
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);  // This is where you'll get the `secure_url`
                    }
                }
            );

            // Pipe the converted Node.js readable stream to Cloudinary
            nodeReadableStream.pipe(uploadStream);
        });

        // Connect to MongoDB
        await connect();

        // Get other form data
        const articleTitle = formData.get('title') as string;
        const articleCategory = formData.get('category') as string;
        const articleText = formData.get('text') as string;

        // Create a new article document in MongoDB with the image URL from Cloudinary
        const newArticle = await Article.create({
            articleTitle,
            articleImage: (uploadResponse as any).secure_url,  // Get the Cloudinary URL here
            articleCategory,
            articleText
        });

        return NextResponse.json({ msg: "Article created successfully", article: newArticle });
    } catch (error: any) {
        return NextResponse.json({ msg: `There was a problem: ${error.message}` });
    }
};
