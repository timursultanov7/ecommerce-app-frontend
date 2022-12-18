/** @format */

import React, { useEffect, useState, useContext, useRef } from "react";

import { link } from "../link";

import { Form, FormControl, InputGroup } from "react-bootstrap/";
import { Link, useNavigate } from "react-router-dom";
// import OutsideClickHandler from "react-outside-click-handler";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import "../styles/searchbar.css";

const SearchBar = ({ searchDivRef, isOpen, setIsOpen }) => {
  const [searchState, setSearchState] = useState("");

  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const getAllProducts = async () => {
        const res = await fetch(
          "https://ecommercial-app-backend.onrender.com/api/products/all"
        );
        const data = await res.json();
        setAllProducts(data);

        // setFilterAllProducts(data); //copy of the allProducts
      };

      getAllProducts();
    } catch (err) {
      console.log(err);
    }
  }, []);

  ////Here we are using values from user and we are going to fetch DB based on these values
  // const handleSearch = (e) => {
  //   setSearchState(e.target.value);
  // };

  //////Getting
  const handleSubmit = (e) => {
    e.preventDefault();
    // If language is correct, then sunmit form, if not, give an error message with the state. (LATER)
    navigate("/search", {
      // navigate(`/search?q=${searchState}`, {
      state: { search: { searchState } },
    });
    setIsOpen(false);
  };

  const seeMoreFunction = () => {
    navigate("/search", {
      state: { search: { searchState } },
    });
  };

  const displayProducts = () => {
    ////////trying to display a div - Results not found

    // if (!allProducts.includes(searchState)) {
    //   return <div className="no-results-search">Results not found!</div>;

    //   ///////This works without if() (56)
    // } else if (allProducts.includes(searchState)) {

    return (
      <div className="show-search-products">
        {allProducts
          .filter((nameProduct) => {
            return nameProduct.product_name
              .toLowerCase()
              .includes(searchState.toLowerCase());
            // }
          })
          .slice(0, 5)
          .map((product) => {
            return (
              <div className="search-div" key={product.product_id}>
                <Link
                  className="info-link"
                  to={`/product/${product.product_id}`}
                  onClick={() => setIsOpen(false)}
                >
                  <img
                    className="img-search-product"
                    src={product.product_image}
                  />
                  <p> {product.product_name}</p>

                  <div>${product.product_price}</div>
                </Link>
              </div>
            );
          })}
        <div className="middle">
          <button
            onClick={seeMoreFunction}
            className="product-btn "
            to="/search"
          >
            See more..
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div>
        <Form onSubmit={handleSubmit} className="form">
          <div className="magnif-glass-container">
            <FontAwesomeIcon
              className="magnif-glass"
              icon={faMagnifyingGlass}
            />
          </div>
          <FormControl
            className="search-color"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setSearchState(e.target.value)}
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </Form>

        <div
          style={{ display: isOpen ? "block" : "none" }}
          className="search-list"
          ref={searchDivRef}
        >
          {searchState !== "" ? displayProducts() : ""}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
