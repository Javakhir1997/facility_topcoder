import {Input} from "@app/components";
import {Search} from "@app/assets";
// import {getSelectValue} from "@app/shared";
// import {useState} from "react";

const Index = () => {
    // const [destination, setDestination] = useState<string | undefined>(undefined);

    return (
        <div className="flex items-center justify-between gap--3xl">
            <Input
                id='search'
                placeholder='Search...'
                icon={<Search/>}
            />
            <div className="flex items-center gap--lg">
                {/*<Select*/}
                {/*    options={[]}*/}
                {/*    type="filter"*/}
                {/*    id='destination'*/}
                {/*    placeholder="Destination"*/}
                {/*    value={getSelectValue([], destination)}*/}
                {/*    icon={<Destination/>}*/}
                {/*    defaultValue={getSelectValue([], destination)}*/}
                {/*    handleOnChange={e => setDestination(e as string)}*/}
                {/*/>*/}
            </div>
        </div>
    );
};

export default Index;