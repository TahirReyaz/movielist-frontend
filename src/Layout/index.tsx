import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import ErrorBoundary from "../components/Error/ErrorBoundary";
import FallBack from "../components/Error/FallBack";

const Layout = () => {
  return (
    <React.Fragment>
      <Navbar />
      <ErrorBoundary
        fallback={
          <FallBack
            {...{
              subtitle: "Contact the developer! Or Refresh the page",
            }}
          />
        }
      >
        <Suspense
          fallback={
            <FallBack
              {...{
                title: "Loading...",
                subtitle: "Hold your horses",
              }}
            />
          }
        >
          <Outlet />
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
