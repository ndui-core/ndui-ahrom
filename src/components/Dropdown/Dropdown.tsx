import React from "react";
import { useFormContext } from "react-hook-form";
import Select from "react-select";
import Chip from "../Chips/Chips";

export interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  name: string;
  options: Option[];
  label?: string;
  placeholder?: string;
  isMulti?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  isLoading?: boolean;
  error?: string;
  className?: string;
  onChange?: (value: any) => void;
  onInputChange?: (value: string) => void;
  customStyles?: any;
  isDisabled?: boolean;
  menuPlacement?: "auto" | "bottom" | "top";
}

const Dropdown: React.FC<DropdownProps> = ({
  name,
  options,
  label,
  placeholder = "انتخاب کنید...",
  isMulti = false,
  isSearchable = true,
  isClearable = true,
  isLoading = false,
  error,
  className = "",
  onChange,
  onInputChange,
  customStyles,
  isDisabled = false,
  menuPlacement = "auto"
}) => {
  const methods = useFormContext();
  const { register, setValue, watch } = methods || {};
  const value = watch?.(name);

  const handleChange = (selectedOption: any) => {
    if (isMulti) {
      const values = selectedOption ? selectedOption.map((opt: Option) => opt.value) : [];
      setValue?.(name, values, { shouldValidate: true });
    } else {
      const value = selectedOption ? selectedOption.value : null;
      setValue?.(name, value, { shouldValidate: true });
    }
    
    if (onChange) {
      onChange(selectedOption);
    }
  };

  // Convert form value to react-select format
  const getCurrentValue = () => {
    if (!value) return isMulti ? [] : null;

    if (isMulti) {
      return options.filter(option => value.includes(option.value));
    }
    
    return options.find(option => option.value === value) || null;
  };

  const customComponents = {
    MultiValue: ({ data, removeProps }: any) => (
      <Chip
        label={data.label}
        icon={data.icon}
        onDelete={removeProps.onClick}
        className="m-1 p-2"
        color="primary"
        variant="filled"
      />
    ),
    Option: ({ data, isSelected, isFocused, innerProps }: any) => (
      <div
        {...innerProps}
        className={`
          flex items-center gap-2 px-4 py-2 cursor-pointer
          ${isSelected ? 'bg-primary text-primary-content' : ''}
          ${!isSelected && isFocused ? 'bg-base-200' : ''}
        `}
      >
        {data.icon && <span>{data.icon}</span>}
        {data.label}
      </div>
    )
  };

  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}

      <Select
        {...register?.(name)}
        value={getCurrentValue()}
        onChange={handleChange}
        onInputChange={onInputChange}
        options={options}
        isMulti={isMulti}
        isSearchable={isSearchable}
        isClearable={isClearable}
        isLoading={isLoading}
        isDisabled={isDisabled}
        placeholder={placeholder}
        menuPlacement={menuPlacement}
        className={`${error ? 'select-error' : ''} ${className}`}
        classNames={{
          control: (state) => `
            input input-bordered
            ${error ? 'input-error' : ''}
            ${state.isFocused ? 'input-primary' : ''}
            !min-h-[2.5rem]
          `,
          menu: () => 'bg-base-100 shadow-lg rounded-lg mt-1 p-1',
          menuList: () => 'max-h-60',
          multiValue: () => 'bg-transparent',
          placeholder: () => 'text-base-content/50',
          noOptionsMessage: () => 'text-center py-2 text-base-content/50'
        }}
        components={customComponents}
        styles={customStyles}
      />

      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default Dropdown;