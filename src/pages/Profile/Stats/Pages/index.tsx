import React from "react";
import { Route, Routes } from "react-router-dom";

import ComingSoon from "../../../ComingSoon";
import Overview from "./Overview";

const Pages = () => {
  const routes = [
    { path: "/", element: <Overview /> },
    { path: "genres", element: <ComingSoon /> },
    { path: "tags", element: <ComingSoon /> },
    { path: "actors", element: <ComingSoon /> },
    { path: "studios", element: <ComingSoon /> },
    { path: "staff", element: <ComingSoon /> },
  ];

  return (
    <div className="col-span-3">
      <Routes>
        {routes.map((route) => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
      </Routes>
    </div>
  );
};

export default Pages;
