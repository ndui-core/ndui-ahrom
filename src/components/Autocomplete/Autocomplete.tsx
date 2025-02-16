import React from 'react';
import Select from 'react-select';

interface Option {
  label: string;
  value: any;
}

interface AutocompleteProps {
  options: Option[];
  value: Option | null;
  onChange: (option: Option | null) => void;
  isMulti?: boolean;
  isLoading?: boolean;
  label?: string;
  error?: string;
  className?: string;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  value,
  onChange,
  isMulti = false,
  isLoading = false,
  label,
  error,
  className = ''
}) => {
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      
      <Select
        options={options}
        value={value}
        onChange={onChange}
        isMulti={isMulti}
        isLoading={isLoading}
        className={className}
        classNames={{
          control: (state) => `
            input input-bordered
            ${error ? 'input-error' : ''}
            ${state.isFocused ? 'input-primary' : ''}
          `
        }}
      />
      
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default Autocomplete;