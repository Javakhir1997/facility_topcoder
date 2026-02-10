import React from "react";
import YearPicker from "../DataPicker";
import DatePicker from "@components/UI/DatePicker";

const FilterAndSort: React.FC<{}> = () => {
  const [year, setYear] = React.useState<number>();
  return (
    <div className="d-flex flex-column gap-10 bg-white rounded-xl px-6 pb-2">
      <DatePicker onChange={(e) => setYear(e?.getFullYear)} value={year} />
    </div>
  );
};

export default FilterAndSort;
