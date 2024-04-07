import { NewVerificationForm } from "@/components/auth/new-verification-form";
import Loader from "@/components/loading";
import { Suspense } from "react";

const NewVerificationPage = () => {
  return ( 
    <Suspense fallback={<Loader/>}>

    <NewVerificationForm />
    </Suspense>
   );
}

export default NewVerificationPage;