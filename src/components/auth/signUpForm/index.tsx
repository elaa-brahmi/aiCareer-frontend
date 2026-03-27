"use client"
import { signUpUser } from "@/services/userServices"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { signIn } from "next-auth/react"

export default function SignInForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Validation function for the 4 requirements
  const isPasswordValid = (pass: string) => {
    const hasLength = pass.length >= 8;
    const hasUpper = /[A-Z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    return hasLength && hasUpper && hasNumber && hasSpecial;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // 1. Client-side check before calling the API
    if (!isPasswordValid(password)) {
      setError("the password is weak it need to have 8 characters, special character,number,uppercase letter")
      return;
    }

    const res = await signUpUser({ firstName, lastName, email, password })
    
    if (res?.error) {
      // 2. Use res.message (from your axios setup) instead of hardcoded string
      setError(res.message || "error signing up")
      console.log("Error:", res.message)
    } else {
      const signInResponse = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      if (signInResponse?.error) {
        setError("Failed to sign in after signup");
        return;
      }
      window.location.href = '/';
    }
  }

  return (
    <form className="flex flex-col mt-3 gap-2" onSubmit={onSubmit}>
      <h4 className="font-semibold mt-2">
        first Name
      </h4>
      <input type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="firstName"
        className="bg-white p-2 rounded-lg focus:border-amber-800 focus:ring-1 outline-none border border-transparent" />
      
      <h4 className="font-semibold mt-2">
        last Name
      </h4>
      <input type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="lastName"
        className="bg-white p-2 rounded-lg focus:border-amber-800 focus:ring-1 outline-none border border-transparent" />

      <h4 className="font-semibold mt-2">
        Email
      </h4>
      <input type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="bg-white p-2 rounded-lg focus:border-amber-800 focus:ring-1 outline-none border border-transparent" />
      
      <h4 className="font-semibold mt-2">
        Password
      </h4>
      <input type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Your password"
        className="bg-white p-2 rounded-lg focus:border-amber-800 focus:ring-1 outline-none border border-transparent" />
      
      <button
        type="submit"
        className="bg-amber-600 cursor-pointer text-white p-2 rounded-lg mt-3 w-full hover:bg-amber-500 transition-colors">
        create account
      </button>

      {error && <p className="text-red-500 mt-2 text-sm font-medium">{error}</p>}
    </form>
  )
}