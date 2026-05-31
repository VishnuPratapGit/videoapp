'use client'

import { useRouter } from "next/navigation";

type LogoProps = {
    title: string;
}

const Logo = ({ title }: LogoProps) => {
  const router = useRouter()
  return (
    <div onClick={()=>router.push('/')} className='font-bold font-mono text-2xl cursor-pointer'>{title}</div>
  )
}

export default Logo