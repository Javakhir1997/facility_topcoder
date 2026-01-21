import {Add, Delete} from '@app/assets'
import {Button, PageLayout, PageTitle, Restricted, Tab, Wrapper} from '@app/components'
import {BUTTON_THEME, exelTabOptions, ROLE_LIST} from '@app/shared'
import React, {LegacyRef, useRef} from 'react'
import {HotTable, HotTableClass} from '@handsontable/react'
import Handsontable from 'handsontable'
import 'handsontable/dist/handsontable.full.min.css'


const App: React.FC = () => {
	const hotTableRef = useRef<HotTable>(null)

	const addRow = (): void => {
		if (hotTableRef.current) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			const hotInstance = hotTableRef.current.hotInstance as Handsontable
			hotInstance.alter('insert_row_below')
		}
	}

	const removeLastRow = () => {
		if (hotTableRef.current) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			const hotInstance = hotTableRef.current.hotInstance
			const rowCount = hotInstance.countRows()
			if (rowCount > 1) {
				hotInstance.alter('remove_row', rowCount - 1)
			}
		}
	}

	const data: Handsontable.GridSettings['data'] = [['', '', '', ''],['', '', '', ''],['', '', '', ''],['', '', '', ''], ['', '', '', '']]

	return (
		<PageLayout>
			<PageTitle title="Reports">
				<Restricted permittedRole={ROLE_LIST.APPLICANT}>
					<div className="flex items-center justify-end gap--lg">
						<Button
							icon={<Add/>}
							onClick={addRow}
						>
							Create row
						</Button>
						<Button
							icon={<Delete/>}
							theme={BUTTON_THEME.DANGER_OUTLINE}
							onClick={removeLastRow}
						>
							Delete row
						</Button>
					</div>
				</Restricted>
			</PageTitle>
			<Tab tabs={exelTabOptions} query="tab" fallbackValue="all"/>
			<Wrapper>
				<HotTable
					className="handsontable"
					ref={hotTableRef as unknown as LegacyRef<HotTableClass>}
					data={data}
					// autoColumnSize={true}
					// autoRowSize={true}
					colHeaders={true}
					rowHeaders={false}
					rowHeights={40}
					stretchH="all"
					width="100%"
					height="auto"
					licenseKey="non-commercial-and-evaluation"
				/>
				<div>
					<Button>
						Submit
					</Button>
				</div>
			</Wrapper>

		</PageLayout>
	)
}

export default App
