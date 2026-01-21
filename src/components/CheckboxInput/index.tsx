import { useTranslation } from "react-i18next";

export interface CheckboxInputProps {
  id: string;
  label?: string;
  checked: boolean | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckboxInput({
  id,
  label,
  checked,
  onChange,
}: CheckboxInputProps) {
  const {t}=useTranslation()
  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          alignItems: "start",
          gap: "0.3rem",
          marginBottom: "0.5rem",
          flexDirection: "column",
        }}
      >
        <label
          htmlFor={id}
          style={{
            color: "#aba2a8",
            fontFamily: "Inter-Regular",
            fontSize: "1rem",
            lineHeight: "1.015rem",
            fontWeight: "400",
            marginBottom: "0.2rem",
          }}
        >
          {t(`${label}`)}
        </label>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          style={{ width: "30px", height: "30px" }}
        />
      </div>
    </div>
  );
}
