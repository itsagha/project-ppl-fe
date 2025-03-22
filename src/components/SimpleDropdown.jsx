import React, { useState } from 'react';
import Button from './Button';

const SimpleDropdown = ({ className, fields, onSelect, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (field) => {
    if (field.onClick) {
      field.onClick();
    } else if (onSelect) {
      onSelect(field.value); 
      setSelectedLabel(field.label);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button onClick={() => setIsOpen(!isOpen)} className={`${className}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 28 28"
          width="1.2em"
          height="1.2em"
          {...props}
        >
          <path
            fill="currentColor"
            d="M8.75 14a2.75 2.75 0 1 1-5.5 0a2.75 2.75 0 0 1 5.5 0m8 0a2.75 2.75 0 1 1-5.5 0a2.75 2.75 0 0 1 5.5 0M22 16.75a2.75 2.75 0 1 0 0-5.5a2.75 2.75 0 0 0 0 5.5"
          ></path>
        </svg>
      </Button>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-md">
          <ul className="py-2 text-sm text-gray-700 max-h-60 min-w-[8rem] overflow-y-auto">
            {fields.map((field, index) => (
              <li key={index}>
                <button
                  onClick={() => handleItemClick(field)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {field.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SimpleDropdown;