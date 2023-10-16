import { RouteObject } from "react-router-dom";

import { Layout } from "@/components/layout";
import { TripsPage } from "@/pages/trips.page";
import { TripDetailsPage } from "@/pages/trip-details.page";

const normalRoutes: RouteObject = {
  path: "*",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <TripsPage />,
    },
    {
      path: "trips/:tripId",
      children: [
        {
          path: "",
          element: <TripDetailsPage />,
        },
      ],
    },
  ],
};

const routes: RouteObject[] = [normalRoutes];

export default routes;
