import { LoginForm } from "@/components/auth/login-form";
import Loader from "@/components/loading";
import { Suspense } from "react";
export const metadata = {
  title: "Qr-Tickets | Login",

};

const LoginPage = () => {
  return ( 
    <Suspense fallback={<Loader/>}>


    <LoginForm />
    </Suspense>
  );
}

export default LoginPage;