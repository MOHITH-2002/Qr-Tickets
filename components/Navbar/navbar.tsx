// "use client"
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { Poppins } from "next/font/google";
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRightLeft, History } from 'lucide-react';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Accountdialog from './account';

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
const Navbar = async () => {
    const session = await auth();
    if(!session){
        return redirect("/auth/login")
    }

    

  return (
    <div className="flex w-full h-16 justify-between items-center bg-slate-100 px-3 md:px-6 ">
        <div className="flex gap-2 items-center">
		<div className="flex ">

      {/* <Image src="/logo.svg" alt="qrcode" width="70" height="70"/> */}
      <ArrowRightLeft strokeWidth={2.25} size={26} />
      
		</div>
      <h1 className={cn(
        " text-xl md:text-2xl font-semibold",
        font.className,
      )}>
        Qr-Tickets
      </h1>
        </div>
        <div className='flex gap-2'>

        <Link href="/my-tickets" className=''>
        <Button className={cn(" gap-2 hidden sm:flex")} variant="outline" >
        <History/>
        <h1 className=" hidden sm:flex">Recent Tickets</h1>
        </Button>
        <Button className={cn(" gap-2 flex rounded-full sm:hidden")} variant="outline" size="icon" >
        <History/>
        
        </Button>

        </Link>
        <Accountdialog/>

        </div>
    
    </div>
    )
}

export default Navbar
