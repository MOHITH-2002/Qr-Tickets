"use client"
import React, { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, X } from 'lucide-react'
import { Button } from "../ui/button";
const AlertPrototype = () => {
      const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null
  return (
    <div className="flex md:px-12 px-6">

    <Alert className="relative mb-4 bg-amber-500/90 border-amber-600 text-black shadow-lg">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle className="font-bold text-amber-950">Prototype Warning</AlertTitle>
      <AlertDescription className="mt-2 text-amber-950">
        This website is a prototype developed for a senior engineering design project and is not the official BRTS website. It is exclusively meant for testing and demonstration purposes.
      </AlertDescription>
      
    </Alert>
    </div>
  );
};

export default AlertPrototype;
