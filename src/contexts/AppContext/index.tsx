import {PropsWithChildren, createContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useUser} from '@app/hooks';
import {Loader} from '@app/components';
import {IAuthentication} from "@app/interfaces";
import {routeByRole} from "@app/shared";

interface IAppContext {
	user: IAuthentication
}

const AppContext = createContext<IAppContext | undefined>(undefined)

function AppContextProvider({children}: PropsWithChildren) {
	const {pathname} = useLocation()
	const navigate = useNavigate()
	const {user, isPending} = useUser()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (!isPending) {
			if (!user) {
				navigate('/login', {state: {from: pathname}})
			} else {
				if (pathname === '/') {
					navigate(routeByRole(user.role))
				}
				setIsLoading(false)
				// const timer = setTimeout(() => setIsLoading(false), 1250)
				// return () => clearTimeout(timer)
			}
		}
	}, [isPending, navigate, pathname, user])

	if (isPending || isLoading || !user) {
		return <Loader screen background/>
	}

	return (
		<AppContext.Provider value={{user}}>
			{children}
		</AppContext.Provider>
	)
}

export {AppContext, AppContextProvider}
