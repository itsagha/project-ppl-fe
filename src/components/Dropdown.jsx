import React, { useState } from 'react';
import Button from './Button';

const Dropdown = ({ className, fields, buttonLabel, buttonContent, onSelect, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(buttonLabel || 'Select');

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
    <div className={`relative inline-block`}>
      <Button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`flex gap-2 justify-between items-center border border-primary text-primary hoverAnimation rounded-lg ${className}`}
      >
        {buttonContent || selectedLabel}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 12 12"
          width="1.2em"
          height="1.2em"
          {...props}
        >
          <path fill="currentColor" fillRule="evenodd" d="M2.15 4.15a.5.5 0 0 1 .707 0l3.15 3.15l3.15-3.15a.5.5 0 0 1 .707.707l-3.5 3.5a.5.5 0 0 1-.707 0l-3.5-3.5a.5.5 0 0 1 0-.707z" clipRule="evenodd"></path>
        </svg>
      </Button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white divide-y divide-gray-100 rounded-lg shadow-md">
          <ul className="py-2 text-sm text-gray-700 max-h-60 overflow-y-auto">
            {fields.map((field) => (
              <li key={field.value}>
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

export default Dropdown;