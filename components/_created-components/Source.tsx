"use client"

import { useState, useEffect, useRef } from 'react';
import { data } from '@/lib/data/data';
import { LocationField } from './location-field';

interface Props {
  sourceselected: (item: any) => void;
  removeSelected: any;
  initialValue: string;
}

const Source = ({ sourceselected, removeSelected, initialValue }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(initialValue);
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

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setValue(item.place);
    sourceselected(item);
    setIsOpen(false);
  }

  const normalizedValue = value.toLowerCase();
  const filteredData = data.filter((item) => item.place.toLowerCase().includes(normalizedValue) && item.place !== removeSelected);
  const dropdownHeight = Math.min(filteredData.length * 40, 220);

  return (
    <div className="relative">
      <LocationField
        label="Source"
        value={value}
        onClick={handleClick}
        onChange={(e) => setValue(e.target.value)}
      />
      {isOpen && (
        <div
          ref={dropdownRef}
          style={{ maxHeight: `${dropdownHeight}px` }}
          className="absolute z-[99999] w-full mt-2 overflow-y-auto rounded-md shadow-lg bg-background border border-border"
        >
          {filteredData.map((item) => (
            <button
              key={item.id}
              className="w-full px-4 py-2 text-left hover:bg-accent hover:text-accent-foreground"
              onClick={() => handleItemClick(item)}
            >
              {item.place}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Source;

