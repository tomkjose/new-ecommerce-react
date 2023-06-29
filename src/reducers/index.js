import {
  ADD_PRODUCT,
  ADD_TO_CART,
  VIEW_PRODUCT,
  CART_ITEMS,
  CART_UPDATE,
  CART_DELETE,
} from "../actions/index";

let initialState = {
  products: [],
  cart: [],
  itemToDisplay: "",
  totalCart: 0,
};
const productReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: actions.products,
      };

    case ADD_TO_CART:
      let flag = state.cart.indexOf(actions.cart);
      if (flag !== -1) {
        actions.cart.qty += 1;
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          cart: [actions.cart, ...state.cart],
        };
      }

    case VIEW_PRODUCT:
      return {
        ...state,
        itemToDisplay: actions.view,
      };

    case CART_ITEMS:
      let { cart } = state;
      let total = cart.reduce((total, item) => {
        return (total += item.qty);
      }, 0);
      return {
        ...state,
        totalCart: total,
      };

    case CART_UPDATE:
      let index = state.cart.indexOf(actions.updatedItem);
      let updatedCart = null;
      if (index !== -1) {
        state.cart[index] = actions.updatedItem;
        updatedCart = state.cart;
      }
      return {
        ...state,
        cart: [...updatedCart],
      };
    case CART_DELETE:
      let position = state.cart.indexOf(actions.item);
      state.cart.splice(position, 1);
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default productReducer;
