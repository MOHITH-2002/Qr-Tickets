import { ErrorCard } from "@/components/auth/error";
export const metadata = {
  title: "Qr-Tickets | Error",
  description: "Smart QR-based ticket booking system for inter-city commutes",

};
const AuthErrorPage = () => {
  return ( 
    <ErrorCard/>
  );
};

export default AuthErrorPage;