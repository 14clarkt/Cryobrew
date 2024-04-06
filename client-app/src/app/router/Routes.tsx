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
import CrystalsDashboard from "../../features/crystals/dashboard/CrystalsDashboard";
import AidenDashboard from "../../features/aiden/dashboard/AidenDashboard";
import CrelicDashboard from "../../features/crelics/dashboard/CrelicDashboard";
import EnchantingDashboard from "../../features/enchanting/dashboard/EnchantingDashboard";
import Sokoban from "../../features/puzzles/sokoban/Sokoban";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth />, children :[                
                {path: 'apc', element: <APCDashboard />},
                {path: 'alchemy', element: <AlchemyDashboard />},
                {path: 'equipmentQuality', element: <EquipmentQualityDashboard />},
                {path: 'enchanting', element: <EnchantingDashboard />},
                {path: 'supplies', element: <SuppliesDashboard />},
                {path: 'crystals', element: <CrystalsDashboard />},
                {path: 'aiden', element: <AidenDashboard />},
                {path: 'crelics', element: <CrelicDashboard />},
                {path: 'puzzles', element: <Sokoban />},
                
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