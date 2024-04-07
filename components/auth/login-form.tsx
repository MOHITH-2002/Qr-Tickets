"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,  
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper"
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { LoginSchema } from "@/lib/zodSchema";
import { login } from "@/lib/actions/login";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaSlash } from "react-icons/fa";
export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setisPending] = useState<boolean>(false);
  const [passwordOpen,setPasswordOpen] = useState<string>("password");

const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Email already use in Google provider!"
    : "";
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit =async (values: z.infer<typeof LoginSchema>) => {
    setisPending(true);
    setError("");
    setSuccess("");

    
    const res = await login(values);
    
    if(res?.error){
      setError(res.error);
    }
    if(res?.success){
      setSuccess(res.success);
    }
    setisPending(false)
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="flex items-center w-full relative">

                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type={passwordOpen}
                      />
                      {
                        passwordOpen && passwordOpen === "text" ? 
                        (<FaEyeSlash size={20} className="absolute flex right-2 text-muted-foreground cursor-pointer" onClick={()=>setPasswordOpen("password")}/>)
                        :
                        (<FaEye size={20} className="absolute flex right-2 text-muted-foreground cursor-pointer" onClick={()=>setPasswordOpen("text")}/>)
                      }
                        </div>
                    

                  </FormControl>
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal"
                  >
                    <Link href="/auth/reset-password">
                      Forgot password?
                    </Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
         <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full"
          >
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};