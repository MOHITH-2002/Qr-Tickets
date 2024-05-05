"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { getSpecificUserTickets} from '@/lib/actions/getTickets';
import Ticket from '@/types';
import moment from 'moment';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Recent from './recents';
import Loader from '../loading';
import { RecentDialog } from './recent-dialog';


const Profile = () => {
    const [tickets, setTickets] = useState<Ticket[] | any >([]);
    const [error, setError] = useState<string | null>(null);
    const [loading,setLoading] = useState<boolean>(false);

    useEffect(() => {
        handleTicket();
    },[])

    const handleTicket = async () => {
        try {
            setLoading(true);
            const res = await getSpecificUserTickets();
            setTickets(res);
            setLoading(false);    
        } catch (err) {
            setError('An error occurred while fetching tickets.');
        }
    };
    
    if(tickets.error !== undefined  || tickets.error === 'No Tickets Found!') {
return (
     <div className='flex items-center flex-col gap-3 justify-center w-full h-screen lg:w-[500px] lg:h-[500px]'>
                                    <h1>No tickets found!</h1>

                                    <Link href="/"> <Button>BuyTickets</Button></Link>
    </div>
)
    }
    const today = moment().format('YYYY-MM-DD');
    const filteredTickets = tickets && tickets?.filter((ticket: any) => moment(ticket.bookingTime).format('YYYY-MM-DD') === today);

    if(loading === true ){
        return (
            <div className="flex h-screen w-full justify-center items-center">
                <Loader/>
            </div>
        );
    }
    


    return (
        <>  
            <div className="pt-5 px-3 md:pt-8 md:px-6">
                <div className='flex items-center justify-between'>
                    <div className='flex  gap-4'>

                    <Link href="/">
                        <Button className="rounded-full" size="icon">
                            <ArrowLeft />
                        </Button>
                    </Link>
                    <h1 className='font-bold text-3xl'> My Tickets</h1>
                    </div>
                    <div className='flex lg:hidden'>

                    <RecentDialog tickets={tickets}/>
                    </div>

                
                </div>
                <div className='flex ml-12 mt-4'>
                    <h1 className='font-bold text-xl'> Todays Ticket</h1>
                </div>
            </div>
            <div className='flex '>
                <div className="flex w-full px-2 sm:px-5  lg:ml-10 lg:flex-auto lg:w-64">
                    <Carousel className="w-full">
                        <CarouselContent >
                            {filteredTickets  && loading === false && filteredTickets?.length > 0 ? ( filteredTickets.map((ticket: any) =>(
                                <CarouselItem key={ticket._id}>
                                    <div className="p-1">
                                        <Card id='content-id'>
                                            <CardHeader className="bg-slate-50 rounded-lg">
                                                <div className="flex items-center gap-3 justify-center">
                                                    <h1 className="font-serif font-semibold text-lg truncate">{ticket.source}</h1>
                                                    <span className="w-[10px] h-[3px] bg-black"/>
                                                    <h1 className="font-serif font-semibold text-lg truncate">{ticket.destination}</h1>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
                                                <div className='grid grid-cols-2 gap-4'>
                                                    <div className='flex flex-col'>
                                                        <span className='text-muted-foreground truncate'>Booking Host:</span>
                                                        <h1 className='font-semibold'>{ticket.name}</h1>
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <span className='text-muted-foreground truncate'>Booking Time:</span>
                                                        <h1 className='font-semibold'>{moment(ticket.bookingTime).format('LT')} </h1>
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <span className='text-muted-foreground truncate'>Passengers:</span>
                                                        <h1 className='font-semibold'>{ticket?.passengers}</h1>
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <span className='text-muted-foreground truncate'>Total Amount:</span>
                                                        <h1 className='font-bold text-emerald-700'>₹ {ticket.totalAmount}</h1>
                                                    </div>
                                                </div>
                                                <Image src={ticket.qrImage} alt="ticket" width="300" height="100"/>
                                                <div className='flex gap-1 flex-col'>
                                                    <span className='text-muted-foreground text-center'>Ticket Id:</span>
                                                    <span className=' truncate text-center'>{ticket._id}</span>
                                                </div>
                                            </CardContent>
                                            <CardFooter className='flex flex-col bg-slate-50 '>
                                                <h1 className='font-semibold text-lg text-red-600'>⚠️ WARNING </h1>
                                                <h1 className='text-justify'>Your ticket will expire today at 11:59 pm.</h1>
                                            </CardFooter>
                                            
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))):(
                                <div className='flex items-center flex-col gap-3 justify-center w-full h-screen lg:w-[500px] lg:h-[500px]'>
                                    <h1>No Purchased Today</h1>

                                    <Link href="/"> <Button>BuyTickets</Button></Link>
                                </div>
                            )}
                        </CarouselContent>
                        <CarouselPrevious className='hidden lg:flex'/>
                        <CarouselNext className='hidden lg:flex'/>
                    </Carousel>
                </div>
                <div className='hidden lg:flex  lg:flex-auto lg:mx-10 rounded-xl border-2 bg-white lg:w-28'>
                    <Recent tickets={tickets} loading={loading}/>
                </div>            
            </div>            
        </>
    );
};
export default Profile;
