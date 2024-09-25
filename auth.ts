import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { Admin } from "./db/models/Admin"
import connect from "./db/db"





 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"}
      },

      authorize: async(credentials) => {
        const email = credentials.email as string || undefined
        const password = credentials.password as string || undefined


        if(!email || !password) {
          throw new CredentialsSignin("provide email and password")
        }


        await connect()

        const user = await Admin.findOne({email}).select("+password +adminRole")


        if(!user) {
          throw new Error( "invalid email or password")
        }

        if(!user.password) {

          throw new Error( "invalid password")

        }


        const isMatch = await compare(password, user.password)


        if(!isMatch) {

          throw new Error( "wrong password")

        }


        const userData = {
          // firstName: user.fullname,
          email: user.email,
          role: user.adminRole,
          id: user._id
        }
  




        

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