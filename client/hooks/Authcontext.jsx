"use client";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext("");

function Provider({ children }) {
  const [loading, setLoading] = useState(false);
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
    loading: false,
  });
  useEffect(() => {
    axios
      .get("http://45.118.144.160:8080/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({
            ...authState,

            status: false,
          });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
            loading: false,
          });
        }
        setLoading(true);
      })
      .catch(() => {
        setAuthState({ ...authState, status: false, loading: false });
        setLoading(true);
      });
  }, []);
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {loading && children}
    </AuthContext.Provider>
  );
}

export default Provider;

//  useEffect(() => {
//    const fetchData = async () => {
//      try {
//        dispatch({ type: "FETCH_START" });
//        const response = await axios.get(
//          "https://jsonplaceholder.typicode.com/comments"
//        );
//        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
//      } catch (error) {
//        dispatch({ type: "FETCH_ERROR" });
//      }
//    };
//    fetchData();
//  }, []);
// const [state, dispatch] = useReducer(loginReducer, INITIAL_STATE);
