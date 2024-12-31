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

import { useEffect, useState } from "react";
import { createOrder, createUser } from "@/lib/actions/payment-checkout";
import moment from "moment";
import Script from "next/script";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";



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
export  function Alertproceed({numberofpassenger,destDistance,srcDistance,price,selectedItem,destSelectedItem,email,username}:alertProps) {


const renderPassengerDetails = () => {
    const passengerList = [];
    for (let i = 1; i <= numberofpassenger; i++) {
      passengerList.push(
        <span key={i} className="text-slate-300 pl-6">Passenger {i}</span>
      );
    }
    return passengerList;
  };
const renderAmount = () => {
    const passengerList = [];
    for (let i = 1; i <= numberofpassenger; i++) {
      passengerList.push(
        <span key={i} className="text-slate-300 ">₹ {price}</span>
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
    source: selectedItem,
    destination: destSelectedItem,
    price: price * numberofpassenger,
    bookingTime: new Date(),
    passengers: numberofpassenger,
    destDistance: destDistance,
    sourceDistance: srcDistance,
    email,
    username,
  };

  // Create user order and get userOrderId
  const userOrderId = await createUser(order);
  

  console.log('User ID:', userOrderId); // Log user ID to confirm

  // Create Razorpay order
  const res = await fetch('/api/createOrder', {
    method: 'POST',
    body: JSON.stringify({ amount: price * numberofpassenger * 100 }),
  });
  const data = await res.json();


  // Payment data for Razorpay
  const paymentData = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_API_ID,
    order_id: data.id,

    handler: async function (response: any) {
      // Verify payment
      const res = await fetch('/api/verifyOrder', {
        method: 'POST',
        body: JSON.stringify({
          orderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        }),
      });
      const verificationData = await res.json();

      if (verificationData.isOk) {
        // Use the captured Razorpay Order ID

        // Call createOrder with the correct IDs
        await createOrder({
          userId: userOrderId,
          orderId: data.id,
        });

        // Redirect or perform any action after successful payment
        window.location.href = '/my-tickets';
      } else {
        console.error('Payment failed');
        window.location.href = '/';
      }
    },
  };

  // Open Razorpay checkout
  const payment = new (window as any).Razorpay(paymentData);
  payment.open();
}
    // await checkoutOrder({price:price*numberofpassenger,userId:user._id,email:email,passengers:numberofpassenger});
    // console.log("success in checkout");
    
    
  
    return (
    <AlertDialog>
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <AlertDialogTrigger asChild>
        <Button className="w-full py-6 text-base">Buy Tickets</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader>
          <h2 className="text-xl font-bold mb-2">Confirmation</h2>
          <Card className="p-3 space-y-2 bg-background border border-border w-full max-w-[680px]">
            {/* Journey Details */}
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-bold text-sm sm:text-base truncate">{selectedItem}</h3>
              </div>
              <div className="hidden md:block">
                <Image src="/pointer.svg" alt="pointer" width={50} height={1} />
              </div>
              <div className="flex-shrink-0">
                <Image src="/bus.png" alt="bus" width={30} height={30} className="w-auto h-auto" />
              </div>
              <div className="hidden md:block">
                <Image src="/pointer.svg" alt="pointer" width={50} height={1} />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-sm sm:text-base truncate">{destSelectedItem}</h3>
              </div>
            </div>

            <Separator className="my-2" />

            {/* Time and Distance */}
            <div className="flex justify-between items-center text-sm">
              <div>
                <p className="font-semibold">Booking time</p>
                <p className="text-muted-foreground">{moment().format('LT')}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Distance</p>
                <p className="text-muted-foreground">{Math.abs(destDistance-srcDistance)} Km</p>
              </div>
            </div>

            <Separator className="my-2" />

            {/* Passenger and Price Details */}
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div className="space-y-1 flex flex-col">
                  <p className="font-semibold text-sm">Passengers Details</p>
                  {renderPassengerDetails()}
                </div>
                <div className="space-y-1 text-right flex flex-col">
                  <p className="font-semibold text-sm">Amount</p>
                  {renderAmount()}
                </div>
              </div>

              <Separator className="my-2" />

              {/* Total Amount */}
              <div className="flex justify-between items-center py-2 px-3 bg-secondary rounded-md">
                <p className="font-bold text-base sm:text-lg">Total Amount</p>
                <p className="font-bold text-base sm:text-lg">₹ {price * numberofpassenger}</p>
              </div>
            </div>
          </Card>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 mt-2">
          <AlertDialogCancel className="flex-1 sm:flex-none">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onCheckout} className="flex-1 sm:flex-none">
            Check out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
