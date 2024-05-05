"use client";
import Link from "next/link";
import "./LoginPage.scss";
import { useContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/hooks/Authcontext";
import { CircularProgress, TextField } from "@mui/material";
function LoginPage() {
  const { setAuthState } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://45.118.144.160:8080/auth/login", formData)
      .then((response) => {
        if (response.data.error) {
          alert(response.data);
        } else {
          setTimeout(() => {
            try {
              localStorage.setItem("accessToken", response.data.token);
              setAuthState({
                username: response.data.username,
                id: response.data.id,
                status: true,
              });
              setFormData({
                username: "",
                password: "",
              });
              setLoading(false);
              router.push("/");
            } catch (error) {
              console.log(error);
              setLoading(false);
            }
          }, 1500);
        }
      })
      .catch((err) => {
        alert("Tài khoản và mật khẩu không chính xác");
        setLoading(false);
      });
  };

  return (
    <div className="sessionLogin">
      <div className="form-box">
        <form
          id="myForm"
          action="/"
          onSubmit={handleSubmitLogin}
          className="form-value"
        >
          <h2>Đăng nhập</h2>
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
            Bạn chưa có tài khoản?{" "}
            <span>
              <Link href={"/auth/register"} style={{ textDecoration: "none" }}>
                Đăng kí
              </Link>
            </span>
          </p>
          <button
            type="submit"
            className="btn btn-info w-100 d-flex justify-content-center"
            style={{
              borderRadius: "20px",
              alignItems: "center",
              minHeight: "44px",
            }}
          >
            {!loading ? "Đăng nhập" : <CircularProgress size={30} />}
          </button>
        </form>
      </div>{" "}
    </div>
  );
}

export default LoginPage;
