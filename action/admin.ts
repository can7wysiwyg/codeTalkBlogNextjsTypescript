'use server'

import { redirect } from "next/navigation"
import { signIn } from "@/auth"

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
      password,
    })

    if (!result?.error) {
      redirect('/')
    }

    return { error: result?.error || "Authentication failed" }
  } catch (error) {
    return { error: "An unexpected error occurred" }
  }
}