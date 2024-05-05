"use client";
import "./post.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/hooks/Authcontext";
import {
  Autocomplete,
  Button,
  CircularProgress,
  styled,
  TextField,
} from "@mui/material";
import { Gioitinh, provinces, rank } from "@/lib/data";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { viVN } from "@mui/x-date-pickers/locales";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "next/image";
import { convertToSlug } from "@/lib/assets";

function CreatePost() {
  const { authState } = useContext(AuthContext);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    authState.status === false && router.push("/auth/login");
  }, [router, authState.status]);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    image: "",
    location: "",
    stadium: "",
    content: "",
    slotCustomer: "",
    city: "",
    rank: "",
    Gioitinh: "",
    pricemin: "",
    pricemax: "",
    phone: "",
    timeStart: null,
    timeEnd: null,
    date: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    let newValue = value;
    if (id === "pricemin" || id === "pricemax" || id === "slotCustomer") {
      if (value) newValue = parseFloat(value);
    }
    setFormData({
      ...formData,
      [id]: newValue,
    });
  };
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post("http://45.118.144.160:8080/posts", formData, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setTimeout(() => {
          setLoading(false);
          router.push("/");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleSubmitImage = (e) => {
    const formImage = new FormData();
    formImage.append("file", e.target.files[0]);
    try {
      axios
        .post("http://45.118.144.160:8080/img", formImage)
        .then((res) => setFormData({ ...formData, image: res.data }));
    } catch (error) {
      console.error("Error submitting image:", error);
    }
  };

  const defaultProps = {
    options: provinces,
    getOptionLabel: (option) => option,
  };
  const defaultPropsRank = {
    options: rank,
    getOptionLabel: (option) => option,
  };
  const defaultPropsGioitinh = {
    options: Gioitinh,
    getOptionLabel: (option) => option,
  };

  console.log(formData);
  return (
    <div className="session_create">
      <div className="form-box">
        <form
          id="myForm"
          action="/"
          onSubmit={handleSubmitPost}
          className="form-value"
        >
          <h2>Tạo bài viết</h2>
          <div className="formit">
            <div className="inforpublic" style={{ gap: "50px" }}>
              <div className="inforpublic">
                <label> Thông tin chung</label>{" "}
                <TextField
                  id="title"
                  label="Lời chào"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      url: convertToSlug(e.target.value),
                      title: e.target.value,
                    });
                  }}
                  required
                />{" "}
                <TextField
                  id="stadium"
                  label="Tên sân vận động"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  value={formData.stadium}
                  onChange={handleChange}
                  required
                />{" "}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <TextField
                    id="location"
                    label="Địa chỉ"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    type="text"
                    onChange={handleChange}
                    value={formData.location}
                    required
                  />{" "}
                  <Autocomplete
                    {...defaultProps}
                    sx={{ width: 260, height: "100%" }}
                    id="auto-complete"
                    autoComplete
                    includeInputInList
                    onChange={(_, newValue) =>
                      setFormData({
                        ...formData,
                        city: newValue,
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Thành phố" />
                    )}
                  />
                </div>
                <TextField
                  id="content"
                  label="Mô tả chi tiết"
                  multiline
                  rows={4}
                  value={formData.content}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="inforpublic customer">
                <label> Yêu cầu về thành viên</label>{" "}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <TextField
                    id="slotCustomer"
                    label="Số lượng thành viên"
                    variant="outlined"
                    type="number"
                    sx={{ width: "100%" }}
                    value={formData.slotCustomer}
                    onChange={handleChange}
                    required
                  />{" "}
                  <Autocomplete
                    {...defaultPropsRank}
                    sx={{ width: "100%" }}
                    id="auto-complete"
                    autoComplete
                    includeInputInList
                    onChange={(e) => {
                      setFormData({ ...formData, rank: e.target.innerText });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Trình độ" />
                    )}
                  />{" "}
                  <Autocomplete
                    {...defaultPropsGioitinh}
                    sx={{ width: "100%" }}
                    id="auto-complete"
                    autoComplete
                    includeInputInList
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        Gioitinh: e.target.innerText,
                      });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Giới tính" />
                    )}
                  />
                </div>
              </div>{" "}
              <div className="inforpublic">
                <label> Thời gian</label>{" "}
                <div className="d-flex flex-wrap" style={{ gap: 10 }}>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    localeText={
                      viVN.components.MuiLocalizationProvider.defaultProps
                        .localeText
                    }
                  >
                    {" "}
                    <DemoContainer components={["TimePicker", "TimePicker"]}>
                      <div
                        className="d-flex "
                        style={{
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <TimePicker
                          sx={{ width: "100%" }}
                          label="Thời gian bắt đầu"
                          ampm={false}
                          // value={formData.timeStart}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              timeStart: `${e.$H}:${e.$m}`,
                            });
                          }}
                          views={["hours", "minutes"]}
                        />
                        <TimePicker
                          sx={{ width: "100%" }}
                          label="Thời gian kết thúc"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              timeEnd: `${e.$H}:${e.$m}`,
                            });
                          }}
                          ampm={false}
                          views={["hours", "minutes"]}
                        />{" "}
                      </div>{" "}
                    </DemoContainer>
                  </LocalizationProvider>
                  <div className="d-flex">
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      localeText={
                        viVN.components.MuiLocalizationProvider.defaultProps
                          .localeText
                      }
                    >
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          sx={{ width: "100%", display: "flex" }}
                          format="DD/MM/YYYY"
                          label="Ngày tháng"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              date: `${e.$y}-${e.$M}-${e.$D} `,
                            });
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="inforpublic">
              <label> Thông tin liên hệ</label>{" "}
              <TextField
                id="phone"
                label="Số điện thoại"
                variant="outlined"
                sx={{ width: "100%" }}
                type="number"
                value={formData.phone}
                onChange={handleChange}
                required
              />{" "}
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput
                  type="file"
                  accept="image/jpg,image/png, image/jpeg"
                  onChange={handleSubmitImage}
                />
              </Button>
              {formData.image && (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "200px",
                  }}
                >
                  <Image
                    unoptimized
                    src={`http://45.118.144.160:8080/image/${formData.image}`}
                    fill={true}
                    style={{
                      borderRadius: "10px",

                      objectFit: "cover",
                    }}
                    alt=""
                  />
                </div>
              )}
              <div className="mt-5 d-flex flex-column" style={{ gap: 10 }}>
                <label> Chi phí tham gia từ</label>{" "}
                <div className="position-relative d-flex " style={{ gap: 10 }}>
                  <TextField
                    id="pricemin"
                    label="Giá thấp"
                    variant="outlined"
                    value={formData.pricemin}
                    type="number"
                    onChange={handleChange}
                  />{" "}
                  <TextField
                    id="pricemax"
                    value={formData.pricemax}
                    label="Giá cao"
                    variant="outlined"
                    type="number"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>{" "}
          </div>
          <div className="buttonCreate">
            <button
              type="submit"
              className="btn btn-info w-50 d-flex justify-content-center"
              style={{
                borderRadius: "20px",
                alignItems: "center",
                minHeight: "44px",
              }}
            >
              {!loading ? "Tạo bài viết" : <CircularProgress size={30} />}
            </button>
          </div>
        </form>
      </div>{" "}
    </div>
  );
}

export default CreatePost;
