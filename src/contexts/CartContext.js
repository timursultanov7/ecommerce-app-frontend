/** @format */

import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const cartFromLocal = JSON.parse(localStorage.getItem("cart") || "[]");

  // console.log(cartFromLocal);

  const [cart, setCart] = useState(cartFromLocal);

  const shipping = 20;

  const taxInterest = 0.17;

  const subTotalPrice = cart.reduce(
    (a, c) => a + c.product_price * c.quantity,
    0
  );

  const taxes = taxInterest * subTotalPrice;

  const totalPrice = subTotalPrice + shipping + subTotalPrice * taxInterest;

  function handleAdd(product) {
    const exist = cart.find((item) => item.product_id === product.product_id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item.product_id === product.product_id
            ? { ...exist, quantity: exist.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        shipping,
        taxInterest,
        subTotalPrice,
        taxes,
        totalPrice,
        handleAdd,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
