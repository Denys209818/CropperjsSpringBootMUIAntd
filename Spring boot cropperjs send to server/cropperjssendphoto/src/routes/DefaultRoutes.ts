import React from "react";

export interface RouteData 
{
    path: string,
    element: React.FC
}

const Main = React.lazy(() => import("../components/Default/Main/index"));

export const DefaultRoutes:Array<RouteData> = [
    {path: '/', element: Main}
];