"use client"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router=useRouter()
    const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
       setError(null)
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })
    if (res?.error) {
      setError("Invalid email or password")
      //console.log("Error:", res.error)
    } else {
      //console.log(res)
      router.push('/')
    }
    }
  return (
      
  <form  className="flex flex-col mt-3" onSubmit={onSubmit}>
    <h4 className="font-semibold mb-1">
        Email
    </h4>
    <input type="email" 
    onChange={(e) => setEmail(e.target.value)}
    value={email}
    required
    placeholder="you@example.com" 
    className="bg-white p-2 rounded-lg focus:border-amber-800 focus:ring-1"/>
    <h4 className="font-semibold mb-1 mt-2">
        Password
    </h4>
    <input type="password" 
    onChange={(e) => setPassword(e.target.value)}
    value={password}
    required
    placeholder="Your password"
    className="bg-white p-2 rounded-lg focus:border-none focus:border-amber-800 focus:ring-1"/>
    <button className="bg-amber-600 cursor-pointer text-white p-2 rounded-lg mt-3 w-full hover:bg-amber-500" type="submit">
        Sign in
    </button>
    {error && <p className="text-red-500 mt-2">{error}</p>}
  </form>)
}