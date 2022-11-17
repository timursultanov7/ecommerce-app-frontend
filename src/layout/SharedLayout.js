/** @format */

import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

import "../App.css";
// import ErrorBoundary from "../components/ErrorBoundary";

function SharedLayout({ qty }) {
  return (
    <>
      <Header qty={qty} />
      <div className="app-container">
        {/* <ErrorBoundary> */}
        <Outlet />
        {/* </ErrorBoundary> */}
      </div>
      <Footer />
    </>
  );
}

export default SharedLayout;
