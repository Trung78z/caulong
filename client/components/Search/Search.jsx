"use client";
import "./Search.scss";
import SearchCity from "./SearchCity";

import SearchStadium from "./SearchStadium";

import React from "react";

import PickTime from "./PickTime";
import PickDate from "./PickDate";
import SearchTD from "./SearchTD";
function Search({ data }) {
  return (
    <div
      className="filter p-lg-2 p-3"
      style={{ overflowX: "auto", overflowY: "hidden" }}
    >
      <div
        style={{
          display: "flex",
          alignContent: "center",
          gap: "10px",
        }}
      >
        <SearchCity city_data={data} />
        <SearchStadium names={data} />
        <div style={{ width: "200px" }}>
          <PickDate />
        </div>{" "}
        <div style={{ width: "200px" }}>
          <PickTime />
        </div>
        <SearchTD />
      </div>
    </div>
  );
}

export default Search;
