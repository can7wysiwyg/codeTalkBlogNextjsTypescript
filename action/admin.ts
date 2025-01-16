'use server'

import { signIn } from "@/auth"
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"

export async function LoginAdmin(formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')

  if (!email || typeof email !== 'string') {
    return { error: "Email field cannot be empty" }
  }

  if (!password || typeof password !== 'string') {
    return { error: "Password field cannot be empty" }
  }

  try {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password
    })

    if (result?.error) {
      return { error: "Invalid credentials" }
    }

    if (result?.ok) {
      redirect('/')
    }

    return { error: "Something went wrong" }
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Authentication failed" }
    }
    return { error: "An unexpected error occurred" }
  }
}