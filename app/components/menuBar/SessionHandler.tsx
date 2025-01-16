"use client";

import Logout from "./authlogic/Logout";

interface SessionHandlerProps {
  session: any; // Replace `any` with your session's type if known
}

export default function SessionHandler({ session }: SessionHandlerProps) {
  return (
    <li className="nav-item">
      {session ? <Logout /> : ""}
    </li>
  );
}
