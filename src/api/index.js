import { ROOT_URL } from "../util/constants";
import { JSON_DB } from "../util/constants";
const customFetch = async (url, { body, ...coustomConfig }) => {
  const config = {
    ...coustomConfig,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  try {
    let response = await fetch(url, config);
    let data = await response.json();
    if (data) {
      return data;
    } else {
      throw new Error("Error in fetching data !!!");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProductApi = () => {
  return customFetch(JSON_DB, {
    method: "GET",
  });
};

export const addProductApi = (name, price, imageURL, rating, description) => {
  return customFetch(ROOT_URL, {
    method: "POST",
    body: {
      id: Date.now(),
      title: name,
      price: price,
      imageURL: imageURL,
      rating: rating,
      description: description,
      edit: true,
    },
  });
};

export const fetchProductDetail = async (id) => {
  const data = await customFetch(`${ROOT_URL}`, { method: "GET" });

  const fetchData = data.filter((product) => product.id === id);
  return fetchData;
};
export const deleteProductApi = (id) => {
  customFetch(`${ROOT_URL}/${id}`, { method: "DELETE" });
};
export const updateProductApi = (
  item,
  id,
  title,
  price,
  rating,
  description
) => {
  return customFetch(`${ROOT_URL}/${id}`, {
    method: "PUT",
    body: {
      ...item,
      title: title,
      price: price,
      rating: rating,
      description: description,
      edit: true,
    },
  });
};
export default customFetch;
