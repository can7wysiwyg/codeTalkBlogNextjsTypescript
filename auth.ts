import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import crypto from "crypto";


import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()




const verifyPassword = (password: string, storedHash: string): boolean => {
  const [salt, originalHash] = storedHash.split(":"); // Extract salt and hash
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return hash === originalHash; // Compare hashes
};






 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"}
      },

      authorize: async(credentials) => {
        const email = credentials.email as string 
        const password = credentials.password as string 


        
        const user = await prisma.admin.findUnique({
          where: {
            email,
          },
          select: {
            password: true, // Select password field
            adminRole: true, // Select adminRole field
            email: true,
            id: true,
          },
        });
    
        
        

        if (!user) {
          throw new Error("Invalid email or password.");
        }
    
        if (!user.password) {
          throw new Error("Password not set for this user.");
        }
    
        // Verify the password
        const isMatch = verifyPassword(password, user.password);
    
        if (!isMatch) {
          throw new Error("Wrong password.");
        }
    
        // Prepare user data for return
        const userData = {
          email: user.email,
          role: user.adminRole,
          id: user.id,
        };
    



        

        return userData
      }

      
    })

    
  ],

  pages: {
    signIn: '/autho'
  },

  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token
        token.id = user?.id
      }
      return token
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  

    signIn: async({user, account}) => {

      if(account?.provider === 'credentials') {

        return true


      } else {

        return false

      }

    }
  }
})


export const config = {
  runtime: "nodejs",
  unstable_allowDynamic: [
      
      "/db/db.ts",
      // Allows dynamic imports for all Mongoose modules
      "/node_modules/mongoose/dist/**",
  ],
};
