import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { SelectOption } from './types';
import { useClickOutside } from '../../../hooks/useClickOutside';

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  label: string;
  icon?: React.ReactNode;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  label,
  icon,
  error,
  required = false,
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  useClickOutside(selectRef, () => setIsOpen(false));

  useEffect(() => {
    if (isOpen && optionsRef.current) {
      const selectedOption = optionsRef.current.querySelector('[data-selected="true"]');
      if (selectedOption) {
        selectedOption.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0) {
          onChange(options[highlightedIndex]);
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowUp':
      case 'ArrowDown': {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          break;
        }
        const newIndex = highlightedIndex + (e.key === 'ArrowDown' ? 1 : -1);
        if (newIndex >= 0 && newIndex < options.length) {
          setHighlightedIndex(newIndex);
          const element = optionsRef.current?.children[newIndex];
          element?.scrollIntoView({ block: 'nearest' });
        }
        break;
      }
    }
  };

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
        {icon && <span className="mr-2 text-gray-400">{icon}</span>}
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`
          relative w-full text-left px-4 py-2.5 rounded-lg
          transition-all duration-200 ease-in-out
          ${disabled 
            ? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
            : 'bg-white hover:bg-gray-50 cursor-pointer'
          }
          ${isOpen 
            ? 'ring-2 ring-blue-500 border-transparent' 
            : 'border border-gray-300 hover:border-gray-400'
          }
          ${error ? 'border-red-500' : ''}
        `}
        aria-expanded={isOpen}
        aria-controls="select-options"
        disabled={disabled}
      >
        <span className={`block truncate ${value ? 'text-gray-900' : 'text-gray-500'}`}>
          {value || placeholder}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-200
              ${isOpen ? 'transform rotate-180' : ''}`}
          />
        </span>
      </button>

      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}

      {isOpen && (
        <div
          ref={optionsRef}
          className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 max-h-60 overflow-auto focus:outline-none"
          role="listbox"
          tabIndex={-1}
        >
          {options.map((option, index) => (
            <div
              key={option}
              role="option"
              aria-selected={option === value}
              data-selected={option === value}
              className={`
                flex items-center justify-between px-4 py-2 text-sm cursor-pointer
                ${option === value ? 'text-blue-600 bg-blue-50 font-medium' : 'text-gray-900'}
                ${highlightedIndex === index ? 'bg-gray-100' : ''}
                hover:bg-gray-100 transition-colors
              `}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <span className="truncate">{option}</span>
              {option === value && (
                <Check className="w-4 h-4 text-blue-600 ml-2" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};