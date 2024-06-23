"use client"

import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Error = ()=>{
    return(
        <div className="h-full flex flex-col items-center justify-center space-y-5 ">
            <Image src="https://res.cloudinary.com/dpgxmmowq/image/upload/v1708458521/404error_s32xro.svg" height={290} width={500}  alt="error" />
        
            <Link href="/">
            <Button>
                <ArrowLeftFromLine />
                
                Go back</Button>
            </Link>


        </div>
    );
}
export default Error;