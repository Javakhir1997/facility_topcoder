import Select from "react-select";
interface SelectProps {
  options: { value: number; label: string }[];
  value: { id: number; name: string } | null;
  onBlur: () => void;
  handleOnChange: (option: { value: number; label: string } | null) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  id?: string;
}
export const ProjectPassportObjectSelect = ({
  options,
  value,
  onBlur,
  handleOnChange,
  placeholder,
  label,
  error,
  id,
}: SelectProps) => {

  return (
    <div style={{ fontFamily: "Inter-Medium" }}>
      {label && (
        <label htmlFor={id} style={{ fontSize: "14px", color: "#6b7280" }}>
          {label}
        </label>
      )}
      <Select
        inputId={id}
        options={options}
        value={value ? { value: value.id, label: value.name } : null}
        onChange={(selected) => {
          const found =
            options.find((opt) => opt.value === selected?.value) || null;
          handleOnChange(found);
        }}
        onBlur={onBlur}
        placeholder={placeholder || "Select..."}
        menuPosition="fixed"
        styles={{
          control: (base, state) => ({
            ...base,
            minWidth: "220px",
            borderRadius: "15px",
            height: "50px",
            borderColor: error ? "red" : "#d1d5db",
            boxShadow: state.isFocused ? "0 0 0 1px #2563eb" : "none",
            "&:hover": { borderColor: "#2563eb" },
          }),
          menu: (base) => ({
            ...base,
            zIndex: 9999,
          }),
          menuList: (base) => ({
            ...base,
            maxHeight: 200,
            overflowY: "auto",
          }),
          option: (base) => ({
            ...base,
            fontFamily: "Inter-Medium",
            fontSize: "16px",
            cursor: "pointer",
          }),
        }}
      />
      {error && (
        <span
          style={{
            color: "red",
            fontSize: "14px",
            marginTop: "2px",
            fontFamily: "Inter-Regular",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
};
