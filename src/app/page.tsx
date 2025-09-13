'use client';
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [session, setSession] = useState<any>(null);

useEffect(() => {
  const getSessionUser = async () => {
  const session = await getSession()
  console.log("Session:", session);

  setSession(session);
}
getSessionUser();
},[])
  if (!session) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {session.user.firstName}</h1>
      <img src={session.user.avatar_url} alt="Profile" className="w-16 h-16 rounded-full" />
      <p>JWT Token: {session.accessToken}</p>
    </div>
  );
}
