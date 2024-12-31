"use client"
import { FileText, ChevronRight, QrCode } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getSpecificUserTickets } from '@/lib/actions/getTickets';
import moment from 'moment';

interface Ticket {
  source: string;
  destination: string;
  bookingTime: string;
  passengers: number;
}

export function RecentBookingCard() {
  const [lastTicket, setLastTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const fetchLastTicket = async () => {
      try {
        const tickets = await getSpecificUserTickets();
        if (Array.isArray(tickets) && tickets.length > 0) {
          const sortedTickets = tickets.sort(
            (a: any, b: any) => new Date(b.bookingTime).getTime() - new Date(a.bookingTime).getTime()
          );
          setLastTicket(sortedTickets[0]); // Get the most recent ticket
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchLastTicket();
  }, []);

  if (!lastTicket) {
    return null; // Do not render anything if no tickets are found
  }

  return (
    <div className="space-y-4 px-6 pb-10">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">Recent Booked</h2>
        <Link href="/my-tickets" className="text-blue-600 text-sm font-medium ">
          See more
        </Link>
      </div>

      <div className="relative ">
        <div className="bg-blue-600 p-4 text-white rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-md">
                <QrCode className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold">
                  {lastTicket?.source} - {lastTicket?.destination}
                </p>
                <p className="text-sm text-white/80">
                  {moment(lastTicket?.bookingTime).format('DD MMM YYYY')} |{' '}
                  {lastTicket?.passengers} Seats
                </p>
              </div>
            </div>
            <Link href="/my-tickets">
            <ChevronRight className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
