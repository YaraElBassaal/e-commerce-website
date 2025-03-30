import React from "react";
import { Minus, Plus, Trash, ShoppingCart } from "lucide-react";
import "./Cart.css";

import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
} from "../features/cart/cartSlice";

function Cart() {
  const productsOfCart = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  return (
    <>
      {productsOfCart.length === 0 ? (
        <div className="empty-cart-container">
          <ShoppingCart size={40} className="empty-cart-icon" />
          <p className="empty-cart">Your cart is empty!</p>
        </div>
      ) : (
        <div className="product-container">
          {productsOfCart.map((product) => (
            <div className="product-card">
              <img
                src={product.images[0]}
                alt={product.title}
                className="product-image"
              />
              <h1 className="product-title">{product.title}</h1>
              <p className="product-price">
                Price: ${product.price.toFixed(2)}
              </p>
              <div className="quantity-controls">
                <button
                  onClick={() => dispatch(decreaseQuantity(product))}
                  className="quantity-btn"
                  disabled={product.quantity === 1}
                >
                  <Minus size={16} />
                </button>
                <span className="quantity-value">{product.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQuantity(product))}
                  className="quantity-btn"
                >
                  <Plus size={16} />
                </button>
              </div>
              <p className="total-price">
                Total: ${(product.price * product.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => dispatch(removeProduct(product.id))}
                className="remove-btn"
              >
                <Trash size={16} /> Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Cart;
