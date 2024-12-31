"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { getSpecificUserTickets } from '@/lib/actions/getTickets';
import Ticket from '@/types';
import moment from 'moment';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import Image from 'next/image';
import Recent from './recents';
import Loader from '../loading';
import { RecentDialog } from './recent-dialog';

const Profile = () => {
  const [tickets, setTickets] = useState<Ticket[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleTicket();
  }, []);

  const handleTicket = async () => {
    try {
      setLoading(true);
      const res = await getSpecificUserTickets();
      setTickets(Array.isArray(res) ? res : []); // Ensure `tickets` is always an array
      setLoading(false);
    } catch (err) {
      setError('An error occurred while fetching tickets.');
      setLoading(false);
    }
  };

  const today = moment().format('YYYY-MM-DD');
  const filteredTickets =
    Array.isArray(tickets) && tickets.length > 0
      ? tickets.filter(
          (ticket: any) =>
            moment(ticket.bookingTime).format('YYYY-MM-DD') === today
        )
      : [];

  if (loading) {
    return (
      <div className="flex h-screen w-full justify-center items-center">
        <Loader />
      </div>
    );
  }

  const NoTicketsIllustration = () => (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <Calendar className="w-24 h-24 text-muted-foreground mb-4" />
      <h2 className="text-2xl font-bold mb-2">No Tickets Booked Today</h2>
      <p className="text-muted-foreground mb-4">
        Looks like you haven't booked any tickets for today.
      </p>
      <Link href="/">
        <Button>Buy Tickets</Button>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pt-5 px-3 md:pt-8 md:px-6">
        <div className="flex justify-between">
          <div className="flex gap-4 pb-5">
            <Link href="/">
              <Button className="rounded-full" size="icon" variant="outline">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="font-bold text-3xl">My Tickets</h1>
          </div>
          <div className="flex lg:hidden">
            <RecentDialog tickets={tickets || []} />
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex w-full px-2 sm:px-5 lg:ml-10 lg:flex-auto lg:w-64">
          {filteredTickets.length > 0 ? (
            <Carousel className="w-full">
              <CarouselContent>
                {filteredTickets.map((ticket: any) => (
                  <CarouselItem key={ticket._id}>
                    <div className="p-1">
                      <Card>
                        <CardHeader className="flex bg-secondary items-center rounded-t-lg">
                          <div className="flex items-center gap-3 justify-center">
                            <h1 className="font-serif font-semibold text-lg truncate">
                              {ticket.source}
                            </h1>
                            <span className="w-[10px] h-[3px] bg-primary" />
                            <h1 className="font-serif font-semibold text-lg truncate">
                              {ticket.destination}
                            </h1>
                          </div>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center gap-4 p-4">
                          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                            <div className="flex flex-col items-center text-center">
                              <span className="text-muted-foreground truncate">
                                Booking Host:
                              </span>
                              <h1 className="font-semibold">{ticket.name}</h1>
                            </div>
                            <div className="flex flex-col items-center text-center">
                              <span className="text-muted-foreground truncate">
                                Booking Time:
                              </span>
                              <h1 className="font-semibold">
                                {moment(ticket.bookingTime).format('LT')}
                              </h1>
                            </div>
                            <div className="flex flex-col items-center text-center">
                              <span className="text-muted-foreground truncate">
                                Passengers:
                              </span>
                              <h1 className="font-semibold">{ticket?.passengers}</h1>
                            </div>
                            <div className="flex flex-col items-center text-center">
                              <span className="text-muted-foreground truncate">
                                Total Amount:
                              </span>
                              <h1 className="font-bold text-emerald-700">
                                ₹ {ticket.totalAmount}
                              </h1>
                            </div>
                          </div>
                          <Image
                            src={ticket.qrImage}
                            alt="ticket"
                            width="250"
                            height="100"
                            className="my-2"
                          />
                          <div className="flex gap-1 flex-col w-full max-w-sm text-center">
                            <span className="text-muted-foreground">Ticket Id:</span>
                            <span className="truncate">{ticket._id}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="flex flex-col bg-secondary rounded-b-lg">
                          <h1 className="font-semibold text-lg text-destructive">
                            ⚠️ WARNING
                          </h1>
                          <h1 className="text-center">
                            Your ticket will expire today at 11:59 pm.
                          </h1>
                        </CardFooter>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden lg:flex" />
              <CarouselNext className="hidden lg:flex" />
            </Carousel>
          ) : (
            <Card className="w-full">
              <NoTicketsIllustration />
            </Card>
          )}
        </div>
        <div className="hidden lg:flex lg:flex-auto lg:mx-10 rounded-xl border bg-card lg:w-28">
          <Recent tickets={tickets || []} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
