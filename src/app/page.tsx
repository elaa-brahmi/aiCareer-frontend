'use client';
import WithoutAuth from '@/components/landingPage/withoutAuth';
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react';

export default function Dashboard() {
  return (
    <WithoutAuth />
  )
}
