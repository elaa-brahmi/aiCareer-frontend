"use client"
import SignInForm from "@/components/auth/signInForm";
import SignUpForm from "@/components/auth/signUpForm";
import GithubIcon from "@/components/icons/githubIcon";
import GoogleIcon from "@/components/icons/googleIcon";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function authPage() {
    const [authLine, setAuthLine] = useState<'sign in to your account' | 'create your account'>('sign in to your account');
  return ( 
  <div className="flex justify-center items-center min-h-screen">
    <div className=" flex justify-center w-[90%] md:w-[80%] lg:w-[60%]  p-3  h-auto rounded-xl bg-gray-200">
    <div className="flex flex-col w-5/6 gap-3">
        <div className="flex gap-3">
            <Image src="/octopus.png" alt="Octopus" width={50} height={50}  />
            <h2 className="font-bold text-black text-xl mt-2">ai Career</h2>
        </div>
        <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-black text-lg">Welcome</h3>
            <p className="text-gray-500">{authLine}</p>
        </div>
        <div className="mt-2 bg-white/30 p-2 justify-between rounded-lg flex gap-2">
            <button className={`py-1 w-full rounded-lg cursor-pointer text-black ${authLine==='sign in to your account' && "bg-white"}`}
            onClick={() => setAuthLine('sign in to your account')}
            >Sign in</button>
            <button className={`py-1 w-full rounded-lg cursor-pointer text-black  ${authLine==='create your account' && "bg-white"}`}
            onClick={() => setAuthLine('create your account')}
            >Sign up</button>
        </div>
        {authLine === 'sign in to your account' ? <SignInForm /> : <SignUpForm />}
        <div className="flex flex-col mt-3">
            <div className="w-full h-[1px] bg-gray-300"></div>
            <p className="text-center text-gray-500 mt-2">or continue with</p>
            <div className="flex mx-auto gap-3 mt-3">
                <button className="bg-white p-3 rounded-lg cursor-pointer"
                onClick={() => signIn("google" , { callbackUrl: "/" })}
                ><GoogleIcon /></button>
                <button className="bg-white p-3 rounded-lg cursor-pointer"
                onClick={() => signIn("github" , { callbackUrl: "/" })}
                ><GithubIcon /></button>
            </div>
        </div>
    </div>
    </div>
  </div>)
}