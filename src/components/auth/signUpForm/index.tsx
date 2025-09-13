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
      const router=useRouter()
        const onSubmit = async (e: React.FormEvent) => {
          e.preventDefault()
           setError(null)
        const res = await signUpUser({firstName:firstName,lastName:lastName,email:email,password:password})
        if (res?.error) {
          setError("error signing up")
          console.log("Error:", res.message)
        } else {
          console.log(res.message)
          // Step 2: Automatically sign the user in using credentials provider
            const signInResponse = await signIn("credentials", {
                redirect: false,
                email: email,
                password: password,
            });

            if (signInResponse?.error) {
                setError("Failed to sign in after signup");
                console.log("SignIn Error:", signInResponse.error);
                return;
            }
          router.push('/')
        }
        }
  return (
  <form className="flex flex-col mt-3 gap-2" onSubmit={onSubmit}>
    <h4 className="font-semibold mt-2">
        first Name
    </h4>
    <input type="text" 
    value={firstName}
    onChange={(e)=> setFirstName(e.target.value)}
    placeholder="firstName" 
    className="bg-white p-2 rounded-lg focus:border-amber-800 focus:ring-1"/>
    <h4 className="font-semibold mt-2">
        last Name
    </h4>
    <input type="text" 
    value={lastName}
    onChange={(e)=> setLastName(e.target.value)}
    placeholder="lastName" 
    className="bg-white p-2 rounded-lg focus:border-amber-800 focus:ring-1"/>
    
    <h4 className="font-semibold mt-2">
        Email
    </h4>
    <input type="email" 
    value={email}
    onChange={(e)=> setEmail(e.target.value)}
    placeholder="you@example.com" 
    className="bg-white p-2 rounded-lg focus:border-amber-800 focus:ring-1"/>
    <h4 className="font-semibold mt-2">
        Password
    </h4>
    <input type="password" 
    onChange={(e)=> setPassword(e.target.value)}
    value={password}
    placeholder="Your password"
    className="bg-white p-2 rounded-lg focus:border-none focus:border-amber-800 focus:ring-1"/>
    <button 
        type="submit"
        className="bg-amber-600 cursor-pointer text-white p-2 rounded-lg mt-3 w-full hover:bg-amber-500">
        create account
    </button>
    {error && <p className="text-red-500 mt-2">{error}</p>}
    
  </form>)
}