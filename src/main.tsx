import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {RouterProvider} from "react-router-dom";
import {createRoot} from 'react-dom/client';
import {router} from "@app/configurations";
import {Alert} from "@app/components";
import '@styles/main.scss';
import '@app/i18n';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        }
    }
})


createRoot(document.getElementById('root')!)
    .render(
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false}/>
            <Alert/>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    )
