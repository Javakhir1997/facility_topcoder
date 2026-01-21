import {
    DropdownIndicatorProps,
    CSSObjectWithLabel,
    ControlProps,
    OptionProps
} from "react-select";

const getSelectStyles = (error?: boolean, top?: boolean) => ({
    'control': (base: CSSObjectWithLabel, state: ControlProps) => ({
        ...base,
        border: error ? "1px solid var(--color-red-1)!important" : state.isFocused ? "1px solid var(--color-blue-2)" : "1px solid var(--color-gray-light-1)",
        boxShadow: error ? "0 0 0 1px var(--color-red-1)!important" : state.isFocused ? "0 0 0 1px var(--color-blue-2)" : "none",
        backgroundColor: "#FFF",
        padding: "0.5rem 1.2rem",
        borderRadius: "1rem",
        fontFamily: "\"Inter-Medium\", sans-serif",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "1rem",
        lineHeight: "2rem",
        cursor: "pointer",
        outline: "none",
        gap: "0.5rem",
        color: "var(--color-gray-2)",
        width: "100%",
        transition: "all ease-in-out 0.15s",
        "&:hover": {
            borderColor: state.isFocused ? "var(--color-blue-2)" : "var(--color-gray-light-1)"
        }
    }),
    'valueContainer': (base: CSSObjectWithLabel) => ({
        ...base,
        padding: 0,
    }),
    'placeholder': (base: CSSObjectWithLabel) => ({
        ...base,
        color: "var(--color-gray-6)",
        gap: "0.5rem",
        display: "flex",
        alignItems: "center",
        borderRadius: "1rem",
        fontFamily: "\"Inter-Regular\", sans-serif",
        fontStyle: "normal",
        fontWeight: "400",
    }),
    'singleValue': (base: CSSObjectWithLabel) => ({
        ...base,
        margin: 0,
        padding: 0,
        gap: "0.5rem",
        display: "flex",
        alignItems: "center",
        color: "var(--color-gray-2)"
    }),
    'input': (base: CSSObjectWithLabel) => ({
        ...base,
        margin: 0,
        padding: 0,
        color: "var(--color-gray-2)",
    }),
    'dropdownIndicator': (base: CSSObjectWithLabel, state: DropdownIndicatorProps) => ({
        ...base,
        padding: 0,
        transition: "all .3s ease-out",
        transform: state.selectProps.menuIsOpen
            ? "rotate(-180deg)"
            : null,
    }),
    'clearIndicator': (base: CSSObjectWithLabel) => ({
        ...base,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& svg": {
            "& path": {
                strokeWidth: .01,
            }
        }
    }),
    'menu': (base: CSSObjectWithLabel) => ({
        ...base,
        margin: 0,
        zIndex: "11",
        top: top ? "auto" : "calc(100% + .3rem)",
        backgroundColor: "var(--color-white)",
        borderRadius: ".5rem",
        padding: ".1rem 0",
        overflow: "hidden",
        minWidth: "calc(100%)",
        width: "auto"
    }),
    'menuList': (base: CSSObjectWithLabel) => ({
        ...base,
        margin: 0
    }),
    'option': (base: CSSObjectWithLabel, state: OptionProps) => ({
        ...base,
        padding: "1rem 1.2rem",
        fontFamily: "\"Inter-Medium\", sans-serif",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "1rem",
        lineHeight: "1rem",
        gap: "0.5rem",
        display: "flex",
        alignItems: "center",
        textAlign: "start",
        color: state.isSelected || state.isFocused
            ? "var(--color-blue-2)" : "var(--color-gray-2)",
        backgroundColor: state.isSelected || state.isFocused
            ? "var(--color-blue-light-2)"
            : "transparent",
        cursor: "pointer",
        "&:active": {
            backgroundColor: state.isSelected || state.isFocused
                ? "var(--color-blue-light-1)"
                : "transparent",
        }
    }),
    'noOptionsMessage': (base: CSSObjectWithLabel) => ({
        ...base,
        padding: ".8rem 1rem",
        fontFamily: "\"Inter-Medium\", sans-serif",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "1rem",
        lineHeight: "1rem",
        color: "var(--color-gray-2)",
        cursor: "not-allowed",
    }),
    'multiValue': (base: CSSObjectWithLabel) => ({
        ...base,
        "& div:first-of-type": {
            padding: ".2rem .3rem .2rem .5rem",
            whiteSpace: "wrap!important"
        },
        "& svg": {
            fill: "#9A9A9A"
        },
        '& div[role="button"]': {
            padding: ".2rem .5rem",
        },
        '& div[role="button"]:hover svg': {
            fill: "var(--color-red-1)"
        }
    })
})

