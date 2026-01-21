import {PageLayout, PageTitle, Restricted, Tab} from '@app/components'
import {getSearchParamsAsObject, investmentTabOption, ROLE_LIST} from '@app/shared'
import {InvestmentsTable, MonitoringTable} from '@modules/investments/components'
import {useSearchParams} from 'react-router-dom'


const Index = () => {
	const [searchParams] = useSearchParams()
	const {tab = 'new'} = getSearchParamsAsObject(searchParams)

	return (
		<PageLayout>
			<PageTitle title="Investment obligation"/>
			<Restricted permittedRole={ROLE_LIST.REGION_OPERATOR}>
				<Tab tabs={investmentTabOption} query="tab" fallbackValue="new"/>
				{
					tab === 'new' ?
						<InvestmentsTable/> :
						<MonitoringTable/>
				}
			</Restricted>
			<Restricted permittedRole={[ROLE_LIST.HEAD, ROLE_LIST.APPLICANT, ROLE_LIST.OPERATOR]}>
				<MonitoringTable/>
			</Restricted>
		</PageLayout>
	)
}

export default Index