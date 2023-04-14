import {
  GET_USER,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_DETAIL,
  CLEAR_DETAIL,
  ADD_TO_CART,
  ALL_FILTERS,
} from "../actions/actions-types";

import { handleOrder } from "../../functions/utils.js";

const initialState = {
  user: {},
  allProducts: [],
  productDetail: {},
  cart: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.payload };
    case GET_ALL_PRODUCTS:
      return { ...state, allProducts: action.payload };
    case ADD_TO_CART:
      return { ...state, cart: action.payload };

    case ALL_FILTERS:
      const { brand, category, order } = action.payload.condition;
      let filteredProducts = action.payload.response;

      if (brand !== "") filteredProducts = filteredProducts.filter((product) => product.brand === brand);
      if (category !== "") filteredProducts = filteredProducts.filter((product) => product.category === category);
      if (order !== "none") filteredProducts = handleOrder(filteredProducts, order);

      return { ...state, allProducts: filteredProducts };

    case GET_PRODUCT_DETAIL:
      return { ...state, productDetail: action.payload };
    case CLEAR_DETAIL:
      return { ...state, productDetail: {} };
    default:
      return state;
  }
}
