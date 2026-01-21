import {useContext} from 'react';
import {AppContext} from "@app/contexts";

export default function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("Hook used out of the AppContextProvider");
    }
    return context;
}
