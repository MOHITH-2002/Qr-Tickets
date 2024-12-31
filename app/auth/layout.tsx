import AlertPrototype from "@/components/auth/alertPrototype";

const AuthLayout = ({ 
  children
}: { 
  children: React.ReactNode
}) => {
  return ( 
    <div className="min-h-full flex flex-col items-center justify-center ">
      {children}
      <AlertPrototype/>
    </div>
   );
}

export default AuthLayout;