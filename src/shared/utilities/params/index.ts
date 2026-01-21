import {ISearchParams} from "@app/interfaces";

function getSearchParamsAsObject(searchParams: URLSearchParams): ISearchParams {
    const params: ISearchParams = {};
    searchParams.forEach((value, key) => {
        params[key] = value
    })
    return params
}

const deleteKeysFromObject = (obj: ISearchParams, keysToDelete: string[] | string): ISearchParams => {
    const newObj = {...obj}
    if (Array.isArray(keysToDelete)) {
        keysToDelete.forEach((key) => {
            delete newObj[key]
        })
    } else {
        delete newObj[keysToDelete]
    }

    return newObj
};


export {
    getSearchParamsAsObject,
    deleteKeysFromObject
}