const getFilterSelectStyles = (top?: boolean) => ({
    'control': (base: CSSObjectWithLabel, state: ControlProps) => ({
        ...base,
        border: state.isFocused ? "1px solid var(--color-blue-2)" : "1px solid var(--color-gray-light-1)",
        boxShadow: state.isFocused ? "0 0 0 1px var(--color-blue-2)" : "none",
        backgroundColor: "#F0F0F0",
        padding: "0.5rem 0.5rem 0.5rem 0.8rem",
        borderRadius: "0.5rem",
        fontFamily: "\"Golos-Medium\", sans-serif",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: ".875rem",
        lineHeight: "130%",
        letterSpacing: "0.035rem",
        cursor: "pointer",
        overflow: "hidden",
        outline: "none",
        gap: "0.5rem",
        color: "var(--color-gray-2)",
        width: "100%",
        transition: "all ease-in-out 0.15s",
        "&:hover": {
            borderColor: state.isFocused ? "var(--color-blue-2)" : "var(--color-gray-light-1)"
        }
    }),
    'valueContainer': (base: CSSObjectWithLabel) => ({
        ...base,
        padding: 0,
    }),
    'placeholder': (base: CSSObjectWithLabel) => ({
        ...base,
        fontFamily: "\"Golos-Medium\", sans-serif",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: ".875rem",
        lineHeight: "130%",
        letterSpacing: "0.035rem",
        color: "var(--color-gray-2)",
        gap: "0.5rem",
        display: "flex",
        alignItems: "center",
    }),
    'singleValue': (base: CSSObjectWithLabel) => ({
        ...base,
        margin: 0,
        padding: 0,
        gap: "0.5rem",
        display: "flex",
        alignItems: "center",
        color: "var(--color-gray-2)"
    }),
    'input': (base: CSSObjectWithLabel) => ({
        ...base,
        margin: 0,
        padding: 0,
        color: "var(--color-gray-2)",
    }),
    'dropdownIndicator': (base: CSSObjectWithLabel, state: DropdownIndicatorProps) => ({
        ...base,
        padding: 0,
        transition: "all .3s ease-out",
        transform: state.selectProps.menuIsOpen
            ? "rotate(-180deg)"
            : null,
    }),
    'clearIndicator': (base: CSSObjectWithLabel) => ({
        ...base,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& svg": {
            "& path": {
                strokeWidth: .01,
            }
        }
    }),
    'menu': (base: CSSObjectWithLabel) => ({
        ...base,
        margin: 0,
        zIndex: "11",
        top: top ? "auto" : "calc(100% + .3rem)",
        backgroundColor: "var(--color-white)",
        borderRadius: ".5rem",
        padding: ".1rem 0",
        overflow: "hidden",
        minWidth: "calc(100%)",
        width: "auto"
    }),
    'menuList': (base: CSSObjectWithLabel) => ({
        ...base,
        margin: 0
    }),
    'option': (base: CSSObjectWithLabel, state: OptionProps) => ({
        ...base,
        padding: "1rem 1.2rem",
        fontFamily: "\"Golos-Medium\", sans-serif",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "1rem",
        lineHeight: "1rem",
        gap: "0.5rem",
        display: "flex",
        alignItems: "center",
        textAlign: "start",
        color: state.isSelected || state.isFocused
            ? "var(--color-blue-2)" : "var(--color-gray-2)",
        backgroundColor: state.isSelected || state.isFocused
            ? "var(--color-blue-light-2)"
            : "transparent",
        cursor: "pointer",
        "&:active": {
            backgroundColor: state.isSelected || state.isFocused
                ? "var(--color-blue-light-1)"
                : "transparent",
        }
    }),
    'noOptionsMessage': (base: CSSObjectWithLabel) => ({
        ...base,
        padding: ".5rem 1rem",
        fontFamily: "\"Golos-Medium\", sans-serif",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: ".875rem",
        lineHeight: "130%",
        letterSpacing: "0.035rem",
        color: "var(--color-gray-2)",
        cursor: "not-allowed",
    }),
    'multiValue': (base: CSSObjectWithLabel) => ({
        ...base,
        "& div:first-of-type": {
            padding: ".2rem .3rem .2rem .5rem",
            whiteSpace: "wrap!important"
        },
        "& svg": {
            fill: "#9A9A9A"
        },
        '& div[role="button"]': {
            padding: ".2rem .5rem",
        },
        '& div[role="button"]:hover svg': {
            fill: "var(--color-red-1)"
        }
    })
})


