"use client";
import LoadingPage from "@/components/Loading/Loading";
import { lazy, Suspense, useContext, useEffect, useState } from "react";
const Search = lazy(() => import("./_component/search"));
import "./post.scss";
import { action } from "@/hooks/GiaoluuReducer";
import axios from "axios";
import { PostContext } from "@/hooks/Postprovide";
import { AuthContext } from "@/hooks/Authcontext";
import { Box, Button, Rating } from "@mui/material";
import Logo from "@/components/Logo";
import { CalendarIcon } from "@mui/x-date-pickers";
import {
  ArrowTrendingUpIcon,
  MapPinIcon,
  StarIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";
function SetDayAuto(String) {
  const date = new Date(String);
  // date.setHours(date.getHours() + 7);
  const utcPlus7Date = new Date(date);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return utcPlus7Date.toLocaleDateString("vi-VN", options);
}
function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + "...";
  }
  return str;
}
function Postpage() {
  const { state, dispatch } = useContext(PostContext);
  const { authState } = useContext(AuthContext);
  const [active, setActive] = useState(false);
  const [joinedPost, setJoinedPosts] = useState([]);
  const route = useRouter();
  useEffect(() => {
    dispatch({ type: action.FETCH_START });

    axios
      .get("http://45.118.144.160:8080/posts")
      .then((res) => {
        dispatch({ type: action.FETCH_SUCCESS, payload: res.data });
      })
      .catch(function () {
        dispatch({ type: action.FETCH_ERROR });
      });
  }, [dispatch]);
  useEffect(() => {
    axios
      .get("http://45.118.144.160:8080/posts/joined", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        setJoinedPosts(
          res.data.map((join) => {
            return { join: join.PostId, active: join.active };
          })
        );
      });
  }, [active]);
  const likeAPost = (postId) => {
    if (!authState.status) {
      route.push("/auth/login");
    } else {
      axios
        .post(
          "http://45.118.144.160:8080/join",
          { PostId: postId },
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        )
        .then((response) => {
          dispatch({
            type: action.FETCH_SUCCESS,
            payload: state.data.map((post) => {
              if (post.id === postId) {
                if (response.data.liked) {
                  return { ...post, Joins: [...post.Joins, 0] };
                } else {
                  const listJoin = post.Joins;
                  listJoin.pop();
                  return { ...post, Joins: listJoin };
                }
              } else {
                return post;
              }
            }),
          });
          console.log(joinedPost.includes(postId));
          if (joinedPost.includes(postId)) {
            setJoinedPosts(
              joinedPost.filter((id) => {
                return id !== postId;
              })
            );
          } else {
            setJoinedPosts([...joinedPost, postId]);
          }
        });
    }
  };
  return (
    <div className="sessionPost">
      <Suspense fallback={<LoadingPage />}>
        <Search />
      </Suspense>
      <div className="container-grid">
        <div className="grid-item-2">
          {state.data_using.map((data, index) => (
            <div className="card mb-3" key={index}>
              <Link
                href={`/giaoluu/${data.url}`}
                style={{ textDecoration: "none" }}
              >
                <div className="card-header  text-black">
                  <div className="header d-flex justify-content-between g-5 align-items-center font-weight-bold">
                    <div className="d-lg-block ">
                      <Logo width={25} height={25} /> Hồ Hoàng Vương
                    </div>
                    <div>{data.city}</div>
                  </div>
                </div>
              </Link>
              <div className="card-body position-relative">
                <div className="contentcontainer">
                  <div className="image">
                    <Image
                      unoptimized
                      priority
                      alt=""
                      fill={true}
                      src={data.image}
                      className="img"
                    ></Image>
                  </div>
                  <div className="content">
                    <div className="text-primary">
                      <p style={{ fontSize: "16px", fontWeight: 500 }}>
                        {" "}
                        {truncateString(data.title, 50)}
                      </p>
                    </div>
                    <div className=" text-black">
                      <MapPinIcon className="icon text-primary" />
                      Vị trí: {data.location} {data.city}
                    </div>
                    <div className=" text-black">
                      <StarIcon className="icon text-primary" />
                      Sân vận động: {data?.stadium}
                    </div>
                    <div className=" d-flex align-items-center">
                      <CalendarIcon className="icon text-primary" />
                      {SetDayAuto(data.date)}, {data.timeStart}-{data.timeEnd}
                    </div>
                    <div className=" d-flex align-items-center">
                      <ArrowTrendingUpIcon className="icon text-primary" />
                      <span>Trình độ: {data.rank}</span>
                    </div>
                    <div className=" d-flex justify-content-between">
                      <div className="">
                        <UsersIcon className="icon text-primary" />
                        <span>
                          Trạng thái: {data.Joins.length}/{data.slotCustomer}
                        </span>
                      </div>
                      <div className="d-flex align-items-center">
                        <span>
                          {authState.id !== data.UserId && (
                            <Button
                              size="small"
                              onClick={() => {
                                likeAPost(data.id);
                                setActive({ ...active, active: !active });
                              }}
                            >
                              {joinedPost.some(
                                (item) =>
                                  item.join === data.id && item.active === false
                              )
                                ? "Chờ xác nhận"
                                : joinedPost.some(
                                    (item) =>
                                      item.join === data.id &&
                                      item.active === true
                                  )
                                ? "Đã tham gia"
                                : "Tham gia"}
                            </Button>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="itemPrice">
                      {data.pricemin} - {data.pricemax}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid-item-3">
          <div className="title">
            <h4 className="text_title">Top đánh giá</h4>
            <Rating name="size-small" defaultValue={2.5} size="small" />
          </div>
          <div className="user">
            <Box
              component="section"
              sx={{ p: 1, border: "1px solid grey", borderRadius: "10px" }}
            >
              <div
                className="d-flex"
                style={{
                  alignItems: "center",
                  gap: "4px",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "2px",
                    alignItems: "center",
                  }}
                >
                  <Logo width={30} height={30} />
                  Hoàng vương
                </div>{" "}
                <div className="text-right">
                  <Rating name="size-small" defaultValue={2.5} size="small" />
                </div>
              </div>
            </Box>
            <Box
              component="section"
              sx={{ p: 1, border: "1px solid grey", borderRadius: "10px" }}
            >
              <div
                className="d-flex"
                style={{
                  alignItems: "center",
                  gap: "4px",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "2px",
                    alignItems: "center",
                  }}
                >
                  <Logo width={30} height={30} />
                  Hoàng vương
                </div>{" "}
                <div className="text-right">
                  <Rating name="size-small" defaultValue={2.5} size="small" />
                </div>
              </div>
            </Box>{" "}
            <Box
              component="section"
              sx={{ p: 1, border: "1px solid grey", borderRadius: "10px" }}
            >
              <div
                className="d-flex"
                style={{
                  alignItems: "center",
                  gap: "4px",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "2px",
                    alignItems: "center",
                  }}
                >
                  <Logo width={30} height={30} />
                  Hoàng vương
                </div>{" "}
                <div className="text-right">
                  <Rating name="size-small" defaultValue={2.5} size="small" />
                </div>
              </div>
            </Box>{" "}
            <Box
              component="section"
              sx={{ p: 1, border: "1px solid grey", borderRadius: "10px" }}
            >
              <div
                className="d-flex"
                style={{
                  alignItems: "center",
                  gap: "4px",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "2px",
                    alignItems: "center",
                  }}
                >
                  <Logo width={30} height={30} />
                  Hoàng vương
                </div>{" "}
                <div className="text-right">
                  <Rating name="size-small" defaultValue={2.5} size="small" />
                </div>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Postpage;
