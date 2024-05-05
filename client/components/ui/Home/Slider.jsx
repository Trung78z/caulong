"use client";
import "./Slider.scss";
import React, { useEffect, useState } from "react";
/*-------------------------------------- */

import { data_cou } from "@/lib/data";
import Image from "next/image";
/*-------------------------------------- */
export default function Slider() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === data_cou.bootstrap.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      <div
        id="carouselExampleFade"
        className="carousel container slide carousel-fade mt-4 "
        activeindex={index}
        onSelect={handleSelect}
        style={{ maxWidth: "1080px" }}
      >
        <div className="carousel-inner  transition">
          {data_cou.bootstrap.map((data, idx) => (
            <div
              className={
                idx === index ? "carousel-item active" : "carousel-item"
              }
              key={data.id}
            >
              <Image
                src={data.imageUrl}
                fill={true}
                className="d-block w-100 "
                alt="..."
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}
