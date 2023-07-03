import React, { useEffect, useState } from "react";
import BasicRating from "./BasicRating";
//test comment
import { addCart, cartItems } from "../actions";
import { useDispatch } from "react-redux";
import { showToast } from "../Notification/toast";
import "../styles/productItem.css";
import { useParams } from "react-router-dom";
import { fetchProductDetail } from "../api";
const ProductDetail = ({ item }) => {
  let params = useParams();
  console.log("params", params);
  const [newItem, setNewItem] = useState(item);
  console.log("newItem", newItem);
  useEffect(() => {
    (async () => {
      if (!item) {
        const productDetails = await fetchProductDetail(params.id);
        console.log("productDetails", productDetails);
        setNewItem(productDetails[0]);
      }
    })();
  }, []);
  const dispatchCart = useDispatch();
  const dispatchTotal = useDispatch();

  if (!newItem) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div
          className="spinner-border"
          style={{ width: "8rem", height: "8rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const handleClick = (newItem) => {
    if (!newItem.qty) {
      newItem.qty = 1;
      dispatchCart(addCart(newItem));
      dispatchTotal(cartItems());
      showToast("Item Added to Cart !!!", "success");
    } else {
      dispatchCart(addCart(newItem));
      dispatchTotal(cartItems());
      showToast("Item Added to Cart !!!", "success");
    }
  };
  return (
    <div className="container-sm d-flex flex-lg-row  flex-column mt-4 gap-5 product_details">
      {newItem.imageURL ? (
        <div
          className="product_image_div "
          style={{ width: "100%", objectFit: "cover" }}
        >
          <div
            id="carouselExampleDark"
            className=" "
            style={{ height: "100%" }}
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {newItem.imageURL && (
                <div
                  className="carousel-item active image_container"
                  data-bs-interval="10000"
                >
                  <img
                    src={newItem.imageURL}
                    className="d-block w-100 image_container "
                    alt="error"
                    style={{ height: "38rem" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <img src={newItem.thumbnail} alt="error" id="detailAddedImage" />
      )}

      <div className="d-flex flex-column gap-3">
        <div className="d-flex flex-column gap-2">
          <span className="product_title">{newItem.title}</span>
          <span>
            <BasicRating value={newItem.rating} />
          </span>
          <div className="d-flex gap-3 ">
            <span className="text-success price_text">
              <span className="text-danger price_text">Price :</span> ${" "}
              {newItem.price}
            </span>
          </div>
        </div>
        <div className="d-flex flex-column gap-3">
          <span>{newItem.description}</span>
        </div>

        <div className="align-self-end">
          <button
            type="button"
            className="btn btn-primary"
            style={{
              width: "9rem",
              backgroundColor: "var(--nav)",
              border: "none",
            }}
            onClick={() => handleClick(newItem)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