const getLanguageSelectStyles = (top?: boolean) => ({
    'control': (base: CSSObjectWithLabel) => ({
        ...base,
        border: "none",
        boxShadow: "none",
        backgroundColor: "#FFF",
        padding: "0.5rem 0.7rem",
        borderRadius: "1rem",
        color: "#222",
        fontFamily: "\"Golos-Regular\",sans-serif",
        fontSize: "1rem",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "130%",
        cursor: "pointer",
        outline: "none",
        width: "100%",
        gap: "0.5rem",
        transition: "all ease-in-out 0.15s",
        "&:hover": {
            borderColor: "none"
        }
    }),
    'valueContainer': (base: CSSObjectWithLabel) => ({
        ...base,
        padding: 0,
    }),
    'placeholder': (base: CSSObjectWithLabel) => ({
        ...base,
        color: "var(--color-gray-6)",
        gap: "0.5rem",
        display: "flex",
        alignItems: "center",
    }),
    'singleValue': (base: CSSObjectWithLabel) => ({
        ...base,
        margin: 0,
        padding: 0,
        gap: "0.5rem",
        display: "flex",
        alignItems: "center",
        color: "var(--color-gray-2)"
    }),
    'input': (base: CSSObjectWithLabel) => ({
        ...base,
        margin: 0,
        padding: 0,
        color: "var(--color-gray-2)",
    }),
    'dropdownIndicator': (base: CSSObjectWithLabel, state: DropdownIndicatorProps) => ({
        ...base,
        padding: 0,
        transition: "all .3s ease-out",
        transform: state.selectProps.menuIsOpen
            ? "rotate(-180deg)"
            : null,
    }),
    'clearIndicator': (base: CSSObjectWithLabel) => ({
        ...base,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& svg": {
            "& path": {
                strokeWidth: .01,
            }
        }
    }),
    'menu': (base: CSSObjectWithLabel) => ({
        ...base,
        margin: 0,
        zIndex: "11",
        top: top ? "auto" : "calc(100% + .3rem)",
        backgroundColor: "var(--color-white)",
        borderRadius: ".5rem",
        padding: ".1rem 0",
        overflow: "hidden",
        minWidth: "calc(100%)",
        right: '0',
        width: "auto"
    }),
    'menuList': (base: CSSObjectWithLabel) => ({
        ...base,
        margin: 0
    }),
    'option': (base: CSSObjectWithLabel, state: OptionProps) => ({
        ...base,
        display: "flex",
        gap: ".5rem",
        alignItems: "center",
        padding: ".8rem 1.2rem",
        fontFamily: "\"Golos-Medium\", sans-serif",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "1rem",
        lineHeight: "1rem",
        textAlign: "start",
        color: state.isSelected || state.isFocused
            ? "var(--color-blue-2)" : "var(--color-gray-2)",
        backgroundColor: state.isSelected || state.isFocused
            ? "var(--color-blue-light-2)"
            : "transparent",
        cursor: "pointer",
        "&:active": {
            backgroundColor: state.isSelected || state.isFocused
                ? "var(--color-blue-light-1)"
                : "transparent",
        },
        "& span": {
            display: "inline-block",
            whiteSpace: "nowrap!important",
        }
    }),
    'noOptionsMessage': (base: CSSObjectWithLabel) => ({
        ...base,
        padding: ".5rem 1rem",
        fontFamily: "\"Golos-Medium\", sans-serif",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "1rem",
        lineHeight: "1rem",
        color: "var(--color-gray-2)",
        cursor: "not-allowed",
    }),
    'multiValue': (base: CSSObjectWithLabel) => ({
        ...base,
        "& div:first-of-type": {
            padding: ".2rem .3rem .2rem .5rem",
            whiteSpace: "wrap!important"
        },
        "& svg": {
            fill: "#9A9A9A"
        },
        '& div[role="button"]': {
            padding: ".2rem .5rem",
        },
        '& div[role="button"]:hover svg': {
            fill: "var(--color-red-1)"
        }
    })
})


export {
    getLanguageSelectStyles,
    getFilterSelectStyles,
    getSelectStyles,
}