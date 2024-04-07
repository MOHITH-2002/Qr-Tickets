import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


import { auth, signOut } from "@/auth";
import Search from "@/components/_created-components/Search";
export default async function Home () {

  const session = await auth();
  
  

  return (
     <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
     
      
  

    <div>
      
      <form action={async () => {
        "use server";

        await signOut();
      }}>
        <button type="submit">
          Sign out
        </button>
      </form>

      <Search username={session?.user.name} email={session?.user.email}/>
    </div>
   


    </main>
  );
}
