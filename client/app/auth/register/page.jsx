"use client";
import Link from "next/link";
import "./Register.scss";
import { useState } from "react";
import axios from "axios";
import { Box, CircularProgress, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

function Register() {
  const router = useRouter();
  const [resgiter, setRegister] = useState("Đăng kí");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://45.118.144.160:8080/auth/register", formData)
      .then(() => {
        setTimeout(() => {
          setFormData({
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            email: "",
          });
          setLoading(false);
          setRegister("Đăng kí sucessfully");
          setTimeout(() => {
            router.push("/auth/login");
          }, 1000);
        }, 1000);
      })
      .catch(function () {
        alert("Username already exists");
        setLoading(false);
      });
  };
  return (
    <div className="sessionRegister">
      <div className="form-box">
        <form
          id="myForm"
          action="/"
          onSubmit={handleSubmitLogin}
          className="form-value"
        >
          <h2>Đăng kí</h2>
          <TextField
            id="username"
            label="Tên đăng nhập"
            variant="outlined"
            sx={{ width: "100%" }}
            value={formData.username}
            onChange={handleChange}
            required
          />{" "}
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            sx={{ width: "100%" }}
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />{" "}
          <div className="titleName">
            {" "}
            <TextField
              id="firstname"
              label="First name"
              variant="outlined"
              sx={{ width: "100%" }}
              type="text"
              value={formData.firstname}
              onChange={handleChange}
              required
            />{" "}
            <TextField
              id="lastname"
              label="Last name"
              variant="outlined"
              sx={{ width: "100%" }}
              type="text"
              value={formData.lastname}
              onChange={handleChange}
              required
            />{" "}
          </div>
          <TextField
            id="password"
            label="Mật khẩu"
            variant="outlined"
            sx={{ width: "100%" }}
            type="password"
            onChange={handleChange}
            value={formData.password}
            required
          />{" "}
          <p>
            Bạn đã có tài khoản?{" "}
            <span>
              <Link href={"/auth/login"} style={{ textDecoration: "none" }}>
                Đăng nhập
              </Link>
            </span>
          </p>
          <button
            type="submit"
            className="btn  btn-info w-100 d-flex justify-content-center"
            style={{
              borderRadius: "20px",
              alignItems: "center",
              minHeight: "44px",
            }}
          >
            {!loading ? resgiter : <CircularProgress size={30} />}
          </button>
        </form>
      </div>{" "}
    </div>
  );
}

export default Register;
