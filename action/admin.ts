// import { redirect } from "next/navigation";
// import { signIn } from "next-auth/react";

// const LoginAdmin = async (formData: FormData) => {
//     const email = formData.get('email') as string;
//     const password = formData.get('password') as string;

//     if (!email) {
//         throw new Error("Email field cannot be empty");
//     }

//     if (!password) {
//         throw new Error("Password field cannot be empty");
//     }

//     try {
//         const result = await signIn('credentials', {
//             redirect: false,
//             callbackUrl: '/',
//             email,
//             password,
//         });

//         if (result?.error) {
//             return { error: result.error };
//         }

//         // If successful, redirect
//         redirect('/');
//     } catch (error) {
//         return { error: "An error occurred during login" };
//     }
// };

// export { LoginAdmin };


'use server'

// import connect from "@/db/db"
import { redirect } from "next/navigation"
import { CredentialsSignin } from "next-auth"
import { signIn } from "@/auth"



const LoginAdmin = async(formData: FormData) => {

    const email = formData.get('email') as string
    const password = formData.get('password') as string 


    if(!email) throw new Error("email field cannot be empty")


 if(!password) throw new Error("password field cannot be empty")

    try {
         await signIn('credentials', {
            redirect: false,
            callbackUrl: '/',
            email,
            password
        });


        
        
    } catch (error: any) {

        const someError = error as CredentialsSignin

        return someError.cause
    
        
    }


//  await connect()



 redirect('/')
 
 
    




}


export {LoginAdmin}
