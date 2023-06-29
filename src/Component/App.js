import Navbar from "../Component/Navbar";
import ProductDetail from "./ProductDetail";
import AddProduct from "./AddProduct";
import CartItems from "./CartItems";
import ProductItemList from "./ProductItemList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addproducts } from "../actions/index";
import { useEffect } from "react";
import { getProductApi } from "../api/index";
const App = () => {
  let productDetailItem = useSelector((state) => state.itemToDisplay);

  const dispatch = useDispatch();

  useEffect(() => {
    let response = getProductApi();
    response.then((data) => {
      let modifiedData = data.products.map((item) => {
        item.edit = true;
        return item;
      });
      window.localStorage.setItem("products", JSON.stringify(modifiedData));
      let products = JSON.parse(window.localStorage.getItem("products"));
      dispatch(addproducts(products));
    });
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductItemList />} />
          <Route path="/addproducts" element={<AddProduct />} />
          <Route
            path={`/productdetails/:id`}
            element={<ProductDetail item={productDetailItem} />}
          />
          <Route path="/cart" element={<CartItems />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
