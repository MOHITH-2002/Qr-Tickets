import Ticket from '@/types'
import { History } from 'lucide-react'
import moment from 'moment'

import React from 'react'

interface props {
    
tickets:Ticket[] |any,
loading?:boolean,
}
const Recent = ({tickets,loading}:props) => {
    
    
    const today = moment().format('YYYY-MM-DD');
  const filteredTickets = tickets && tickets?.filter((ticket: any) => moment(ticket.bookingTime).format('YYYY-MM-DD') !== today);

    // if(loading ===true){

    // }
    return (
    <>
    <div className='flex flex-col gap-2 w-full pb-5'>

            <div className='h-10 items-center flex px-10 gap-3 bg-slate-100 rounded-xl'>
                <History className='text-muted-foreground'/>
                <h1 className='font-bold text-xl'>
                    
                    Recent Tickets
                    </h1>
            </div>
            <div className='px-2 flex flex-col gap-3'>
                {filteredTickets && filteredTickets.length !== 0 ?  filteredTickets.slice(0,5).map((ticket: any) => (
                <div className='flex  h-min py-3 gap-2 flex-col cursor-default border-2 rounded-md hover:bg-slate-50 '>
                    <div className='flex  items-center  justify-between w-full px-4 '>

                    <h1 className='font-serif truncate'>{ticket.source}</h1>
                    ---&gt;
                    <h1 className='font-serif truncate'>{ticket.destination}</h1>

                    </div>
                    <div className='flex  items-center justify-between px-4 '>

                    <div className='flex  flex-col' >
                        <h1 className='text-muted-foreground'>Booked on:</h1>
                        <h1>{moment(ticket.bookingTime).format('ll')}</h1>
                    </div>
                    <div className='flex items-center flex-col' >
                        <h1 className='text-muted-foreground'>passengers:</h1>
                        <h1>{ticket.passengers}</h1>
                    </div>
                    </div>

                </div>
                
            ))
            :( 
                <div className=" flex h-full w-full items-center justify-center">
                <h1>
                There are no recently booked tickets.
                </h1>
                
                </div>
            )

            }
            </div>

            
            </div>
    </>
    )
}

export default Recent
