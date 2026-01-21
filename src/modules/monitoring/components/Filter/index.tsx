import {Select} from "@app/components";
import {deleteKeysFromObject, generateYearsList, getSearchParamsAsObject, getSelectValue} from "@app/shared";
import {FilterIcon} from "@app/assets";
import {useSearchParams} from "react-router-dom";

const Index = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const {year = "", ...params} = getSearchParamsAsObject(searchParams)

    return (
        <div className="flex items-center justify-end gap--3xl">
            <div className="flex items-center gap--lg">
                <Select
                    options={generateYearsList()}
                    type="filter"
                    id='year'
                    placeholder="Select the year"
                    icon={<FilterIcon/>}
                    value={getSelectValue(generateYearsList(), year ? Number(year) : new Date().getFullYear())}
                    defaultValue={getSelectValue(generateYearsList(), year ? Number(year) : new Date().getFullYear())}
                    handleOnChange={e => {
                        if (!e) {
                            const obj = deleteKeysFromObject(params, 'year')
                            setSearchParams(obj)
                        } else {
                            setSearchParams({...params, year: String(e)})
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default Index;