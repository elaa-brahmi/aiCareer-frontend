import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import WithAuth from '@/components/landingPage/withAuth';
import WithoutAuth from '@/components/landingPage/withoutAuth';

const  Dashboard= async() => {
   const session = await getServerSession(authOptions);
   console.log('server session', session)


  return session?.user ? (
    <WithAuth user={session.user} />
  ) : (
    <WithoutAuth />
  );
}
export default Dashboard
