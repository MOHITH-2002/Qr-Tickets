import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import { loadStripe } from '@stripe/stripe-js';

import { useEffect } from "react";
import { checkoutOrder, createUser } from "@/lib/actions/payment-checkout";



// loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
interface alertProps {
    numberofpassenger:number;
    destDistance:number;
    srcDistance:number;
    price:number;
    selectedItem:any|string;
    destSelectedItem:any|string;
    email:string | undefined;
    username:string | undefined;

}
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
export   function Alertproceed({numberofpassenger,destDistance,srcDistance,price,selectedItem,destSelectedItem,email,username}:alertProps) {



    

const renderPassengerDetails = () => {
    const passengerList = [];
    for (let i = 1; i <= numberofpassenger; i++) {
      passengerList.push(
        <span key={i} className="text-slate-800 pl-6">Passenger {i}</span>
      );
    }
    return passengerList;
  };
const renderAmount = () => {
    const passengerList = [];
    for (let i = 1; i <= numberofpassenger; i++) {
      passengerList.push(
        <span key={i} className="text-slate-800 ">₹ {price}</span>
      );
    }
    return passengerList;
  };


  // buy tickets
      useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);


    const onCheckout = async () => {
    const order = {
      
      source:selectedItem,
      destination:destSelectedItem,
      price:price*numberofpassenger,
      bookingTime:new Date(),
      passengers:numberofpassenger,
      email,username
      

    }
    // console.log(order);

    const user = await createUser(order);
    console.log(user);
    
    

    

    await checkoutOrder({price:price*numberofpassenger,userId:user._id,email:email,passengers:numberofpassenger});
    console.log("success in checkout");
    
    
  }
    return (
    <AlertDialog >
        <AlertDialogTrigger asChild>
        <Button variant="outline">Buy Ticket</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className=" max-w-[390px] rounded-md sm:max-w-[680px] bg-slate-200">
        <AlertDialogHeader >
          <div >
            <h1 className="font-bold text-2xl ">

            Confirm Details
            </h1>
            </div>
            <div className="bg-blue-100 border-2 border-blue-600  w-full  flex flex-col gap-2  rounded-md">
            <div className=" flex justify-between pl-3 pr-3 h-20 items-center ">
            

            <div className="">
                <h1 className="font-bold text-lg">{selectedItem}</h1>
            </div>
              
            
            <Image src="/pointer.svg" alt="pointer" width="100" height="1" className="hidden md:block"/>
            <div>
                <Image src="/bus.png" alt="pointer" width="50" height="1" className=""/>
                
            </div>
            <Image src="/pointer.svg" alt="pointer" width="100" height="1" className="hidden md:block"/>
            <div>
                <h1 className="font-bold flex text-lg overflow-hidden">{destSelectedItem}</h1>
            </div>
            </div>
            <div className="h-14 flex justify-between items-center  rounded-md pl-3 pr-3">
              <div className="flex flex-col">
              <span className="font-semibold">Booking time:</span>
              <span className="text-slate-800">{new Date().getTime()}</span>
              </div>
              <div className="flex flex-col">
              <span className="font-semibold">Distance:</span>
              <span className="text-slate-800">{Math.abs(destDistance-srcDistance)} Km</span>
              </div>
            </div>
            

            <div className="bg-blue-100 border-2  w-full  flex flex-col gap-2  rounded-md">
            <div className=" bg-blue-200 flex justify-between pl-3 pr-3 px-0 h-10 items-center ">
            

            <div className="flex font-bold text-xl">Total Amount</div>
            <div className="flex font-bold text-xl ">
              ₹ {price*numberofpassenger}
            </div>
              
            
            
            
            </div>
            <div className="h-full flex justify-between items-center bg-blue-100 rounded-md pl-2 pr-2">
              <div className="flex flex-col">
              <span className="font-semibold">Traveler Details:</span>
              {renderPassengerDetails()}
              </div>
              <div className="flex flex-col">
              <span className="font-semibold">Amount:</span>
              {renderAmount()}
              </div>
            </div>
            
         
            </div>
            </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-red-500 hover:bg-red-400" >Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-blue-700 hover:bg-blue-500" onClick={onCheckout} >Proceed </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
