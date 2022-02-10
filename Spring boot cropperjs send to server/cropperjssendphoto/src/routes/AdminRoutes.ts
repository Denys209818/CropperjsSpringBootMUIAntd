import React from "react";

export interface RouteData 
{
    path: string,
    element: React.FC
}

const Main = React.lazy(() => import("../components/Admin/Main/index"));


export const AdminRoutes: Array<RouteData> = [
    {path: '/admin', element: Main}
];