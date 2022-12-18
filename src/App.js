/** @format */

/** @format */

import { useContext, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";

import { CartContext } from "./contexts/CartContext";
import { LoginModalProvider } from "./contexts/LoginModalContext";
import { ProductsProvider } from "./contexts/ProductsContext";

// import useLocalStorage from "./components/useLocalStorage";

// Importing bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// Importing components
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue";
import { Category } from "./pages/Category";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";

import SearchPage from "./pages/SearchPage";

import Signup from "./pages/Signup";
import SharedLayout from "../src/layout/SharedLayout";
import Checkout from "./pages/Checkout";
import ThanksPage from "./pages/ThanksPage";
import LoginPage from "./pages/LoginPage";
// import { categoriesArray } from "./categoriesArray";

import "./App.css";
// importing this file we are able to access the variables globally, in each on eof the stylesheets that we have.
import "./styles/variables.css";
import { CategoryProvider } from "./contexts/CategoryContext";
import { LoginProvider } from "../src/contexts/LoginContext";
import ErrorBoundary from "./components/ErrorBoundary";

// MU bottom nav

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBarsStaggered,
//   faCartShopping,
//   faUser,
//   faRightFromBracket,
// } from "@fortawesome/free-solid-svg-icons";

function App() {
  const gridCategories = [
    { id: 1, name: "Fruits", class: "fruits" },
    { id: 2, name: "Cereals", class: "cereals" },
    { id: 3, name: "Grains", class: "grains" },
    { id: 4, name: "Alcohol", class: "alcohol" },
    { id: 5, name: "Vegan", class: "vegan" },
    { id: 6, name: "Drinks", class: "drinks" },
    { id: 7, name: "Meat", class: "meat" },
    { id: 8, name: "Dairy", class: "dairy" },
    { id: 9, name: "Vegetables", class: "vegetables" },
  ];

  const { cart, setCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(0);

  function handleRemove(product) {
    const exist = cart.find((item) => item.product_id === product.product_id);

    if (exist && product.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.product_id === product.product_id
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      );
    }
  }

  return (
    <div className="App">
      {/* ROUTES */}

      {/* 
     
     
     1. HOME = '/'
     2. SEARCH PAGE = '/search'
     3. CART = '/cart'
     4. CATALOGUE = '/catalogue'
     5. CATEGORY = '/:type'
     6. PRODUCT = '/product/:id'
     7. NOT FOUND 404 = '*'
     8. SIGN UP = '/signup'
     9. CHECKOUT = '/checkout'
     10. THANKS PAGE = '/thanks'
     
     
     
     
      */}
      <LoginProvider>
        <LoginModalProvider>
          {/* <ErrorBoundary> */}
          <Routes>
            <Route
              path="/"
              element={<SharedLayout qty={{ quantity, setQuantity }} />}
            >
              <Route
                index
                element={
                  <ProductsProvider>
                    <Home
                    //  onAdd={handleAdd}
                    />
                  </ProductsProvider>
                }
              />

              <Route
                path="/search"
                element={
                  <CategoryProvider>
                    <ProductsProvider>
                      <SearchPage />{" "}
                    </ProductsProvider>
                  </CategoryProvider>
                }
              />

              <Route
                path="/cart"
                element={
                  <Cart
                    onMinus={handleRemove}
                    qty={{ quantity, setQuantity }}
                  />
                }
              />
              <Route
                path="/catalogue"
                element={<Catalogue gridCategories={gridCategories} />}
              />

              {/* <ErrorBoundary> */}
              <Route
                path="/:type"
                element={
                  <CategoryProvider>
                    {" "}
                    <ErrorBoundary>
                      <Category
                        gridCategories={gridCategories}
                        qty={{ quantity, setQuantity }}
                      />
                    </ErrorBoundary>
                  </CategoryProvider>
                }
              />
              {/* </ErrorBoundary> */}
              <Route
                path="/product/:id"
                element={<Product qty={{ quantity, setQuantity }} />}
              />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/signup" element={<Signup />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/thanks" element={<ThanksPage />} />
            <Route path="/login-page" element={<LoginPage />} />
          </Routes>
          {/* </ErrorBoundary> */}
        </LoginModalProvider>
      </LoginProvider>

      <div className="bottom-nav-wrapper">
        <BottomNavigation
          className="bottom-nav"
          showLabels
          // value={value}
          onChange={(event, newValue) => {
            // setValue(newValue);
          }}
        >
          <BottomNavigationAction
            icon={
              <Link to={"/cart"}>
                <ShoppingCartIcon style={{ fill: "#1363df" }} />
              </Link>
            }
          />

          <BottomNavigationAction
            icon={
              <Link to={"/catalogue"}>
                <MenuIcon style={{ fill: "#1363df" }} />
              </Link>
            }
          />
          <BottomNavigationAction
            icon={
              <Link to={"/login-page"}>
                <PersonIcon style={{ fill: "#1363df" }} />
              </Link>
            }
          />
        </BottomNavigation>
      </div>
    </div>
  );
}

export default App;

// import "./App.css";
// import { useState, useEffect } from "react";

// // import * as dotenv from "dotenv";
// // dotenv.config();

// function App() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         const res = await fetch(
//           // `${process.env.PROXY}/api/products/all`

//           "https://ecommerce-fullstack-backend.herokuapp.com/api/products/all"
//         );
//         const data = await res.json();

//         setProducts(data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getProducts();
//   }, []);

//   return (
//     <div className='App'>
//       <div>
//         {products.map((product) => {
//           return (
//             <div key={product.product_id}>
//               <p>{product.product_name}</p>
//               <img src={product.product_img} />
//             </div>
//           );
//         })}
//       </div>
//       <div>Hello</div>
//     </div>
//   );
// }

// export default App;
