import {ISelectOption} from '@app/interfaces'
import {Uz} from '@app/assets'
import {STATUS_LABEL, STATUS_LIST} from '@app/shared'
import {StaticOptionItem} from "@shared/types/general.ts";


const languageOptions: ISelectOption[] = [
	{value: 'uzb', label: 'uzb', icon: <Uz/>},
	{value: 'uz', label: 'uz', icon: <Uz/>}
]

const paginationOptions: ISelectOption[] = [
	{value: 5, label: '5'},
	{value: 10, label: '10'},
	{value: 20, label: '20'},
	{value: 50, label: '50'},
	{value: 100, label: '100'}
]

const appealStatusOptions: ISelectOption[] = [
	{
		value: 'positive',
		label: 'Positive'
	},
	{
		value: 'negative',
		label: 'Negative'
	}
]

const statusTabOptions: StaticOptionItem[] = [
	{
		value: STATUS_LIST.ALL,
		label: STATUS_LABEL[STATUS_LIST.ALL]
	},
	{
		value: STATUS_LIST.NEW,
		label: STATUS_LABEL[STATUS_LIST.NEW]
	},
	{
		value: STATUS_LIST.IN_PROCES,
		label: STATUS_LABEL[STATUS_LIST.IN_PROCES]
	},
	// {
	// 	value: STATUS_LIST.RETURNED,
	// 	label: STATUS_LABEL[STATUS_LIST.RETURNED]
	// },
	{
		value: STATUS_LIST.ACCEPTED,
		label: STATUS_LABEL[STATUS_LIST.ACCEPTED]
	},
	{
		value: STATUS_LIST.REJECTED,
		label: STATUS_LABEL[STATUS_LIST.REJECTED]
	}
]


const tenderStatus : StaticOptionItem[] = [
	{
		value: STATUS_LIST.ALL,
		label: STATUS_LABEL[STATUS_LIST.ALL]
	},
	{
		value: STATUS_LIST.IN_PROCES,
		label: STATUS_LABEL[STATUS_LIST.IN_PROCES]
	},
	{
		value: STATUS_LIST.COMPLETED,
		label: STATUS_LABEL[STATUS_LIST.COMPLETED]
	},
]

const exelTabOptions: ISelectOption[] = [
	{
		value: '1',
		label: '1-exel'
	},
	{
		value: '2',
		label: '2-exel'
	},
	{
		value: '3',
		label: '3-exel'
	},
	{
		value: '4',
		label: '4-exel'
	},
	{
		value: '5',
		label: '5-exel'
	},
	{
		value: '6',
		label: '6-exel'
	},
	{
		value: '7',
		label: '7-exel'
	},
	{
		value: '8',
		label: '8-exel'
	},
	{
		value: '9',
		label: '9-exel'
	},
	{
		value: '10',
		label: '10-exel'
	},
	{
		value: '11',
		label: '11-exel'
	},
	{
		value: '12',
		label: '12-exel'
	}
]

const exelOptions: ISelectOption[] = [
	{
		value: '1',
		headers: ['header1', 'header2', 'header2'],
		label: 'title1'
	}
]

const applicationTabOption: ISelectOption[] = [
	{
		value: STATUS_LIST.ALL,
		label: STATUS_LABEL[STATUS_LIST.ALL]
	},
	{
		value: STATUS_LIST.NEW,
		label: STATUS_LABEL[STATUS_LIST.NEW]
	},
	{
		value: STATUS_LIST.RESPONSE_IN_PROGRESS,
		label: STATUS_LABEL[STATUS_LIST.RESPONSE_IN_PROGRESS]
	},
	{
		value: STATUS_LIST.RETURNED,
		label: STATUS_LABEL[STATUS_LIST.RETURNED]
	},
	{
		value: STATUS_LIST.SENT_TO_MOF,
		label: STATUS_LABEL[STATUS_LIST.SENT_TO_MOF]
	},
	{
		value: STATUS_LIST.APPROVED,
		label: STATUS_LABEL[STATUS_LIST.APPROVED]
	},
	{
		value: STATUS_LIST.REJECTED,
		label: STATUS_LABEL[STATUS_LIST.REJECTED]
	}
]

const investmentTabOption: ISelectOption[] = [
	{
		value: STATUS_LIST.NEW,
		label: STATUS_LABEL[STATUS_LIST.NEW]
	},
	{
		value: STATUS_LIST.MONITORING,
		label: STATUS_LABEL[STATUS_LIST.MONITORING]
	}
]

