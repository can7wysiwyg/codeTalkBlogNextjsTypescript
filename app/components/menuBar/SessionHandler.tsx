"use client"

import { useSession } from "next-auth/react"
import Logout from "./authlogic/Logout"

export default function SessionHandler() {
  const { status } = useSession()

  if (status === "loading") {
    return null
  }

  return (
    <li className="nav-item">
      {status === "authenticated" && <Logout />}
    </li>
  )
}