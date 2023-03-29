import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Pages/Layout";
import EquipmentLayout from "./Pages/EquipmentLayout";
import ErrorPage from "./Pages/ErrorPage";
import EmployeeList from "./Pages/EmployeeList";
import EmployeeCreator from "./Pages/EmployeeCreator";
import EquipmentCreator from "./Pages/EquipmentCreator";
import EmployeeUpdater from "./Pages/EmployeeUpdater";
import EquipmentUpdater from "./Pages/EquipmentUpdater";
import EquipmentList from "./Pages/EquipmentList";
import SearchedEmployees from "./Pages/SearchedEmployees";

import "./index.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";
import MissingEmployees from "./Pages/MissingEmployees";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path: "/create",
        element: <EmployeeCreator />,
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
      {
        path: "/employees/:search",
        element: <SearchedEmployees />,
      },
      {path:"/employees/:header/:order",
      element:<EmployeeList/>,
      },
      {
        path: "/missing",
        element: <MissingEmployees />,
      },
    ],
  },
  {
    path: "/Equipments",
    element: <EquipmentLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/Equipments",
        element: <EquipmentList />,
      },
      { path: "/Equipments/create", element: <EquipmentCreator /> },
      {
        path: "/Equipments/update/:id",
        element: <EquipmentUpdater />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
