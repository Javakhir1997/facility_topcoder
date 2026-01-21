  import { Input } from "@app/components";
  import { Search } from "@app/assets";
  import { useState } from "react";
  import { useTranslation } from "react-i18next";
  import Select from "react-select";

  interface FilterInProjectProps {
    handleFilter: (params: {
      name: string;
      value: string | string[] | number;
    }) => void;
  }

  interface ActiveFilters {
    search?: { type: string; query: string };
    status?: string;
  }

  export default function FilterInProject({
    handleFilter,
  }: FilterInProjectProps) {
    const { t } = useTranslation();

    const searchOptions = [
      { value: "object_name", label: "Object name" },
      { value: "object_type", label: "Object type" },
      { value: "owner_organization", label: "Owner organization" },
    ];

    const translatedOptions = searchOptions.map((opt) => ({
      ...opt,
      label: t(opt.label),
    }));

    const [selectedOption, setSelectedOption] = useState(translatedOptions[0]);
    const [hovered, setHovered] = useState<string | null>(null);
    const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});

    const statuses = ["Positive", "Negative"];

    const handleRemoveFilter = (key: keyof ActiveFilters) => {
      const updated = { ...activeFilters };
      delete updated[key];
      setActiveFilters(updated);

      if (key === "search") {
        handleFilter({ name: "key", value: "" });
        handleFilter({ name: "query", value: "" });
      } else {
        handleFilter({ name: key, value: "" });
      }
    };

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        {/* Left: Search */}
        <div style={{ flexGrow: 1, minWidth: "300px" }}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Input
              id="search"
              value={activeFilters.search?.query || ""}
              placeholder={t(
                `${selectedOption.label}`
              )}
              icon={<Search />}
              onChange={(e) => {
                const query = e.target.value;

                setActiveFilters((prev) => {
                  if (!query) return { ...prev, search: undefined };
                  return {
                    ...prev,
                    search: { type: selectedOption.value, query },
                  };
                });

                if (!query) {
                  handleFilter({ name: "key", value: "" });
                  handleFilter({ name: "query", value: "" });
                } else {
                  handleFilter({ name: "key", value: selectedOption.value });
                  handleFilter({ name: "query", value: query });
                }
              }}
            />

            <Select
              styles={{
                control: (base) => ({
                  ...base,
                  minWidth: "200px",
                  borderRadius: "8px",
                  height: "46px",
                  borderColor: "#ccc",
                  boxShadow: "none",
                  fontFamily: "sans-serif",
                  fontSize: "16px",
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
              }}
              value={selectedOption}
              options={translatedOptions}
              onChange={(option) => option && setSelectedOption(option)}
            />
          </div>

          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            {activeFilters.status && (
              <FilterPill
                label={activeFilters.status}
                onRemove={() => handleRemoveFilter("status")}
              />
            )}
          </div>
        </div>

        {/* Right: Status Filter */}
        <div style={{ flexShrink: 0, position: "relative" }}>
          <button
            onClick={() =>
              setHovered((prev) => (prev === "Status" ? null : "Status"))
            }
            style={{
              background: "#f8f9fa",
              border: "1px solid #ccc",
              borderRadius: "6px",
              padding: "8px 16px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {t("Status")}
          </button>

          {hovered === "Status" && (
            <div style={dropdownStyle}>
              <button
                style={{
                  float: "right",
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                  fontSize: "1.25rem",
                }}
                onClick={() => setHovered(null)}
              >
                ✕
              </button>

              <ul style={ulStyle}>
                {statuses.map((status) => (
                  <li
                    key={status}
                    style={liStyle}
                    onClick={() => {
                      setActiveFilters((prev) => ({ ...prev, status }));
                      handleFilter({
                        name: "status",
                        value: status.toLowerCase(),
                      });
                      setHovered(null);
                    }}
                  >
                    {t(status)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  function FilterPill({
    label,
    onRemove,
  }: {
    label: string;
    onRemove: () => void;
  }) {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          background: "#e2e8f0",
          borderRadius: "9999px",
          padding: "6px 12px",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        {label}
        <button
          onClick={onRemove}
          style={{
            marginLeft: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: 700,
          }}
        >
          ✕
        </button>
      </span>
    );
  }

  const dropdownStyle: React.CSSProperties = {
    position: "absolute",
    top: "50px",
    right: 0,
    minWidth: "220px",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    zIndex: 1000,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  const ulStyle: React.CSSProperties = {
    listStyle: "none",
    margin: 0,
    padding: 0,
  };

  const liStyle: React.CSSProperties = {
    padding: "8px 12px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
    fontSize: "18px",
    fontWeight: 500,
    transition: "background 0.2s",
  };
