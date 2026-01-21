import {getFilterSelectStyles, getLanguageSelectStyles, getSelectStyles} from "@app/shared";
import Select, {
    components,
    DropdownIndicatorProps,
    PlaceholderProps,
    SingleValueProps,
    MultiValueProps,
    SelectInstance,
    StylesConfig,
    NoticeProps,
    OptionProps,
    GroupBase
} from "react-select";
import {forwardRef, LegacyRef, useMemo} from "react";
import {Form, Language, Filter} from "@app/assets";
import { Input} from "@components/UI";
import {ISelect, ISelectOption} from "@app/interfaces";
import {useTranslation} from "react-i18next";

const SingleValue = (props: SingleValueProps<ISelectOption>) => {
    const {t} = useTranslation()
    return (
        <components.SingleValue {...props}>
            {props.data.icon ? props.data.icon : null}
            {props.data.label ? t(props.data.label.toString()) : ""}
        </components.SingleValue>
    )
}

const Option = (props: OptionProps<ISelectOption>) => {
    const {t} = useTranslation()
    return (
        <components.Option {...props}>
            {props.data.icon ? props.data.icon : null}
            <span>{props.data.label ? t(props.data.label.toString()) : ""}</span>
        </components.Option>
    )
}

const DropdownIndicator = (props: DropdownIndicatorProps<ISelectOption>) => (
    <components.DropdownIndicator {...props}>
        <Form/>
    </components.DropdownIndicator>
)

const LanguageDropdownIndicator = (props: DropdownIndicatorProps<ISelectOption>) => (
    <components.DropdownIndicator {...props}>
        <Language/>
    </components.DropdownIndicator>
)

const FilterDropdownIndicator = (props: DropdownIndicatorProps<ISelectOption>) => (
    <components.DropdownIndicator {...props}>
        <Filter/>
    </components.DropdownIndicator>
)

const NoOptionsMessage = (props: NoticeProps<ISelectOption>) => {
    const {t} = useTranslation();
    return (
        <components.NoOptionsMessage {...props}>
            {t("No matching results found")}
        </components.NoOptionsMessage>
    )
}
const NoMessage = (props: NoticeProps<ISelectOption>) => {
    return (
        <components.NoOptionsMessage {...props}>
            📂
        </components.NoOptionsMessage>
    )
}

const MultiValue = (props: MultiValueProps<ISelectOption>) => {
    const {t} = useTranslation();

    return (
        <components.MultiValue {...props}>
            {props.data.label ? t(props.data.label.toString()) : ""}
        </components.MultiValue>
    );
};

const IndicatorSeparator = () => null

const Index = forwardRef<SelectInstance<ISelectOption>, ISelect>((props, ref) => {
    const {t} = useTranslation()

    const Placeholder = useMemo(() => {
        if (props.type === "filter") {
            return (properties: PlaceholderProps<ISelectOption>) => {
                return (
                    <components.Placeholder {...properties}>
                        {props.icon ? props?.icon : null}
                        {properties.children}
                    </components.Placeholder>
                );
            }
        } else {
            return (properties: PlaceholderProps<ISelectOption>) => {
                return (
                    <components.Placeholder {...properties}>
                        {properties.children}
                    </components.Placeholder>
                );
            }
        }
    }, [props.icon, props.type])

    const styles = useMemo(() => {
        if (props.type === "filter") {
            return getFilterSelectStyles(props.top) as StylesConfig<ISelectOption, boolean, GroupBase<ISelectOption>>
        } else if (props.type === "language") {
            return getLanguageSelectStyles(props.top) as StylesConfig<ISelectOption, boolean, GroupBase<ISelectOption>>
        }
        return getSelectStyles(!!props.error, props.top) as StylesConfig<ISelectOption, boolean, GroupBase<ISelectOption>>
    }, [props.type, props.top, props.error])
    return (
        <Input id={props.id} label={props.label} error={props.error} disabled={props.disabled}>
            <Select
                styles={styles}
                menuPlacement={props.top ? "top" : "bottom"}
                hideSelectedOptions
                isDisabled={props.disabled}
                isSearchable
                isClearable={false}
                {...props}
                placeholder={props.placeholder ? t(props.placeholder) : t("Choose")}
                ref={ref as LegacyRef<SelectInstance<ISelectOption, boolean, GroupBase<ISelectOption>>>}
                onChange={(value) => {
                    if (Array.isArray(value)) {
                        props.handleOnChange?.(value.map((v) => v?.value));
                    } else {
                        const option = value as ISelectOption;
                        props.handleOnChange?.(option?.value ?? null);
                    }
                }}
                components={{
                    DropdownIndicator: props.disabled ? null : props.type === "filter" ? FilterDropdownIndicator : props.type === "language" ? LanguageDropdownIndicator : DropdownIndicator,
                    IndicatorSeparator,
                    NoOptionsMessage: props.type !== "form" ? NoMessage : NoOptionsMessage,
                    SingleValue,
                    Placeholder,
                    MultiValue,
                    Option,
                }}
            />
        </Input>
    )
})

export default Index;
