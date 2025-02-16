import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

interface DateTimePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  showTimeSelect?: boolean;
  dateFormat?: string;
  label?: string;
  error?: string;
  className?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  selected,
  onChange,
  showTimeSelect = false,
  dateFormat = "MM/dd/yyyy",
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
      
      <ReactDatePicker
        selected={selected}
        onChange={onChange}
        showTimeSelect={showTimeSelect}
        dateFormat={dateFormat}
        className={`
          input input-bordered w-full
          ${error ? 'input-error' : ''}
          ${className}
        `}
      />
      
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default DateTimePicker;