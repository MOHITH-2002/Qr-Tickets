'use client';

import { logout } from "@/lib/actions/logout";

interface LogoutButtonProps {
  children: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    logout();
  };
  return (
    <span onClick={onClick} className="cursor-pointer bg-secondary hover:bg-secondary/90 text-secondary-foreground">
      {children}
    </span>
  );
};

