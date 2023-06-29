import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { addproducts } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProductApi } from "../api";
import "../styles/productItem.css";
import { showToast } from "../Notification/toast";
const Container = styled.div`
  width: 50%;
  margin: auto;
  @media only screen and (max-width: 976px) {
    width: 90%;
  }
  @media only screen and (max-width: 576px) {
    width: 100%;
    margin: 0;
  }
`;

const AddProduct = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [rating, setrating] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = addProductApi(name, price, imageURL, rating, description);
    result.then((data) => {
      dispatch(addproducts([data, ...products]));
      navigate("/");
    });
    showToast("New Product Added !!!", "success");
    setname("");

    setdescription("");
    setrating("");
    setImageURL("");
    setprice("");
  };
  return (
    <Container className="bg-light mt-4 p-3 form_card ">
      <form className="d-flex flex-column gap-3  " onSubmit={handleSubmit}>
        <input
          type="text"
          className=" form_input"
          placeholder="Name"
          onChange={(e) => setname(e.target.value)}
        />
        <input
          type="text"
          className="  form_input"
          placeholder="Description"
          onChange={(e) => setdescription(e.target.value)}
        />
        <input
          type="text"
          className="  form_input"
          placeholder="Price"
          onChange={(e) => setprice(e.target.value)}
        />

        <input
          type="text"
          className="  form_input"
          placeholder="Product Image"
          onChange={(e) => setImageURL(e.target.value)}
        />
        <input
          type="text"
          className="  form_input"
          placeholder="Ratings"
          onChange={(e) => setrating(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary align-self-end mt-4 submit_button"
        >
          Add to Cart
        </button>
      </form>
    </Container>
  );
};
export default AddProduct;
