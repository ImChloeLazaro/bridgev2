"use client"
import { useSession, signIn, signOut } from "next-auth/react"

const GoogleOAuth = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}

export default GoogleOAuth;