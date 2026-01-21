import InputMask from 'react-input-mask'
import classes from '@components/UI/Input/styles.module.css'
import {forwardRef} from 'react'
import {Input} from '@components/UI'
import {useTranslation} from 'react-i18next'


interface IProps {
	id: string
	label?: string
	error?: string
	placeholder: string
	value?: any
	mask?: string
	disabled?: boolean
	onChange: (value: any) => void
	onBlur: (value: any) => void
}

const Index = forwardRef<HTMLInputElement, IProps>(({
	                                                    id,
	                                                    label,
	                                                    placeholder = '',
	                                                    mask = '+\\9\\98 99 999 99 99',
	                                                    error,
	                                                    disabled,
	                                                    value,
	                                                    onChange,
	                                                    onBlur
                                                    }, ref) => {
	const {t} = useTranslation()

	return (
		<Input
			id={id}
			type="text"
			label={label}
			error={error}
			disabled={disabled}
		>
			<InputMask
				disabled={disabled}
				data-title="input"
				maskChar=""
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				mask={mask}
				placeholder={t(placeholder)}
				inputRef={ref}
				className={classes.input}
			/>
		</Input>
	)
})

export default Index