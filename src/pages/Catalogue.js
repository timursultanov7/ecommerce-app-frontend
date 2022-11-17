/** @format */

import React from "react";

// import MainProducts from "../components/catalogue/MainProducts";

import Categories from "./Categories";

import "../styles/categories.css";

function Catalogue({ gridCategories }) {
  return (
    <>
      <div className="catalogue-wrapper">
        <Categories gridCategories={gridCategories} />
      </div>

      {/* <h1>This are all the products</h1>
    {
      .map(product => {

      })
    } */}
    </>
  );
}

export default Catalogue;
