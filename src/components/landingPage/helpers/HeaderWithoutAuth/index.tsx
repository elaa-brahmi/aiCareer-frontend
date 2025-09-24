import Image from 'next/image'
import Link from 'next/link'
const HeaderWithoutAuth = () => {
    return (
        <div className="bg-white grid grid-cols-3 md:grid-cols-3 py-3 px-2">
            <div className="flex gap-2 w-full items-center justify-start md:ms-10 ms-3">
                <Image src="/octopus.png" width={50} height={50} alt="logo"/>
                <h1 className="font-bold">Ai Career</h1>

            </div>
            <div className="w-full flex items-center justify-center">
                <Link href="/pricing" className="cursor-pointer">pricing</Link>
            </div>
            <div className="flex w-full gap-3 items-center justify-end md:pe-10 pe-3">
                <Link href="/auth" className="bg-white border-none cursor-pointer md:font-bold text-black">Login</Link>
                <Link href="/auth" className="cursor-pointer bg-[var(--dark-amber)] rounded-md p-2 text-white md:font-bold" >Sign up</Link>


            </div>

        </div>
    )
}
export default HeaderWithoutAuth