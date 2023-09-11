import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/Form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import APCDashboard from "../../features/actionPointCards/dashboard/APCDashboard";
import UserDetails from "../../features/users/userDetails/UserDetails";
import AlchemyDashboard from "../../features/alchemy/dashboard/AlchemyDashboard";
import EquipmentQualityDashboard from "../../features/equipmentQuality/dashboard/EquipmentQualityDashboard";
import SuppliesDashboard from "../../features/supplies/dashboard/SuppliesDashboard";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: 'activities', element: <ActivityDashboard />},
            {path: 'activities/:id', element: <ActivityDetails />},
            {path: 'createActivity', element: <ActivityForm key='create'/>}, //key: to NOT preserve state
            {path: 'manage/:id', element: <ActivityForm key='manage'/>},     //between both pages
            
            {path: 'apc', element: <APCDashboard />},
            {path: 'alchemy', element: <AlchemyDashboard />},
            {path: 'equipmentQuality', element: <EquipmentQualityDashboard />},
            {path: 'supplies', element: <SuppliesDashboard />},
            
            {path: 'profile/:username', element: <UserDetails />},

            {path: 'errors', element: <TestErrors />},
            {path: 'not-found', element: <NotFound />},
            {path: 'server-error', element: <ServerError />},

            {path: '*', element: <Navigate replace to='/not-found' />}, //essentially default
        ]
    }
]

export const router = createBrowserRouter(routes)