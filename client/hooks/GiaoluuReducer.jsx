export const INITIAL_STATE = {
  loading: false,
  data: [],
  data_using: [],
  status: false,
  error: false,
};

export const action = {
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
  FETCH_UPDATE: "FETCH_UPDATE",
};

export const PostReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        loading: true,
        data: [],
        data_using: [],
        error: false,
        status: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        data: action.payload,
        data_using: action.payload,
        loading: false,
        status: true,
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        data: [],
        data_using: [],
        error: true,
        status: false,
      };
    case "FETCH_UPDATE":
      return {
        ...state,
        data_using: action.payload,
      };
    case "FETCH_UPDATES":
      return {
        ...state,
        data_using: state.data,
      };
    default:
      return action;
  }
};
