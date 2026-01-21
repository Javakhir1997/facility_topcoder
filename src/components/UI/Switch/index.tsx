import styles from './styles.module.scss'
import {FC} from 'react'
import classNames from 'classnames'
import {useTranslation} from 'react-i18next'
import {ISelectOption} from '@app/interfaces'


interface IProperties {
	onChange: (e: string | number) => void,
	value: string | number,
	items: ISelectOption[]
}

const Index: FC<IProperties> = ({items, value, onChange}) => {
	const {t} = useTranslation()

	return items?.length !== 0 ? (
			<div className={styles.root}>
				{
					items?.map(item => {
						return (
							<div
								key={item.value}
								className={classNames(styles.item, {[styles.active]: item.value === value})}
								onClick={() => onChange(item.value)}
							>
								{t(item.label as string)}
							</div>
						)
					})
				}
			</div>
		) :
		null
}

export default Index