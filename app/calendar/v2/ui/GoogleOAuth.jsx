"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@nextui-org/react"
const GoogleOAuth = () => {
  const { data: session } = useSession()
  // console.log("session: ", session);
  if (session) {
    return (
      <>
        <Button className="bg-blue-500 p-1 m-1 text-slate-50 rounded-md" size="sm" onClick={() => signOut()}> Signed in as {session.session.user.name}</Button>
      </>
    )
  }
  return (
    <>
      <Button className="bg-blue-500 p-1 m-1 text-slate-50 rounded-md" onClick={() => signIn("google")}>Connect to Google Services</Button>
    </>
  )
}

export default GoogleOAuth;