import React from "react";
import Cart from "./Cart";
import styled from "styled-components";
import { useSelector } from "react-redux";

const PriceDetail = styled.div`
  width: 45%;
  height: fit-content;
  @media only screen and (max-width: 992px) {
    width: 100%;
  }
`;

const CartItems = () => {
  let CartItem = useSelector((state) => state.cart);
  let totalItem = useSelector((state) => state.totalCart);
  let totalPrice = CartItem.reduce((total, item) => {
    return (total += item.price * item.qty);
  }, 0);

  if (CartItem.length === 0)
    return (
      <h1 className="text-center mt-5">
        <i class="fa-solid fa-basket-shopping"></i>Your cart is empty
      </h1>
    );
  return (
    <div className=" container-sm d-flex flex-column flex-lg-row mt-4 gap-3 ">
      <div className="d-flex flex-column gap-3">
        {CartItem.map((item) => (
          <Cart item={item} key={item.id} />
        ))}
      </div>

      <PriceDetail className="bg-white p-5 d-flex flex-column gap-2 cart_product_container">
        <span className="fs-5  pb-2 fw-bold">Price Details</span>

        <div className="d-flex justify-content-between">
          <span>Price({totalItem} item)</span>
          <span className="price_text">$ {totalPrice}</span>
        </div>

        <div className="d-flex justify-content-between ">
          <span className="">Delivery Charges</span>
          <span className="text-success">Free</span>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <h5>Total Amount</h5>
          <span className="price_text">$ {totalPrice}</span>
        </div>
      </PriceDetail>
    </div>
  );
};

export default CartItems;
