"use client"
import { User } from '@/types/userType'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
interface HeaderProps{
    user:User
}
const HeaderWithAuth : React.FC<HeaderProps> = ({user}) => {
    return (
        <div className="bg-white grid grid-cols-3 md:grid-cols-3 py-3 px-2">
            <div className="flex gap-2 w-full items-center justify-start md:ms-10 ms-3">
                <Image src="/octopus.png" width={50} height={50} alt="logo"/>
                <h1 className="font-bold">Ai Career</h1>

            </div>
            <div className="w-full flex items-center gap-3 justify-between">
                <Link href="/" className="cursor-pointer">Dashboard</Link>
                <Link href="/resume-upload" className="cursor-pointer">Upload Resume</Link>
                <Link href="/cover-letter" className="cursor-pointer">Cover Letter</Link>
                <Link href="/chat" className="cursor-pointer">Chat</Link>
                <Link href="/pricing" className="cursor-pointer">pricing</Link>


            </div>
            <div className="flex w-full gap-5 items-center justify-end md:pe-10 pe-3">
                <Link href="#" className="bg-white border-none cursor-pointer font-bold text-black"><span className="text-xl text-[var(--dark-amber)]">Welcome</span>, {' '}{user.firstName} {' '} {user?.lastName}</Link>
                <button  onClick={() => signOut({ callbackUrl: "/auth" })} 
                    className="cursor-pointer bg-[var(--dark-amber)] rounded-md p-2 text-white font-bold" >
                    log out
                </button>
            </div>
        </div>
    )
}
export default HeaderWithAuth