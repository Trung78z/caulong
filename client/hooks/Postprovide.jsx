"use client";
import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
import { INITIAL_STATE, PostReducer } from "./GiaoluuReducer";

export const PostContext = createContext("");

function Postprovide({ children }) {
  const [state, dispatch] = useReducer(PostReducer, INITIAL_STATE);
  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
}

export default Postprovide;
