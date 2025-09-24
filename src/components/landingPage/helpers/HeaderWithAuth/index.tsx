"use client";

import { useState } from "react";
import { User } from "@/types/userType";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  user: User;
}

const HeaderWithAuth: React.FC<HeaderProps> = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter()

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="bg-white shadow-sm">
      <div className="grid grid-cols-3 items-center py-3 px-4 md:px-10">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Image className="cursor-pointer" onClick={() => router.push('/')} src="/octopus.png" width={50} height={50} alt="logo" />
          <h1 className="font-bold text-lg">Ai Career</h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center justify-center gap-6">
          <Link href="/" className="hover:text-[var(--dark-amber)]">
            Dashboard
          </Link>
          <Link href="/resume-upload" className="hover:text-[var(--dark-amber)]">
            Upload Resume
          </Link>
          <Link href="/cover-letter" className="hover:text-[var(--dark-amber)]">
            Cover Letter
          </Link>
          <Link href="/chat" className="hover:text-[var(--dark-amber)]">
            Chat
          </Link>
          <Link href="/pricing" className="hover:text-[var(--dark-amber)]">
            Pricing
          </Link>
        </nav>

        <div className="hidden md:flex items-center justify-end gap-5">
          <span className="text-black font-bold">
            <span className="text-xl text-[var(--dark-amber)]">Welcome</span>,{" "}
            {user.firstName} {user.lastName}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: "/auth" })}
            className="bg-[var(--dark-amber)] text-white font-bold rounded-md px-3 py-2 cursor-pointer hover:bg-opacity-90"
          >
            Log out
          </button>
        </div>

        {/* Mobile version */}
        <div className="flex md:hidden absolute end-2 justify-end">
          <button onClick={toggleMenu} className="text-black">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t animate-slideDown">
          <div className="flex flex-col space-y-4 p-4">
            <Link
              href="/"
              className="hover:text-[var(--dark-amber)]"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/resume-upload"
              className="hover:text-[var(--dark-amber)]"
              onClick={() => setIsMenuOpen(false)}
            >
              Upload Resume
            </Link>
            <Link
              href="/cover-letter"
              className="hover:text-[var(--dark-amber)]"
              onClick={() => setIsMenuOpen(false)}
            >
              Cover Letter
            </Link>
            <Link
              href="/chat"
              className="hover:text-[var(--dark-amber)]"
              onClick={() => setIsMenuOpen(false)}
            >
              Chat
            </Link>
            <Link
              href="/pricing"
              className="hover:text-[var(--dark-amber)]"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>

            {/* Mobile Welcome & Logout */}
            <div className="border-t pt-4 flex flex-col gap-3">
              <span className="text-black font-medium">
                Welcome, {user.firstName} {user.lastName}
              </span>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  signOut({ callbackUrl: "/auth" });
                }}
                className="bg-[var(--dark-amber)] text-white font-bold rounded-md px-3 py-2 hover:bg-opacity-90"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderWithAuth;
