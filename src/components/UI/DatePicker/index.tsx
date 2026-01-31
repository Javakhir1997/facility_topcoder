import { Button } from "@shared/component/ui/button";
import { Calendar } from "./calendar";
import { FormControl } from "@shared/component/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shared/component/ui/popover";
import { cn } from "@shared/libraries/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";

export type DateDisableStrategy =
  | "before"
  | "after"
  | "range"
  | "custom"
  | "none";

export type DatePickerProps = {
  value: Date | undefined | number | null;
  onChange: (date: Date | undefined) => void;
  dateFormat?: string;
  placeholder?: string;
  disableStrategy?: DateDisableStrategy;
  customDisabledFn?: (date: Date) => boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  buttonVariant?: "default" | "outline" | "ghost";
  disabled?: boolean;
  icon?: React.ReactNode;
};

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  dateFormat = "dd.MM.yyyy",
  placeholder = "Sana tanlang",
  disableStrategy = "none",
  customDisabledFn,
  minDate,
  maxDate,
  className,
  buttonVariant = "outline",
  disabled = false,
  icon = <CalendarIcon className="ml-auto size-4 opacity-50" />,
}) => {
  const [isShow, setIsShow] = useState(false);

  const getDisabledDates = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    switch (disableStrategy) {
      case "before":
        return date < today;
      case "after":
        return date > today;
      case "range":
        if (minDate && maxDate) {
          return date < minDate || date > maxDate;
        }
        return false;
      case "custom":
        return customDisabledFn ? customDisabledFn(date) : false;
      case "none":
      default:
        return false;
    }
  };

  return (
    <Popover open={isShow} onOpenChange={(val) => setIsShow(val)}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={buttonVariant}
            disabled={disabled}
            className={cn(
              "w-full  h-[50px] rounded-[16px] border-[#E8E8EA] pl-3 text-left font-normal",
              !value && "text-neutral-350",
              className,
            )}
          >
            {value ? format(value, dateFormat) : <span>{placeholder}</span>}
            {icon}
          </Button>
        </FormControl>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(value) => {
            onChange(value);
            setIsShow(false);
          }}
          disabled={getDisabledDates}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
