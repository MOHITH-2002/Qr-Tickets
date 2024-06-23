
import { auth } from "@/auth";
import Search from "@/components/_created-components/Search";
import Navbar from "@/components/Navbar/navbar";
import { Suspense } from "react";
import Loader from "@/components/loading";

export default async function Home() {
  const session = await auth();

  

  return (
    <Suspense fallback={<Loader/>}>
      <Navbar  />
        <Search username={session?.user.name} email={session?.user.email} />
    </Suspense>
  );
}
