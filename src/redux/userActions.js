import * as api from "../api";
import { resetState } from "./notesReducer";
import {
  initialize,
  setUser,
  setUserError,
  startLoading,
  logout,
} from "./userReducer";

export const login = (email, password) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const result = await api.login(email, password);

    localStorage.setItem("app-user", result.id);

    dispatch(setUser(result));
    dispatch(resetState());

    return result;
  } catch (error) {
    dispatch(setUserError(error.message));
  }
};

export const register = (email, password) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const existing = await api.findUserByQuery(
      `email=${email}&password=${password}`
    );

    if (existing) {
      throw new Error("User already exists");
    }

    const result = await api.register(email, password);

    localStorage.setItem("app-user", result.id);

    dispatch(setUser(result));
    dispatch(resetState());

    return result;
  } catch (error) {
    dispatch(setUserError(error.message));
  }
};

export const runLogout = () => async (dispatch) => {
  localStorage.removeItem("app-user");
  dispatch(resetState());
  dispatch(logout());
};

export const runInitialization = () => async (dispatch) => {
  try {
    const userId = localStorage.getItem("app-user");

    if (!userId) {
      return;
    }

    dispatch(startLoading());

    const result = await api.findUserById(userId);

    dispatch(setUser(result));
    dispatch(resetState());
  } catch {
    localStorage.removeItem("app-user");
  } finally {
    dispatch(initialize());
  }
};
