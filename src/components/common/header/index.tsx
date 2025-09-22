import HeaderWithoutAuth from '@/components/landingPage/helpers/HeaderWithoutAuth';
import HeaderWithAuth from '@/components/landingPage/helpers/HeaderWithAuth';
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Header = async() => {
  const session = await getServerSession(authOptions);
  return session?.user ? (
    <HeaderWithAuth user={session?.user} />)
    :( <HeaderWithoutAuth />)
}
export default Header
