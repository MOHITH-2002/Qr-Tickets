import  Ticket  from '@/types'
import { History } from 'lucide-react'
import moment from 'moment'
import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"

interface RecentProps {
  tickets: Ticket[]
  loading?: boolean
}

const Recent = ({ tickets, loading }: RecentProps) => {
  const today = moment().format('YYYY-MM-DD')
  const filteredTickets = tickets?.filter((ticket: Ticket) => moment(ticket.bookingTime).format('YYYY-MM-DD') !== today)

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>
  }

  return (
    <div className='flex flex-col gap-2 w-full pb-5'>
      <div className='h-10 items-center flex px-4 gap-3 bg-secondary rounded-xl'>
        <History className='text-muted-foreground'/>
        <h1 className='font-bold text-xl'>Recent Tickets</h1>
      </div>
      <ScrollArea className="h-[calc(100vh-10rem)] px-2">
        {filteredTickets && filteredTickets.length !== 0 ? (
          filteredTickets.slice(0, 10).map((ticket: Ticket) => (
            <div 
              
              className='flex h-min py-3 gap-2 flex-col cursor-default border border-border rounded-md mb-3 hover:bg-accent hover:text-accent-foreground transition-colors'
            >
              <div className='flex items-center justify-between w-full px-4'>
                <h2 className='font-serif truncate'>{ticket.source}</h2>
                <span className="text-muted-foreground">→</span>
                <h2 className='font-serif truncate'>{ticket.destination}</h2>
              </div>
              <div className='flex items-center justify-between px-4'>
                <div className='flex flex-col'>
                  <span className='text-muted-foreground'>Booked on:</span>
                  <time>{moment(ticket.bookingTime).format('ll')}</time>
                </div>
                <div className='flex items-center flex-col'>
                  <span className='text-muted-foreground'>Passengers:</span>
                  <span>{ticket.passengers}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <p>There are no recently booked tickets.</p>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

export default Recent

