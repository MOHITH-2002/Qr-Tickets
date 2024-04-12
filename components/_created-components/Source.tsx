import React, { useState, useEffect, useRef } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { data } from '@/lib/data/data';
import { Search } from 'lucide-react';
import Image from 'next/image';

interface Props {
    sourceselected: (item: any) => void;
    removeSelected: any;
}

const Source = ({ sourceselected, removeSelected }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState("");
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    const handleItemClick = (item: any) => {
        setSelectedItem(item);
        setValue(item.place);
        sourceselected(item); // Pass the selected item to the function
        setIsOpen(false); // Close the dropdown
    }

    const filteredData = data.filter((item) => item.place.includes(value) && item.place !== removeSelected);
    const dropdownHeight = Math.min(filteredData.length * 40, 220); // Assuming each item takes 40px of height, with max height 200px

    return (
        <div className="">
            <div className="flex  w-full items-center relative" onClick={handleClick}>

                <Image src="/geton.png" alt="geton" width="22" height="20" className="absolute flex left-2 text-muted-foreground "  />
            <Input
                type="text"
                placeholder="From"
                onClick={handleClick}
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className='pl-10 h-12  focus:none rounded-t-2xl md:rounded-none md:rounded-l-3xl focus-visible:ring-transparent lg:w-[13.5rem] md:w-[12rem] md:h-16'
                />
                </div>
            {isOpen &&
                <div
                    ref={dropdownRef}
                    style={{ maxHeight: `${dropdownHeight}px` }}
                    className="flex flex-col lg:w-[13.5rem] md:w-[12rem] absolute z-[99999] overflow-y-auto bg-white mt-1 rounded-sm"
                >
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

export default Source;
