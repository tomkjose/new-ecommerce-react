import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicRating from "./BasicRating";
import { viewProducts, addproducts } from "../actions";
import { useNavigate } from "react-router-dom";
import { addCart, cartItems } from "../actions";
import { useState } from "react";
import "../styles/productItem.css";
import { deleteProductApi, updateProductApi } from "../api/index";
import { showToast } from "../Notification/toast";
import "../styles/productItem.css";
import "../styles/index.css";

const ProductItem = ({ item }) => {
  const [addedItem, setaddedItem] = useState(true);
  const [title, settitle] = useState(item.title);
  const [price, setprice] = useState(item.price);
  const [rating, setrating] = useState(item.rating);
  const [description, setdescription] = useState(item.description);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatchCart = useDispatch();
  const dispatchTotal = useDispatch();
  const dispatchProduct = useDispatch();

  const handleClick = (item) => {
    dispatch(viewProducts(item));
    navigate(`/productdetails/${item.id}`);
  };
  const handleCart = (item) => {
    if (addedItem) {
      item.qty = 1;
      dispatchCart(addCart(item));
      dispatchTotal(cartItems());
      setaddedItem(false);
      showToast("Item Added to Cart !!!", "success");
    } else {
      navigate("/cart");
    }
  };
  const handleEdit = (item) => {
    item.edit = false;
    dispatchProduct(addproducts([...products]));
  };

  const handleDelelteProduct = (item) => {
    deleteProductApi(item.id);

    let index = products.indexOf(item);
    products.splice(index, 1);
    dispatchProduct(addproducts([...products]));
    showToast("Item Deleted Successfully !!!", "success");
  };

  const handleCancel = (item) => {
    item.edit = true;
    dispatchProduct(addproducts([...products]));
  };

  const handleSave = (item) => {
    // console.log("item", item);
    // console.log("title", title);
    // console.log("description", description);

    let result = updateProductApi(
      item,
      item.id,
      title,
      price,
      rating,
      description
    );
    console.log("result", result);
    result.then((data) => {
      let index = products.indexOf(item);
      products[index] = data;

      dispatchProduct(addproducts([...products]));
      showToast("Edited Product Successfully", "success");
    });
  };
  return (
    <div className=" container-sm bg-white product_card">
      <div className="d-flex container-sm gap-5 card_items">
        {item.videoURL ? (
          <video
            width={"100%"}
            className="thumbnail_product"
            onClick={() => handleClick(item)}
            loop
            autoPlay
            muted
          >
            <source src={item.videoURL} type="video/mp4" />
          </video>
        ) : (
          <img
            src={item.imageURL}
            className="thumbnail_product"
            alt=""
            width={"100%"}
            onClick={() => handleClick(item)}
          />
        )}

        <div className="d-flex flex-column gap-2">
          {item.edit ? (
            <span className="product_title " onClick={() => handleClick(item)}>
              {item.title}
            </span>
          ) : (
            <input
              type="text"
              value={title}
              className="w-50"
              onChange={(e) => settitle(e.target.value)}
            ></input>
          )}
          {item.edit ? (
            <span>$ {item.price}</span>
          ) : (
            <input
              type="text"
              value={price}
              className="w-50"
              onChange={(e) => setprice(e.target.value)}
            ></input>
          )}
          {item.edit ? (
            <BasicRating value={item.rating} />
          ) : (
            <div>
              <h5>Ratings:</h5>
              <input
                type="number"
                max={"5"}
                min={"0"}
                value={rating}
                step={"0.5"}
                onChange={(e) => setrating(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      <div className="p-2 card_items">
        {item.edit ? (
          <span>{item.description}</span>
        ) : (
          <div className="form-floating">
            <textarea
              className="form-control"
              value={description}
              id="floatingTextarea"
              style={{ height: "5rem" }}
              onChange={(e) => setdescription(e.target.value)}
            ></textarea>
          </div>
        )}
      </div>

      <div className="btn_container">
        {item.edit ? (
          <button
            type="button"
            className="btn btn-primary"
            style={{
              width: "9rem",
              backgroundColor: "var(--nav)",
              border: "none",
            }}
            onClick={() => handleCart(item)}
          >
            {addedItem ? "Add to Cart" : "Go to Cart "}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => handleCancel(item)}
          >
            Cancel
          </button>
        )}

        {item.edit ? (
          <>
            <span>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png"
                alt="error"
                width={"30rem"}
                style={{ cursor: "pointer" }}
                onClick={() => handleEdit(item)}
              />
            </span>
            <span>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3096/3096687.png"
                alt="error"
                width={"30rem"}
                style={{ cursor: "pointer" }}
                onClick={() => handleDelelteProduct(item)}
              />
            </span>
          </>
        ) : (
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => handleSave(item)}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
