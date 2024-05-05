"use client";
import "./Navbar.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import {
  LockClosedIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Logo from "../Logo";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/hooks/Authcontext";
import LoadingPage from "../Loading/Loading";
const dataNav = [
  { title: "Trang chủ", url: "/" },
  { title: "Giao lưu", url: "/giaoluu" },
  { title: "Trao đổi", url: "/traodoi" },
];
function NavbarPage() {
  const pathname = usePathname();
  const { authState, setAuthState } = useContext(AuthContext);
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    router.push("/");
  };
  return (
    <nav className={"navbar navbar-expand-lg position-sticky"}>
      <div className="container-lg position-relative">
        <Link className="navbar-brand" href="/">
          <Logo />
        </Link>
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="d-flex align-center justify-center navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse z-3" id="navbarNav">
          <ul className="navbar-nav  ms-auto ">
            {dataNav.map((data, index) => (
              <li
                className="nav-item d-flex justify-content-center"
                style={{ zIndex: 50 }}
                key={index}
              >
                <Link
                  className={clsx("item  nav-link ", {
                    ["itemactive"]: data.url === pathname,
                  })}
                  aria-current="page"
                  href={data.url}
                >
                  {data.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>{" "}
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav  ms-auto position-relative d-lg-flex align-items-lg-center">
            <div className="d-none d-lg-flex position-absolute search">
              <form className=" from-search " role="search">
                <input
                  className="form-control me-2 rounded-pill"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <MagnifyingGlassIcon className="iconSearch" />
              </form>
            </div>
            {authState.status ? (
              <li className="nav-item dropdown ">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Logo height={30} width={30} />
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <button className="dropdown-item" onClick={logout}>
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <div className="">
                <button
                  type="button"
                  className="btn text-primary"
                  onClick={() => router.push("/auth/login")}
                >
                  {" "}
                  <div className="btn-icon">
                    <LockClosedIcon className="text-gray iconLock" />
                    <span>Đăng nhập</span>
                  </div>
                </button>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarPage;
// <>
//     <div className={styles.container}>
//       <div className={styles.containeritem}>
//         <div className={styles.containeritem1}>
//           <div className={styles.logo}>
//             <Logo />
//           </div>

//           <div className={styles.itemnav}>
//             {dataNav.map((data, index) => (
//               <Link
//                 href={data.url}
//                 key={index}
//                 className={clsx(styles.item, {
//                   [styles.itemactive]: data.url === pathname,
//                 })}
//               >
//                 <h6 style={{ color: "black" }}>{data.title}</h6>
//               </Link>
//             ))}
//           </div>
//         </div>
//         <div className={styles.containeritem2}>
//           <Search />
//         </div>{" "}
//         <div className={styles.containeritem3}>
//           <Search />
//         </div>
//       </div>
//     </div>
//   </>

/*


  <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Link className="navbar-brand" href="/">
            <Logo />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ">
              {dataNav.map((data, index) => (
                <Link
                  href={data.url}
                  key={index}
                  className={clsx("item  nav-link ", {
                    ["itemactive"]: data.url === pathname,
                  })}
                >
                  {data.title}
                </Link>
              ))}
            </Nav>
          </Navbar.Collapse>{" "}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Form>
                <Row>
                  <Col xs="auto">
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      className=" mr-sm-2"
                    />
                  </Col>
                  <Col xs="auto">
                    <Button type="submit" variant="outline-primary">
                      <MagnifyingGlassIcon className="iconsearch" />{" "}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse id="basic-navbar-nav" className="">
            <Nav className="me-auto">
              {authState.loading && <LoadingPage />}
              {authState.status ? (
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={<Logo width={30} height={30} />}
                  menuVariant="dark"
                >
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav>
                  <Button
                    onClick={() => {
                      router.push("/login");
                    }}
                  >
                    Login
                  </Button>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>{" "}
        </Container>{" "}
      </Navbar>




      */
