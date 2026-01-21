import { Input } from "@app/components";
import { Search } from "@app/assets";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { useDistricts, useSelect } from "@hooks/index";

interface FilterValue {
  valueName: string;
  data: string;
}

interface FilterInProjectPassportProps {
  handleFilter: (params: {
    name: string;
    value: string | string[] | number;
  }) => void;
}

interface ActiveFilters {
  search?: { type: string; query: string };
  region?: { id: number; label: string };
  district?: { id: number; label: string };
  status?: string;
  contract_term?: number;
}

export default function FilterInProjectPassport({
  handleFilter,
}: FilterInProjectPassportProps) {
  const { t } = useTranslation();

  const filterOptions: FilterValue[] = [
    { valueName: "Area", data: "area" },
    { valueName: "District", data: "district" },
    { valueName: "Contract term (year)", data: "contract_term" },
    { valueName: "Status", data: "status" },
  ];

  const searchOptions = [
    { value: "stir", label: "STIR" },
    { value: "owner_organization", label: "Owner organization" },
    { value: "private_partner", label: "Private partner" },
    { value: "reester_number", label: "Reester number" },
  ];

  const translatedOptions = searchOptions.map((opt) => ({
    ...opt,
    label: t(opt.label),
  }));

  const [selectedOption, setSelectedOption] = useState(translatedOptions[0]);

  const { data: regions = [] } = useSelect("region");
  const [regionId, setRegionId] = useState<number | null>(null);
  const { data: districts = [] } = useDistricts(regionId);
  const statuses = ["Approved", "Canceled"];

  const [hovered, setHovered] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});

  const handleRemoveFilter = (key: keyof ActiveFilters) => {
    const updated = {...activeFilters };
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
            placeholder={selectedOption.label}
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
          {activeFilters.region && (
            <FilterPill
              label={activeFilters.region.label}
              onRemove={() => handleRemoveFilter("region")}
            />
          )}
          {activeFilters.district && (
            <FilterPill
              label={activeFilters.district.label}
              onRemove={() => handleRemoveFilter("district")}
            />
          )}
          {activeFilters.status && (
            <FilterPill
              label={activeFilters.status}
              onRemove={() => handleRemoveFilter("status")}
            />
          )}
          {activeFilters.contract_term && (
            <FilterPill
              label={`Contract: ${activeFilters.contract_term}`}
              onRemove={() => handleRemoveFilter("contract_term")}
            />
          )}
        </div>
      </div>

      <div style={{ flexShrink: 0, position: "relative" }}>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {filterOptions.map((opt) => (
            <button
              key={opt.data}
              onClick={() =>
                setHovered((prev) =>
                  prev === opt.valueName ? null : opt.valueName
                )
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
              {t(opt.valueName)}
            </button>
          ))}
        </div>

        {hovered && (
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

            {hovered === "Area" && (
              <ul style={ulStyle}>
                {regions.map((region) => (
                  <li
                    key={region.value}
                    style={liStyle}
                    onClick={() => {
                      setActiveFilters((prev) => ({
                        ...prev,
                        region: { id: region.value, label: region.label },
                      }));
                      setRegionId(region.value);
                      handleFilter({ name: "region", value: region.value });
                      setHovered(null);
                    }}
                  >
                    {region.label}
                  </li>
                ))}
              </ul>
            )}

            {hovered === "District" && (
              <ul style={ulStyle}>
                {districts.length ? (
                  districts.map((d) => (
                    <li
                      key={d.value}
                      style={liStyle}
                      onClick={() => {
                        setActiveFilters((prev) => ({
                          ...prev,
                          district: { id: d.value, label: d.label },
                        }));
                        handleFilter({ name: "district", value: d.value });
                        setHovered(null);
                      }}
                    >
                      {d.label}
                    </li>
                  ))
                ) : (
                  <li style={{ padding: "8px" }}>{t("Select region first")}</li>
                )}
              </ul>
            )}

            {hovered === "Status" && (
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
            )}

            {hovered === "Contract term (year)" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  marginTop: "1rem",
                }}
              >
                <input
                  type="number"
                  placeholder={t("Contract term")}
                  style={{
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                  value={activeFilters.contract_term || ""}
                  onChange={(e) =>
                    setActiveFilters((prev) => ({
                      ...prev,
                      contract_term: +e.target.value,
                    }))
                  }
                />
                <button
                  style={{
                    padding: "8px",
                    background: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                  onClick={() => {
                    handleFilter({
                      name: "contract_term",
                      value: activeFilters.contract_term || "",
                    });
                    setHovered(null);
                  }}
                >
                  {t("Submit")}
                </button>
              </div>
            )}
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
  top: "50px", // Doim bir joy
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
