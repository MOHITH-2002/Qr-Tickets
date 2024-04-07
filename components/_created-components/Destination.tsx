"use client"
import React, { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { data } from '@/lib/data/data';


interface Props {
    destinationSelected: (item: any) => void;
    removeSelected?: string | null;
}

const Destination = ({ removeSelected, destinationSelected }: Props) => {
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

    

    const filteredData = data.filter((item) => item.place.includes(value) && item.place !== removeSelected);
    const dropdownHeight = Math.min(filteredData.length * 40, 200);

    return (
        <div>
            <Input type="text" placeholder="Search" onClick={handleClick} onChange={(e) => setValue(e.target.value)} value={value} className='focus-visible:ring-transparent w-[13.5rem] '/>
            {isOpen &&
                <div style={{maxHeight: `${dropdownHeight}px` }} className="flex flex-col w-[13.5rem] absolute z-[99999] overflow-y-auto bg-slate-600 mt-1 rounded-sm" >
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
