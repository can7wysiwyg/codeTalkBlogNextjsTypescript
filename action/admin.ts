'use server'

import { redirect } from "next/navigation"
import { type CredentialsSignin } from "next-auth"
import { signIn } from "@/auth"

type LoginError = {
  type: string;
  message: string;
}

const LoginAdmin = async (formData: FormData) => {
  // Input validation
  const email = formData.get('email')
  const password = formData.get('password')

  if (!email || typeof email !== 'string') {
    throw new Error("Email field cannot be empty")
  }

  if (!password || typeof password !== 'string') {
    throw new Error("Password field cannot be empty")
  }

  try {
    const result = await signIn('credentials', {
      redirect: false,
      callbackUrl: '/',
      email,
      password
    })

    // If login is successful, redirect
    if (!result?.error) {
      redirect('/')
    }

    // If there's an error, return it
    return {
      type: 'error',
      message: result.error || 'Authentication failed'
    } as LoginError

  } catch (error) {
    // Type assertion for the error
    const authError = error as CredentialsSignin
    
    return {
      type: 'error',
      message: authError.cause?.toString() || 'An unexpected error occurred'
    } as LoginError
  }
}

export { LoginAdmin }