import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
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
              subtitle: "Contact the developer! Or go to the previous page",
            }}
          />
        }
      >
        <Outlet />
      </ErrorBoundary>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
