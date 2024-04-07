import { RegisterForm } from "@/components/auth/register-form";
import Loader from "@/components/loading";
import { Suspense } from "react";

const RegisterPage = () => {
  return ( 
    <Suspense fallback={<Loader/>}>

    <RegisterForm />
    </Suspense>
    

  );
}

export default RegisterPage;