/** @format */

import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import "../styles/categories.css";

import { CartContext } from "../contexts/CartContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

function Cart({ onMinus, qty }) {
  const { quantity, setQuantity } = qty;
  const {
    cart,
    setCart,
    handleAdd,
    shipping,
    taxInterest,
    subTotalPrice,
    taxes,
    totalPrice,
  } = useContext(CartContext);

  const onRemove = (id) => {
    const exist = cart.find((item) => {
      return item.product_id === id;
    });

    if (exist) {
      let filterCart = cart.filter((item) => {
        return item.product_id !== id;
      });

      setCart(filterCart);
      // setSendToLocal(filterCart);
    }
  };
  return (
    <>
      {cart.length > 0 ? (
        <div className="cart-product-wrapper">
          <section className="cart-products-container">
            {cart.map((item) => {
              return (
                <div className="cart-product" key={item.product_id}>
                  <div className="cart-product--img-name">
                    <img
                      className="cart-product--img"
                      src={item.product_image}
                    />

                    <p className="cart-product--title">{item.product_name}</p>
                  </div>

                  <div className="cart-quantity--btns">
                    <button
                      className="btn-qty"
                      onClick={() => {
                        onMinus(item);
                        // setSendToLocal(item);
                      }}
                    >
                      <span>-</span>
                    </button>

                    <p className="item-qty">
                      <span>{item.quantity}</span>
                    </p>
                    <button
                      className="btn-qty"
                      onClick={() => {
                        handleAdd(item);
                        // setSendToLocal(item);
                      }}
                    >
                      <span>+</span>
                    </button>
                  </div>
                  <button
                    onClick={() => onRemove(item.product_id)}
                    className="btn-remove"
                  >
                    Remove
                  </button>
                  {/* <p className='cart-product--info'>{item.product_description}</p> */}
                  <div>
                    <p className="cart-product--price">
                      ${item.quantity * item.product_price}{" "}
                      {/* <span> ${`${item.product_price} each`}</span> */}
                    </p>
                  </div>
                </div>
              );
            })}
          </section>
          <aside className="cart-wrapper-summary">
            <div className="cart-summary">
              <div className="order-summary">
                <h2>Order Summary</h2>
                {/* <p>{total}</p> */}
                <p>
                  <strong>Subtotal: </strong>${subTotalPrice.toFixed(2)}
                </p>
                <p>
                  <strong>Shipping: </strong>${shipping}
                </p>
                <p>
                  <strong>Taxes: </strong>${taxes.toFixed(2)}
                </p>

                <p>
                  <strong>Total: </strong>${totalPrice.toFixed(2)}
                </p>
                <br />
              </div>

              <div>
                {/* <button className="checkout-btn"> */}
                <Link
                  className="checkout-btn"
                  to={{
                    pathname: "/checkout",
                    state: {},
                  }}
                >
                  Checkout
                </Link>
              </div>
              {/* </button> */}
            </div>
          </aside>
        </div>
      ) : (
        <div className="empty-cart">
          <FontAwesomeIcon
            style={{ fontSize: "4rem", color: "var(--main-color)" }}
            icon={faCartArrowDown}
          />
          <div className="empty-cart-p">
            <p>Your shopping cart is empty</p>
            <p>
              {/* Go Back to */}

              <Link className="link-to-catalogue" to="/catalogue">
                {" "}
                Start Shopping
              </Link>
            </p>
          </div>
        </div>
      )}
      {/* {cart.length === 0 ? (
          <p>Your cart is empty. Please buy something!</p>
        ) : (
          cart.map((product) => {
            return (
              <>
                <div> {product.product.name}</div>
              </>
            );
          })
        )} */}
      {/* {setCart.map((product) => {
          return (
            <>
              <div>{product.product_name}</div>
            </>
          );
        })}
      </div>
      <div>
        <h1>Order Summary</h1>
      </div> */}
    </>
  );
}
export default Cart;
