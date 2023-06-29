import React from "react";
import { useDispatch } from "react-redux";
import { cartItems } from "../actions";
import { cartUpdate, deleteCart } from "../actions";
import "../styles/productItem.css";
const Cart = ({ item }) => {
  const dispatchPlus = useDispatch();
  const dispatchMinus = useDispatch();
  const dispatchTotal = useDispatch();
  const dispatchDelete = useDispatch();

  const handlePlus = (item) => {
    item.qty += 1;
    dispatchPlus(cartUpdate(item));
    dispatchTotal(cartItems());
  };

  const handleMinus = (item) => {
    if (item.qty > 1) {
      item.qty -= 1;
      dispatchMinus(cartUpdate(item));
      dispatchTotal(cartItems());
    }
  };

  const handleCancel = (item) => {
    dispatchDelete(deleteCart(item));
    dispatchTotal(cartItems());
  };
  return (
    <>
      <div className="d-flex container-md   bg-white  gap-4 cart_product_container">
        {item.videoURL ? (
          <video width={"200rem"} className="thumbnail" loop autoPlay muted>
            <source src={item.videoURL} type="video/mp4" />
          </video>
        ) : (
          <img
            src={item.imageURL}
            className="thumbnail"
            alt=""
            width={"200rem"}
          />
        )}
        <div className="d-flex flex-column gap-2 justify-content-center ">
          <span className="product_title">{item.title}</span>
          <span className="text-success">
            <span className="text-danger">Price: </span>$ {item.price}
          </span>

          <div className="d-flex gap-3 mt-4">
            <img
              className="btn-inc"
              src="https://cdn-icons-png.flaticon.com/512/4315/4315609.png"
              alt="error"
              width={"30rem"}
              onClick={() => handlePlus(item)}
            />
            <span className=" border border-1 border-dark px-4">
              {item.qty}
            </span>
            <img
              className="btn-inc"
              src="https://cdn-icons-png.flaticon.com/512/2569/2569198.png"
              alt="error"
              width={"30rem"}
              onClick={() => handleMinus(item)}
            />
          </div>
          <div className="align-self-end mt-5 ">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => handleCancel(item)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
