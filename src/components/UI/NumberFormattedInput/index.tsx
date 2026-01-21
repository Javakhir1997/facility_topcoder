import styles from "@components/UI/Input/styles.module.css"
import CurrencyInput from "react-currency-input-field";
import {useTranslation} from "react-i18next";
import {FocusEvent, forwardRef} from 'react';
import {Input} from "@components/UI";

interface IProps {
    id: string
    label?: string
    error?: string
    placeholder?: string
    maxLength?: number
    disableGroupSeparators?: boolean
    allowDecimals?: boolean
    groupSeparator?: string
    value?: string | number 
    disabled?: boolean
    onChange?: (event: string) => void;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

const Index = forwardRef<HTMLInputElement, IProps>(({
                                                        disableGroupSeparators = false,
                                                        allowDecimals = true,
                                                        onBlur,
                                                        id,
                                                        label,
                                                        placeholder = "",
                                                        error,
                                                        maxLength = 15,
                                                        groupSeparator = " ",
                                                        value,
                                                        disabled,
                                                        onChange,
                                                        ...props
                                                    }, ref) => {
    const {t} = useTranslation()
    return (
        <Input
            id={id}
            type="text"
            label={label}
            error={error}
            value={value}
            disabled={disabled}
            {...props}
        >
            <CurrencyInput
                id="count"
                name="count"
                className={styles.input}
                disabled={disabled}
                data-title='input'
                placeholder={t(placeholder)}
                disableAbbreviations={true}
                allowDecimals={allowDecimals}
                allowNegativeValue={false}
                maxLength={maxLength}
                groupSeparator={groupSeparator}
                disableGroupSeparators={disableGroupSeparators}
                decimalSeparator="."
                ref={ref}
                defaultValue={value}
                value={value}
                autoComplete="off"
                onValueChange={value => !value ? onChange?.('') : onChange?.(value)}
                onBlur={onBlur}
                {...props}
            />
        </Input>
    );
});

export default Index;