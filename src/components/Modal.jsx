import React from 'react';
import Button from './Button';

const Modal = ({ title, fields, onSubmit, onClose, children, className }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-50 animate-fade-in-scale z-50'>
      <div className='bg-white p-8 rounded-2xl shadow-2xl min-w-96'>
        <h2 className='text-xl font-semibold mb-6'>{title}</h2>
        <div className='flex flex-col gap-4 mb-6'>
          {fields.map((field, index) => (
            <div key={index} className='flex flex-col'>
              {field.label && (
                <label className='mb-1 text-sm font-medium'>{field.label}</label>
              )}
              {field.customComponent ? (
                field.customComponent 
              ) : (
                <input
                  type={field.type || 'text'}
                  value={field.value}
                  onChange={field.onChange}
                  className='w-full p-2 border rounded-lg focus:outline-primary'
                />
              )}
            </div>
          ))}
        </div>
        <div className='flex gap-2 mt-4 text-sm'>
          <Button
            onClick={onSubmit}
            className={`border ${className}`}
          >
            {children}
          </Button>
          <Button
            onClick={onClose}
            className='border border-gray-700 text-gray-700 hoverAnimation4'
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;