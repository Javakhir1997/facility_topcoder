import { useEffect, useRef, useState } from "react";

interface Value {
  value: string | number;
  label: string | number;
}
interface Props {
  allValue: Value[];
  value: (string | number)[];
  label: string;
  onChange: (value: (string | number)[]) => void;
  error?: string;
}

export default function MultiSelect({
  allValue,
  value,
  label,
  onChange,
  error,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const selectedValues: Value[] = allValue.filter((d) =>
    value.includes(d.value)
  );
  const handleSelect = (district: Value) => {
    onChange([...value, district.value]);
    setIsOpen(false);
  };
  function handleRemove(district: Value) {
    const updated = value.filter((v) => v !== district.value);
    onChange(updated);
  }
  

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", minWidth:"350px",maxWidth:"450px"  }}>
      <label
        htmlFor=""
        style={{
          color: "#a4a2a8",
          fontFamily: '"Inter-Regular", sans-serif',
          fontSize: "1rem",
          lineHeight: "1.015rem",
          fontWeight: 400,
          marginBottom: "0.7rem",
        }}
      >
        {label}
      </label>
      <div ref={wrapperRef} style={{ position: "relative", width: "100%" }}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: "100%",
            backgroundColor: "white",
            border: `${error ? "2px solid red" : "1px solid #ccc"}`,
            padding: "8px",
            borderRadius: "4px",
            cursor: "pointer",
            minHeight: "48px",
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
          }}
        >
          {selectedValues.map((d) => (
            <span
              key={d.value}
              style={{
                background: "#e5e5e5",
                padding: "2px 8px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "20px",
              }}
            >
              {d.label}
              <button
              type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(d);
                }}
                style={{
                  marginLeft: "4px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                ×
              </button>
            </span>
          ))}
          <span
            style={{
              marginLeft: "auto",
              color: "#999",
              fontSize: "16px",
              fontFamily: '"Inter-Regular", sans-serif',
              marginTop: "5px",
            }}
          >
            {selectedValues.length === allValue.length
              ? "All selected"
              : "Select..."}
          </span>
        </div>

        {isOpen && allValue.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "45px",
              left: 0,
              width: "100%",
              border: "1px solid #ccc",
              background: "white",
              borderRadius: "4px",
              zIndex: 10,
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {allValue.map((d) => {
              const isSelected = selectedValues.some(
                (sv) => sv.value === d.value
              );

              return (
                <div
                  key={d.value}
                  onClick={() => {
                    if (!isSelected) {
                      handleSelect(d);
                    }
                  }}
                  style={{
                    padding: "8px",
                    cursor: isSelected ? "not-allowed" : "pointer",
                    borderBottom: "1px solid #f0f0f0",
                    fontSize: "20px",
                    opacity: isSelected ? 0.5 : 1, 
                  }}
                >
                  {d.label}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {error && (
        <span
          style={{
            color: "red",
            marginTop: "4px",
            fontSize: "0.9rem",
            fontFamily: '"Inter-Regular", sans-serif',
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}
