import { auth } from "@/auth";
import Search from "@/components/_created-components/Search";
import { Suspense } from "react";
import Loader from "@/components/loading";
import Navbar from "@/components/Navbar/navbar";
import Video from "@/components/ui/Video";
import { RecentBookingCard } from "@/components/_created-components/recent-booking-card";

export default async function Home() {
  const session = await auth();

  return (
    <Suspense fallback={<Loader />}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 items-start lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <Search username={session?.user.name} email={session?.user.email} />
            </div>
            <div className="order-1 lg:order-2">
              <Video
                className="w-full rounded-lg shadow-lg"
                url={process.env.VIDEO_URL || ''}
              />
            </div>
          </div>
        </div>
      </div>
      <RecentBookingCard/>
    </Suspense>
  );
}

