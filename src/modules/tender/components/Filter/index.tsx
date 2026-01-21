import {Input, } from "@app/components";
import {  Search} from "@app/assets";

const Index = () => {
    // const [appealStatus, setAppealStatus] = useState<string | undefined>(undefined);

    return (
        <div className="flex items-center justify-between gap--3xl">
            <Input
                id='search'
                placeholder='Search...'
                icon={<Search/>}
            />
            {/* <div className="flex items-center gap--lg">
                 <Select 
                    options={[]}
                    type="filter"
                    id='appeal-status'
                    placeholder="Appeal status"
                    icon={<FilterIcon/>}
                    value={getSelectValue([], appealStatus)}
                    defaultValue={getSelectValue([], appealStatus)}
                    handleOnChange={e => setAppealStatus(e as string)}
                /> 
            </div> */}
        </div>
    );
};

export default Index;