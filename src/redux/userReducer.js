const initialState = {
  user: null,
  loading: false,
  error: null,
  initialized: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOADING_START":
      return { ...state, loading: true };
    case "SET_USER":
      return { ...state, user: action.payload, loading: false };
    case "LOGOUT":
      return { ...state, user: null, loading: false };
    case "SET_USER_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "USER_INITIALIZE":
      return { ...state, initialized: true };
    default:
      return state;
  }
};

export const setUser = (user) => ({ type: "SET_USER", payload: user });
export const logout = () => {
  return { type: "LOGOUT" };
};
export const setUserError = (error) => ({
  type: "SET_USER_ERROR",
  payload: error,
});
export const initialize = () => ({ type: "USER_INITIALIZE" });
export const startLoading = () => ({ type: "USER_LOADING_START" });

export default userReducer;
