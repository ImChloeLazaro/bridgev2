"use client"
import { useSession, signIn, signOut } from "next-auth/react"

const GoogleOAuth = () => {
  const { data: session } = useSession()
  console.log("session: ", session);
  if (session) {
    return (
      <>
        <button className="bg-blue-500 p-1 m-1 text-slate-50 rounded-md" onClick={() => signOut()}> Signed in as {session.session.user.name}</button>
      </>
    )
  }
  return (
    <>
      <button className="bg-blue-500 p-1 m-1 text-slate-50 rounded-md" onClick={() => signIn("google")}>Connect to Google Services</button>
    </>
  )
}

export default GoogleOAuth;