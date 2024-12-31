"use client"

import React, { useEffect, useState } from 'react';
import Source from './Source';
import Destination from './Destination';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alertproceed } from './Alert-proceed';
import toast from 'react-hot-toast';
import { Users } from 'lucide-react';

import { SwapButton } from './swap-button';

interface SearchProps {
  username: string | undefined;
  email: string | undefined;
}

const Search: React.FC<SearchProps> = ({ username, email }) => {
  const [selectedItem, setSelectedItem] = useState("");
  const [destSelectedItem, setDestSelectedItem] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [srcDistance, setSrcDistance] = useState<number>(0);
  const [destDistance, setDestDistance] = useState<number>(0);
  const [numberOfPassenger, setNumberOfPassenger] = useState<number>(1);

  const handleSourceSelected = (item: any) => {
    setSelectedItem(item.place);
    setSrcDistance(item.distance);
  };

  const handleDestinationSelected = (item: any) => {
    setDestSelectedItem(item.place);
    setDestDistance(item.distance);
  };

  const calculatePrice = () => {
    const distance = Math.abs(destDistance - srcDistance);
    
    if (distance >= 25) {
      setPrice(32);
    } else if (distance >= 20) {
      setPrice(28);
    } else if (distance >= 10) {
      setPrice(22);
    } else if (distance >= 5) {
      setPrice(12);
    } else {
      setPrice(6);
    }
  };

  useEffect(() => {
    if (srcDistance !== 0 || destDistance !== 0) {
      calculatePrice();
    }
  }, [srcDistance, destDistance]);

  const handleFieldValue = (value: string) => {
    setNumberOfPassenger(parseInt(value, 10));
  };

  const handleSwapLocations = () => {
    const tempSource = selectedItem;
    const tempDest = destSelectedItem;
    setSelectedItem(tempDest);
    setDestSelectedItem(tempSource);
    setSrcDistance(destDistance);
    setDestDistance(srcDistance);
  };

  return (
    <Card className="w-full max-w-md mx-auto rounded-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Buy your BRTS Bus tickets</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Source 
            sourceselected={handleSourceSelected} 
            removeSelected={destSelectedItem} 
            initialValue={selectedItem}
          />
          <SwapButton onClick={handleSwapLocations} />
          <Destination 
            destinationSelected={handleDestinationSelected} 
            removeSelected={selectedItem}
            initialValue={destSelectedItem}
          />
        </div>

        <div className='flex h-[50px] md:h-[40px]'>
          <Select defaultValue="1" onValueChange={handleFieldValue} >
            <SelectTrigger className="w-full p-4 rounded-md h-[50px] md:h-[40px]">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5" />
                <SelectValue placeholder="No. of passengers" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()} className='flex h-[50px] md:h-[40px]'>{num} Person{num !== 1 ? 's' : ''}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        {numberOfPassenger !== 0 && destSelectedItem !== "" && selectedItem !== "" ? (
          <Alertproceed
            numberofpassenger={numberOfPassenger}
            destDistance={destDistance}
            srcDistance={srcDistance}
            price={price}
            destSelectedItem={destSelectedItem}
            selectedItem={selectedItem}
            email={email}
            username={username}
          />
        ) : (
          <Button
            className="w-full py-4 text-base"
            onClick={() => toast.error("Please make sure to complete all of the fields.")}
          >
            Search Ticket
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Search;
