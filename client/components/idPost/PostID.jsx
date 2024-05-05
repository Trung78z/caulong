"use client";
import Image from "next/image";
import Logo from "@/components/Logo";
import {
  ArrowTrendingUpIcon,
  CalendarIcon,
  MapPinIcon,
  StarIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { AuthContext } from "@/hooks/Authcontext";
import "./PostID.scss";
import { useRouter } from "next/navigation";
function SetDayAuto(String) {
  const date = new Date(String);
  date.setHours(date.getHours() + 7);
  const utcPlus7Date = new Date(date);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return utcPlus7Date.toLocaleDateString("vi-VN", options);
}
function PostId(dataID) {
  const { datas, datacomment } = dataID.dataID;

  const [data, setData] = useState(datas);
  const postID = data.id;
  const { authState } = useContext(AuthContext);
  const [comments, setComments] = useState(datacomment);
  const [newComment, setNewComment] = useState("");
  const [active, setActive] = useState("Tham gia");
  const route = useRouter();
  useEffect(() => {
    data.Joins?.map((join) => {
      if (join.UserId === authState.id) {
        if (join.active) {
          setActive("Đã tham gia");
        } else {
          setActive("Chờ xác nhận");
        }
      } else {
        setActive("Tham gia");
      }
    });
  }, [authState.id, data.Joins]);
  const onJoinPost = (postId) => {
    if (!localStorage.getItem("accessToken")) {
      route.push("/auth/login");
    } else {
      axios
        .post(
          "http://45.118.144.160:8080/join",
          { PostId: postId },
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        )
        .then((res) => {
          if (res.data.active) {
            setActive("Chờ xác nhận");
            const newJoin = {
              UserId: authState.id,
              active: false,
            };
            const updatedJoins = [...data.Joins, newJoin];
            setData({ ...data, Joins: updatedJoins });
          } else {
            setActive("Tham gia");
            const updatedJoins = data.Joins.filter(
              (join) => join.UserId !== authState.id
            );
            setData({ ...data, Joins: updatedJoins });
          }
        })
        .catch((error) => {
          console.error("Error joining post:", error);
        });
    }
  };

  const onActiveCustumer = (PostId, JoinID) => {
    axios
      .post(
        "http://45.118.144.160:8080/join/accept",
        { PostId: PostId, JoinID: JoinID },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((res) => {
        if (res.data.active) {
          const updatedJoinedPost = data?.Joins.map((join) => {
            if (join.id === JoinID) {
              return { ...join, active: true };
            }
            return join;
          });
          setData({ ...data, Joins: updatedJoinedPost });
        }
      })
      .catch((error) => {
        console.error("Error updating join active status:", error);
      });
  };
  const deleteComment = (id) => {
    axios
      .delete(`http://45.118.144.160:8080/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id != id;
          })
        );
      });
  };
  const addComment = () => {
    if (newComment) {
      axios
        .post(
          "http://45.118.144.160:8080/comments",
          {
            commentBody: newComment,
            PostId: postID,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            const commentToAdd = {
              commentBody: newComment,
              User: {
                firstname: response.data.User.firstname,
                lastname: response.data.User.lastname,
              },
            };
            setComments([...comments, commentToAdd]);
            setNewComment("");
          }
        });
    }
  };
  return (
    data && (
      <div className="containerAll">
        <div className="containers">
          <div className="grid-item-1">
            <div className="title py-2">
              <h5 className=" font-normal d-flex align-items-center">
                Giao lưu 20/4 Sân Phan Đá Vành
              </h5>
            </div>
            <div className="image">
              <Image src={data.image} alt="" className="img" fill={true} />
              <div className="itemPrice">
                {data?.pricemin} - {data?.pricemax}
              </div>
            </div>
            <div className="body content">
              <div className="text-black">
                <MapPinIcon className="icon text-primary" />
                Vị trí: {data?.location} {data?.city}
              </div>
              <div className=" text-black">
                <StarIcon className="icon text-primary" />
                Sân vận động: {data?.stadium}
              </div>
              <div className=" d-flex align-items-center">
                <CalendarIcon className="icon text-primary" />
                {SetDayAuto(data?.updatedAt)}
              </div>
              <div className=" d-flex align-items-center">
                <ArrowTrendingUpIcon className="icon text-primary" />
                <span>Trình độ: {data?.rank}</span>
              </div>
              <div className=" d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <UsersIcon className="icon text-primary text-center" />
                  <span>
                    Trạng thái: {`${data.Joins ? data.Joins.length : 0}`} /{" "}
                    {data.slotCustomer}
                  </span>
                </div>
                <div className="d-flex align-items-center">
                  <span>
                    {data.UserId !== authState.id && (
                      <Button
                        size="small"
                        onClick={() => {
                          onJoinPost(postID);
                        }}
                      >
                        {active}
                      </Button>
                    )}
                  </span>
                </div>
              </div>
              <hr />
              <h4>Chi tiết</h4>
              <div className="contentbody">
                <p>{data?.content}</p>
              </div>
            </div>
          </div>
          <div className="grid-item-2">
            <div className="user-profile">
              <h5 className="text-center">Người đăng tin</h5>
              <div className="user-profile-item">
                <Logo width={30} height={30} />
                <h6 className="text-user">
                  {data.User?.firstname} {data.User?.lastname}
                </h6>
              </div>
              <hr />
              Liên hệ: 0882481725
            </div>
            <div className="">
              {authState.id === data.UserId && (
                <div className="customerJoin">
                  <h5>Thành viên tham gia</h5>
                  {data.Joins.map((dataJoin, key) => (
                    <div key={key} className="content-user-join">
                      <h6>
                        {dataJoin.User.firstname} {dataJoin.User?.lastname}
                      </h6>
                      <span>
                        <Button
                          size="small"
                          onClick={() => {
                            onActiveCustumer(postID, dataJoin.id);
                          }}
                          disabled={dataJoin.active}
                        >
                          {dataJoin.active ? "Đã xác nhận" : "Xác nhận"}
                        </Button>
                        <span>
                          <Button size="small">Từ chối</Button>
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>{" "}
        </div>{" "}
        <div className="sesionComment">
          {data.Joins.some(
            (item) => item.UserId === authState.id && item.active === true
          ) && (
            <div className="addCommentContainer">
              <TextField
                id="Comment"
                label="Comment"
                autoComplete="off"
                variant="outlined"
                sx={{ width: "80%" }}
                size="small"
                value={newComment}
                onChange={(event) => {
                  setNewComment(event.target.value);
                }}
                required
              />{" "}
              <Button onClick={addComment}> Add Comment</Button>
            </div>
          )}
          <div className="comment_Post">
            {comments &&
              Array.isArray(comments) &&
              comments.map((comment, key) => {
                return (
                  <div key={key} className="comment">
                    <div className="textContent">
                      <label className="userID">
                        {comment.User.firstname} {comment.User.lastname}
                      </label>
                      {comment.commentBody}
                    </div>
                    {authState.id === comment.UserId && (
                      <Button
                        onClick={() => {
                          deleteComment(comment.id);
                        }}
                      >
                        X
                      </Button>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    )
  );
}

export default PostId;
