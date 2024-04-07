import { LoginForm } from "@/components/auth/login-form";
import Loader from "@/components/loading";
import { Suspense } from "react";

const LoginPage = () => {
  return ( 
    <Suspense fallback={<Loader/>}>


    <LoginForm />
    </Suspense>
  );
}

export default LoginPage;