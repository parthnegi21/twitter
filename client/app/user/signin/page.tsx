"use client"

import { signin } from "@/app/api/user/signin/actions"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Signin() {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter();

  const handleSignin = async () => {
    setError("")
    const response = await signin(identifier, password)

    if (response.token) {
      localStorage.setItem("token", response.token)
      router.push("/home")
    } else {
      setError(response.msg ?? "Sign in failed")
    }
  }

  return (
    <>
      <div className="md:flex justify-center items-center w-full h-screen md:bg-gray-900">
        <div className="shadow-xl md:w-8/12 lg:w-6/12 xl:w-4/12 md:h-4/5 md:rounded-2xl w-full h-screen bg-black">
          <div className="text-5xl text-white text-center font-bold pt-4">Q</div>
          <div className="text-3xl text-white font-semibold pt-12 pl-8">Sign in to Q</div>
          <div className="flex justify-center">
            <input
              className="bg-black border rounded w-10/12 h-16 mt-6 hover text-white text-xl pl-4"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Username or email"
            />
          </div>

          <div className="flex justify-center">
            <input
              className="bg-black border rounded w-10/12 h-16 md:mt-6 mt-10 hover text-white text-xl pl-4"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          {error && (
            <div className="text-red-500 text-center mt-4">{error}</div>
          )}

          <div className="flex justify-center md:mt-40 mt-60">
            <button
              onClick={handleSignin}
              className="bg-white w-9/12 h-12 rounded-3xl text-2xl font-semibold"
            >
              Next
            </button>
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={() => signIn("google", { callbackUrl: "http://localhost:3000/user/oauth-callback" })}
              className="bg-white w-9/12 h-12 rounded-3xl text-2xl font-semibold"
            >
              Continue with Google
            </button>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={() => signIn("github", { callbackUrl: "http://localhost:3000/user/oauth-callback" })}
              className="bg-white w-9/12 h-12 rounded-3xl text-2xl font-semibold"
            >
              Continue with GitHub
            </button>
          </div>

          <div className="flex justify-center mt-4">
            <button className="text-white border w-9/12 h-12 rounded-3xl text-2xl font-semibold">
              Forgot Password?
            </button>
          </div>

          <div className="justify-center mt-4 flex">
            <div className="text-white text-lg">Don&apos;t have an Account</div>
            <div
              onClick={() => router.push("/user/signup")}
              className="text-blue-500 text-lg ml-2 hover:underline hover:cursor-pointer"
            >
              Signup
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
