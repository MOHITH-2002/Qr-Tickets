import { NewPasswordForm } from "@/components/auth/new-password-form";
import Loader from "@/components/loading";
import { Suspense } from "react";

export const metadata = {
  title: "Qr-Tickets | newPassword",

};
const NewPasswordPage = () => {
  return ( 
    <Suspense fallback={<Loader/>}>

    <NewPasswordForm />
    </Suspense>
   );
}

export default NewPasswordPage;