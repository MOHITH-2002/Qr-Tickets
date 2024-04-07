import { NewPasswordForm } from "@/components/auth/new-password-form";
import Loader from "@/components/loading";
import { Suspense } from "react";


const NewPasswordPage = () => {
  return ( 
    <Suspense fallback={<Loader/>}>

    <NewPasswordForm />
    </Suspense>
   );
}

export default NewPasswordPage;