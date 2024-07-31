import React from "react";
import { Route, Routes } from "react-router-dom";

import ComingSoon from "../../../ComingSoon";

const Pages = () => {
  const routes = [
    { path: "/", element: <ComingSoon />, title: "Profile" },
    { path: "account", element: <ComingSoon />, title: "Account" },
    { path: "media", element: <ComingSoon />, title: "Movie & Shows" },
    { path: "lists", element: <ComingSoon />, title: "Lists" },
    { path: "notifications", element: <ComingSoon />, title: "Notifications" },
    { path: "import", element: <ComingSoon />, title: "Import Lists" },
    { path: "apps", element: <ComingSoon />, title: "Apps" },
    { path: "developer", element: <ComingSoon />, title: "Developer" },
  ];

  return (
    <div className="col-span-3">
      <Routes>
        {routes.map((route) => (
          <Route path={route.path} element={route.element} key={route.title} />
        ))}
      </Routes>
    </div>
  );
};

export default Pages;
