import {AppContextProvider} from '@app/contexts'
import {Outlet} from 'react-router-dom'
import {Layout} from '@app/components'
import {FC} from 'react'
import { Theme } from "@radix-ui/themes";
import './styles/global.css';

const Index: FC = () => (
    <AppContextProvider>
        <Theme>
            <Layout>
                <Outlet/>
            </Layout>
        </Theme>
    </AppContextProvider>
)

export default Index
