import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface YearPickerProps {
  value?: number;
  onChange: (year: number) => void;
}

const CustomInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ value, onClick, placeholder }, ref) => (
  <div className="relative max-w-sm">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <svg
        className="w-4 h-4 text-body"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
        />
      </svg>
    </div>

    <input
      ref={ref}
      value={value}
      onClick={onClick}
      readOnly
      placeholder={placeholder}
      className="block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
    />
  </div>
));

CustomInput.displayName = "CustomInput";

const YearPicker: React.FC<YearPickerProps> = ({ value, onChange }) => {
  return (
    <DatePicker
      selected={value ? new Date(value, 0) : null}
      onChange={(date: Date | null) => {
        if (date) {
          onChange(date.getFullYear());
        }
      }}
      showYearPicker
      dateFormat="yyyy"
      customInput={<CustomInput placeholder="Select year" />}
    />
  );
};

export default YearPicker;
