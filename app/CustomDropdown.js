import React, { useState } from 'react';
import Image from 'next/image'; // Use for Next.js; otherwise use <img> tag
import FlagUS from './usimage.png'; // Replace with your actual path
import FlagGB from './usimage.png'; // Update path for UK flag

const options = [
  { value: 'US', label: 'US', imageSrc: FlagUS },
  { value: 'GB', label: 'UK', imageSrc: FlagGB }, // Update path for UK flag
];

const CustomDropdown = ({ selectedValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option.value); // Pass the value directly to the onChange handler
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === selectedValue);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 bg-[#FFFFFF] rounded flex items-center justify-between"
      >
        <div className="flex items-center">
          <Image src={selectedOption?.imageSrc} alt={selectedOption?.label} width={24} height={16} />
          <span className="ml-2">{selectedOption?.label}</span>
        </div>
        {/* <span className="ml-auto">&#9662;</span> */}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full bg-[#FFFFFF] border border-gray-300 rounded ">
          {options.map((option) => (
            <button
              key={option.value}
              type="button" // Prevent form submission
              onClick={() => handleSelect(option)}
              className="flex items-center p-2 w-full hover:bg-gray-100"
            >
              <Image src={option.imageSrc} alt={option.label} width={24} height={16} className="mr-2" />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
