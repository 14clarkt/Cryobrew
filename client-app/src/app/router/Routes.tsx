import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import APCDashboard from "../../features/actionPointCards/dashboard/APCDashboard";
import UserDetails from "../../features/users/userDetails/UserDetails";
import AlchemyDashboard from "../../features/alchemy/dashboard/AlchemyDashboard";
import EquipmentQualityDashboard from "../../features/equipmentQuality/dashboard/EquipmentQualityDashboard";
import SuppliesDashboard from "../../features/supplies/dashboard/SuppliesDashboard";
import RequireAuth from "./RequireAuth";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth />, children :[                
                {path: 'apc', element: <APCDashboard />},
                {path: 'alchemy', element: <AlchemyDashboard />},
                {path: 'equipmentQuality', element: <EquipmentQualityDashboard />},
                {path: 'supplies', element: <SuppliesDashboard />},
                
                {path: 'profile/:username', element: <UserDetails />},
                
                {path: 'errors', element: <TestErrors />},
            ]},
            {path: 'not-found', element: <NotFound />},
            {path: 'server-error', element: <ServerError />},

            {path: '*', element: <Navigate replace to='/not-found' />}, //essentially default
        ]
    }
]

export const router = createBrowserRouter(routes)