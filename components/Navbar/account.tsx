"use client"

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import User from "@/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { userInfo } from "@/lib/actions/register";
import { FaUser } from "react-icons/fa";
import { LogoutButton } from "./Logout";
import { ExitIcon } from "@radix-ui/react-icons";
import { CircleUser } from 'lucide-react';

interface props {
  username: string | undefined;
}

const Accountdialog = ({username}: props) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            setLoading(true);
            try {
                const res = await userInfo();
                setUser(res);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);   
    
    return (
      <div className="cursor-pointer">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {user?.image && !loading ? (
              <Avatar>
                <AvatarImage src={user.image} alt="User avatar"/>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <FaUser />
                </AvatarFallback>
              </Avatar>
            ) : (
              <Button size="icon" className="rounded-full" variant="outline">
                <FaUser />
              </Button>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 h-[100px] flex flex-col justify-center gap-2" align="end">
            <DropdownMenuItem className="cursor-default bg-secondary text-secondary-foreground truncate focus:bg-secondary focus:text-secondary-foreground">
              <CircleUser className="mr-2 h-6 w-5" />
              {username}
            </DropdownMenuItem>
            <LogoutButton>
              <DropdownMenuItem className="cursor-pointer hover:bg-secondary hover:text-secondary-foreground focus:bg-background focus:text-foreground">
                <ExitIcon className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </LogoutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
};

export default Accountdialog;

