"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { data } from '@/lib/data/data';
import { Search } from 'lucide-react';
import Image from 'next/image';


interface Props {
    destinationSelected: (item: any) => void;
    removeSelected?: string | null;
}

const Destination = ({ removeSelected, destinationSelected }: Props) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState("");
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    const handleItemClick = (item: any) => {
        setSelectedItem(item);
        setValue(item.place);
        destinationSelected(item); // Pass the selected item to the function
        setIsOpen(false); // Close the dropdown
    }


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const filteredData = data.filter((item) => item.place.includes(value) && item.place !== removeSelected);
    const dropdownHeight = Math.min(filteredData.length * 40, 220);

    return (
        <div className="">
            <div className="flex  items-center relative" onClick={handleClick}>
                <Image src="/getoff.png" alt="getoff" width="22" height="20" className="absolute flex left-2 text-muted-foreground "  />
            <Input type="text" placeholder="To"  onChange={(e) => setValue(e.target.value)} value={value} className='pl-10  focus:none  focus-visible:ring-transparent lg:w-[13.5rem] md:w-[12rem]  h-12 md:h-16'/>
            </div>
            {isOpen &&
                <div style={{maxHeight: `${dropdownHeight}px` }} className="flex flex-col lg:w-[13.5rem] md:w-[12rem]  absolute z-[99999] overflow-y-auto bg-white mt-1 rounded-sm" ref={dropdownRef} >
                    {filteredData.map((item) => (
                        <Button
                            key={item.id}
                            className="w-full flex"
                            variant="ghost"
                            onClick={() => handleItemClick(item)}
                        >
                            {item.place}
                        </Button>
                    ))}
                </div>
            }
        </div>
    );
}

export default Destination;
