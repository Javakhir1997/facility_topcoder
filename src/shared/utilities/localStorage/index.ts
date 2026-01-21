const getLocalStorage = <T>(name: string): T | null => {
    try {
        const item = localStorage.getItem(name)
        return item ? JSON.parse(item) as T : null
    } catch (error) {
        console.error(`Error parsing localStorage item "${name}":`, error)
        return null
    }
}

const saveToLocalStorage = <T>(data: T, name: string): void => {
    try {
        localStorage.setItem(name, JSON.stringify(data))
    } catch (error) {
        console.error(`Error saving data to localStorage with key "${name}":`, error)
    }
}

export {
    getLocalStorage,
    saveToLocalStorage
}