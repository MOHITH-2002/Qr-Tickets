"use client"
import React, { useEffect, useState } from 'react';
import Source from './Source';
import Destination from './Destination';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alertproceed } from './Alert-proceed';

interface searchprop {
    username: string | undefined;
    email: string | undefined;
}

const Search = ({username,email}:searchprop) => {
    
    const [selectedItem, setSelectedItem] = useState("");
    const [destSelectedItem, setDestSelectedItem] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [srcDistance, setSrcDistance] = useState<number>(0);
    const [destDistance, setDestDistance] = useState<number>(0);
    const [numberofpassenger,setNumberOfPassenger] = useState<number>(0);

    const handleSourceSelected = (item:any) => {
        setSelectedItem(item.place);
        setSrcDistance(item.distance);
    };

    const handleDestinationSelected = (item:any) => {
        setDestSelectedItem(item.place);
        setDestDistance(item.distance);
    };
    
    const calculatePrice = () => {
        const distance = Math.abs(destDistance - srcDistance);
        if (distance >= 35) {
            setPrice(55);
        } else if (distance >= 25) {
            setPrice(25);
        } else if (distance >= 20) {
            setPrice(20);
        } else if (distance >= 10) {
            setPrice(12);
        } else {
            setPrice(6);
        }
    };

    React.useEffect(() => {
        if (srcDistance !== 0 && destDistance !== 0) {
            calculatePrice();
        }
    }, [srcDistance, destDistance]);

    
    const handleFieldValue = (value: any) => {
    // const parsedObject = JSON.parse(value); // *parse the object here

    setNumberOfPassenger(value);
  };



    return (
        <div>
            <div className="">
                
                <Source sourceselected={handleSourceSelected} removeSelected={destSelectedItem} />
                <Destination removeSelected={selectedItem} destinationSelected={handleDestinationSelected} />
            </div>
            <div>
                <Select onValueChange={handleFieldValue} >
                    <SelectTrigger className="w-[13.5rem] focus-visible:ring-transparent focus:none">
                        <SelectValue placeholder="No. of passengers" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="1" >1</SelectItem>
                            <SelectItem value="2" >2</SelectItem>
                            <SelectItem value="3" >3</SelectItem>
                            <SelectItem value="4" >4</SelectItem>
                            <SelectItem value="5" >5</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            
            {/* Display the selected fruit in the button */}
            {numberofpassenger!= 0 && destSelectedItem!=""&&  selectedItem!== ""  ? 
            <div>

                <Alertproceed numberofpassenger={numberofpassenger} destDistance={destDistance} srcDistance={srcDistance} price={price} destSelectedItem={destSelectedItem} selectedItem={selectedItem} email={email} username={username}/> 
            </div>
                : <Button disabled className="cursor-Pointer bg-gray-700" variant="outline">Buy Ticket</Button>}
        </div>
    );
};

export default Search;
