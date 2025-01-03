import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  label: string;
  icon?: React.ReactNode;
  required?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  label,
  icon,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={selectRef}>
      <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
        {icon && <span className="mr-2 text-gray-400">{icon}</span>}
        {label}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative w-full bg-white px-3 py-2 text-left
          border rounded-lg shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${isOpen ? 'border-blue-500' : 'border-gray-300'}
          ${value ? 'text-gray-900' : 'text-gray-500'}
        `}
        aria-required={required}
      >
        <span className="block truncate text-sm">
          {value || placeholder}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDown
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-1 max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={`
                w-full text-left px-3 py-2 text-sm
                hover:bg-blue-50 transition-colors
                ${option === value ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-900'}
              `}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};