const regionsOptions: ISelectOption[] = [
	{
		label: 'Fergana region',
		value: 13
	},
	{
		label: 'Tashkent region',
		value: 1
	},
	{
		label: 'Namangan region',
		value: 4
	},
	{
		label: 'Andijan region',
		value: 5
	},
	{
		label: 'Sirdarya region',
		value: 11
	},
	{
		label: 'Jizzakh region',
		value: 2
	},
	{
		label: 'Samarkand region',
		value: 6
	},
	{
		label: 'Kashkadarya region',
		value: 8
	},
	{
		label: 'Surkhandarya region',
		value: 9
	},
	{
		label: 'Republic of Karakalpakstan',
		value: 12
	},
	{
		label: 'Navoi region',
		value: 7
	},
	{
		label: 'Khorezm region',
		value: 10
	},
	{
		label: 'Bukhara region',
		value: 3
	},
	{
		label: 'Tashkent city',
		value: 14
	}
]

const booleanOptions: ISelectOption[] = [
	{
		value: 'true',
		label: 'Yes'
	},
	{
		value: 'false',
		label: 'No'
	}
]

const point3_2_options: ISelectOption[] = [
	{
		value: 'true',
		label: 'Investment program'
	},
	{
		value: 'false',
		label: 'Бошқа'
	}
]

const validityPeriodOptions: ISelectOption[] = [
	{
		value: '10',
		label: '10'
	},
	{
		value: '3-10',
		label: '3-10'
	},
	{
		value: '11-20',
		label: '11-20'
	},
	{
		value: '21-30',
		label: '21-30'
	},
	{
		value: '>30',
		label: '>30'
	}
]

const implementationPeriodOptions: ISelectOption[] = [
	{
		value: '2',
		label: '2'
	},
	{
		value: '2-10',
		label: '2-10'
	},
	{
		value: '11-20',
		label: '11-20'
	},
	{
		value: '21-30',
		label: '21-30'
	},
	{
		value: '>30',
		label: '>30'
	}
]

const sourceOfIncomeOptions: ISelectOption[] = [
	{
		value: 1,
		label: 'Usage fee'
	},
	{
		value: 2,
		label: 'Free usage fee'
	}
]

const feeForUseOptions: ISelectOption[] = [
	{
		value: 1,
		label: 'Fee for using state property'
	},
	{
		value: 2,
		label: 'Additional profit distribution'
	}
]

const initiativeOptions: ISelectOption[] = [
	{
		value: 1,
		label: 'State initiator'
	},
	{
		value: 2,
		label: 'Private initiator'
	}
]

const riskOptions: ISelectOption[] = [
	{
		value: 0,
		label: 'Public Partner'
	},
	{
		value: 1,
		label: 'General'
	},
	{
		value: 2,
		label: 'Private Partner'
	},
	{
		value: 3,
		label: 'Risk Distribution Basis'
	}
]
export const ownerTypeOptions: ISelectOption[] = [
	{value: 'yuridik', label: 'Yuridik shaxs'},
	{value: 'jismoniy', label: 'Jismoniy shaxs'}
]

export const stabilityRatingOptions: ISelectOption[] = [
	{value: 'yuqori', label: 'Yuqori'},
	{value: 'urta', label: 'O\'rta'},
	{value: 'qoniqarli', label: 'Qoniqarli'},
	{value: 'quyi_avtomat', label: 'Quyi avtomat'}
]

export const techniquesOptions: ISelectOption[] = [
	{value: '0', label: '0'},
	{value: '1', label: '1'},
	{value: '2+', label: '2+'}
]

export const financingOpportunityOptions: ISelectOption[] = [
	{value: 'hisobidan', label: 'O\'z hisobidan'},
	{value: 'kredit', label: 'Kredit'}
]



export {
	languageOptions,
	paginationOptions,
	appealStatusOptions,
	statusTabOptions,
	applicationTabOption,
	investmentTabOption,
	regionsOptions,
	booleanOptions,
	point3_2_options,
	validityPeriodOptions,
	implementationPeriodOptions,
	sourceOfIncomeOptions,
	feeForUseOptions,
	initiativeOptions,
	exelTabOptions,
	riskOptions,
	exelOptions,
	tenderStatus
}
