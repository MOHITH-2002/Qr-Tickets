
import React from 'react'
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { Button } from '../ui/button';
import {  QrCode } from 'lucide-react';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Accountdialog from './account';
import { HistoryIcon } from '../_created-components/recent-dialog';

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
      <div className="flex w-full h-16 justify-between items-center bg-background px-3 md:px-6 border-b border-border">
          <div className="flex gap-2 items-center">
            <div className="flex">
              <QrCode strokeWidth={2.25} size={40} className="text-primary" />
            </div>
            <h1 className='font-bold text-2xl text-foreground'>
              Qr-Tickets
            </h1>
          </div>
          <div className='flex gap-2'>
            <Link href="/my-tickets" className='hidden md:flex'>
              <Button className=' text-secondary-foreground' variant='outline' >
                <HistoryIcon/>
                <h1 className="hidden sm:flex">My Bookings</h1>
              </Button>
            </Link>
            <Link href="/my-tickets" className='md:hidden flex'>
              <Button className=' text-secondary-foreground rounded-full ' variant='outline' size='icon' >
                <HistoryIcon/>
                
              </Button>
            </Link>
            <Accountdialog username={session?.user.name}/>
          </div>
      </div>
    )
}

export default Navbar

