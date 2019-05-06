import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthHeaders from "../utils/setAuthHeaders";
import jwt_decode from "jwt-decode";

export const registerUser = (user, history) => dispatch => {
  axios
    .post("/api/users/register", user)
    .then(res => history.push("/login"))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

export const loginUser = user => dispatch => {
  axios
    .post("/api/users/login", user)
    .then(res => {
      const { token } = res.data;
      //Store the token LS
      localStorage.setItem("jwtToken", token);

      // Set the req headers
      setAuthHeaders(token);

      // Decode the token
      const decoded = jwt_decode(token);

      // Set the current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  // Remove token from LS
  localStorage.removeItem("jwtToken");
  // Remove Auth header
  setAuthHeaders(false);
  // Set isAuthed to false and user to {}
  dispatch(setCurrentUser({}));
};
