import React from 'react'

type LogoProps = {
    title: string;
}

const Logo = ({ title }: LogoProps) => {
  return (
    <div className='font-bold font-mono text-2xl'>{title}</div>
  )
}

export default Logo