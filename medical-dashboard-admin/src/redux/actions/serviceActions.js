import { Service } from "../../utils/constants/common";
import ProductServices from "../../utils/httpsRequests/ProducServices";

const getListProductAction = (products) => {
  return {
    type: Service.GET_PRODUCTS,
    payload: products,
  };
};
const getProductAction = (product) => {
  return {
    type: Service.GET_PRODUCT,
    payload: product,
  };
};
const getCategoryAction = (categories) => {
  return {
    type: Service.GET_CATEGORIES,
    payload: categories,
  };
};
const getBrandAction = (brands) => {
  return {
    type: Service.GET_BRAND,
    payload: brands,
  };
};

export const loadAction = (payload) => {
  return {
    payload: payload,
    type: Service.LOADING,
  };
};
export const fetchAllProducts =
  (
    page,
    perPage,
    inCategory,
    searchValue,
    debouncedMinValue,
    debouncedMaxValue
  ) =>
  async (dispatch) => {
    dispatch(loadAction(true));
    await ProductServices.getAll(
      page,
      perPage,
      inCategory,
      searchValue,
      debouncedMinValue,
      debouncedMaxValue
    )
      .then((res) => {
        dispatch(getListProductAction(res));
      })
      .catch((rej) => {
        console.log(rej);
      })
      .finally(() => {
        dispatch(loadAction(false));
      });
  };
export const fetchAllCategory = () => async (dispatch) => {
  dispatch(loadAction(true));

  await ProductServices.getCategories()
    .then((res) => {
      dispatch(getCategoryAction(res.result.data));
    })
    .catch((rej) => {
      console.log(rej);
    })
    .finally(() => {
      dispatch(loadAction(false));
    });
};
export const fetchAllBrand = () => async (dispatch) => {
  dispatch(loadAction(true));

  await ProductServices.getBrand()
    .then((res) => {
      dispatch(getBrandAction(res));
    })
    .catch((rej) => {
      console.log(rej);
    })
    .finally(() => {
      dispatch(loadAction(false));
    });
};
export const fetchOneProduct = (id) => async (dispatch) => {
  dispatch(loadAction(true));
  try {
    const res = await ProductServices.getProductById(id);
    dispatch(getProductAction(res));
    dispatch(fetchProductsInCategory(res?.category?.id));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(loadAction(false));
  }
};
const getProductsInCategory = (payload) => {
  return {
    type: Service.GET_PRODUCTS_BY_CATEGORY_ID,
    payload: payload,
  };
};
export const fetchProductsInCategory = (id) => async (dispatch) => {
  dispatch(loadAction(true));
  await ProductServices.getProductByCategoryId(id)
    .then((res) => {
      dispatch(getProductsInCategory(res?.result?.data));
    })
    .catch((rej) => {
      console.log(rej);
    })
    .finally(() => {
      dispatch(loadAction(false));
    });
};
const getListProductFeatured = (payload) => {
  return {
    type: Service.GET_PRODUCT_FEATURED,
    payload: payload,
  };
};
export const fetchListProductFeatured = () => async (dispatch) => {
  dispatch(loadAction(true));
  await ProductServices.getProductFeatured()
    .then((res) => {
      dispatch(getListProductFeatured(res?.map((item) => item?.product)));
    })
    .catch((rej) => {
      console.log(rej);
    })
    .finally(() => {
      dispatch(loadAction(false));
    });
};
