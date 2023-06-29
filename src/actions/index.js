export const ADD_PRODUCT = "ADD_PRODUCT";
export const ADD_TO_CART = "ADD_TO_CART";
export const VIEW_PRODUCT = "VIEW_PRODUCT";
export const CART_ITEMS = "CART_ITEMS";
export const CART_UPDATE = "CART_UPDATE";
export const CART_DELETE = "CART_DELETE";

export const addproducts = (products) => {
  return {
    type: ADD_PRODUCT,
    products,
  };
};
export const addCart = (cart) => {
  return {
    type: ADD_TO_CART,
    cart,
  };
};
export const viewProducts = (item) => {
  return {
    type: VIEW_PRODUCT,
    view: item,
  };
};
export const cartItems = () => {
  return {
    type: CART_ITEMS,
  };
};
export const cartUpdate = (item) => {
  return {
    type: CART_UPDATE,
    updatedItem: item,
  };
};
export const deleteCart = (item) => {
  return {
    type: CART_DELETE,
    item,
  };
};
