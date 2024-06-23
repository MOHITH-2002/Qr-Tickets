"use client";

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine } from "lucide-react";
import Image from "next/image";

const Error = () => {
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/');
    };

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-5">
            <Image src="https://res.cloudinary.com/dpgxmmowq/image/upload/v1708458521/404error_s32xro.svg" height={290} width={500} alt="error" />
        
            <Button onClick={handleRedirect}>
                <ArrowLeftFromLine />
                Go back
            </Button>
        </div>
    );
};

export default Error;