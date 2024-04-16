import { NewVerificationForm } from "@/components/auth/new-verification-form";
import Loader from "@/components/loading";
import { Suspense } from "react";
export const metadata = {
  title: "Qr-Tickets | new-verification",
  description: "Smart QR-based ticket booking system for inter-city commutes",

};
const NewVerificationPage = () => {
  return ( 
    <Suspense fallback={<Loader/>}>

    <NewVerificationForm />
    </Suspense>
   );
}

export default NewVerificationPage;